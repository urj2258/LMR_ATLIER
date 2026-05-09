import os
import re
import sys
import json
import time
import argparse
import logging
import requests
from pathlib import Path
from typing import List, Dict, Optional, Set, Tuple

def slugify(text: str) -> str:
    if not text: return ""
    text = text.lower().strip()
    text = text.replace("–", "-").replace("—", "-")
    text = text.replace("&", "and")
    text = re.sub(r"[^a-z0-9]+", "-", text)
    text = re.sub(r"-+", "-", text)
    return text.strip("-")

# Configuration & Constants
DEFAULT_API_BASE_URL = "http://localhost:3000"
SCAN_PATHS = [r"E:\LMR_ATLIER\LMR"]
RETRY_COUNT = 3
RETRY_DELAY = 2  # seconds
TIMEOUT = 30  # seconds
DEFAULT_ADMIN_TOKEN = os.environ.get("ADMIN_TOKEN", "")

# Mapping: Folder Path Part -> (Category Name, Subcategory Name)
CATEGORY_MAP = {
    "Kids": ("Little Ones", ""),
    "Men/Formal": ("Menswear", "FORMAL"),
    "Men/Groom": ("Menswear", "GROOM"),
    "Women/Bridal": ("Women Wear", "Bridal Edit"),
    "Women/Formal": ("Women Wear", "Formal Edit"),
}


# Regex for SKU parsing: LMR-<code>-<number>-<name>
# We want the first 3 parts: LMR-<code>-<number>
FOLDER_NAME_REGEX = re.compile(r"^(LMR-[A-Z]+-\d+)(?:-(.*))?$", re.IGNORECASE)

# Logging Setup
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[logging.StreamHandler(sys.stdout)]
)
logger = logging.getLogger("upload_products")

class ProductUploader:
    def __init__(self, api_base_url: str, admin_token: str, dry_run: bool = False, limit: int = None):
        self.api_base_url = api_base_url.rstrip("/")
        self.admin_token = admin_token
        self.dry_run = dry_run
        self.limit = limit
        self.existing_skus: Set[str] = set()
        self.stats = {"created": 0, "skipped": 0, "failed": 0}
        self.cookies = {"admin_token": self.admin_token} if self.admin_token else None

    def fetch_existing_skus(self):
        if self.dry_run:
            logger.info("[Dry Run] Would fetch existing SKUs from API.")
            return

        logger.info("Fetching existing products to build SKU set...")
        try:
            response = requests.get(f"{self.api_base_url}/api/products", timeout=TIMEOUT)
            response.raise_for_status()
            products = response.json()
            for p in products:
                sku = p.get("sku")
                if sku:
                    self.existing_skus.add(sku.strip().upper())
            logger.info(f"Found {len(self.existing_skus)} existing SKUs.")
        except Exception as e:
            logger.error(f"Failed to fetch existing products: {e}")
            logger.warning("Proceeding without de-duplication check.")

    def parse_info_file(self, file_path: Path) -> Dict[str, str]:
        """
        Title = first non-empty line
        Color = last non-empty line if it starts with 'Color'
        Description = everything between title and the color line (preserving spacing)
        """
        if not file_path.exists():
            return {"title": "", "description": "", "color": ""}

        try:
            content = file_path.read_text(encoding="utf-8")
        except UnicodeDecodeError:
            content = file_path.read_text(encoding="latin-1")

        lines = content.splitlines()
        
        # Find first non-empty line for title
        title = ""
        first_idx = -1
        for i, line in enumerate(lines):
            if line.strip():
                title = line.strip()
                first_idx = i
                break
        
        if first_idx == -1:
            return {"title": "", "description": "", "color": ""}

        # Find last non-empty line for color
        color = ""
        last_idx = len(lines)
        for i in range(len(lines) - 1, first_idx, -1):
            if lines[i].strip():
                last_line = lines[i].strip()
                if last_line.lower().startswith("color"):
                    color_match = re.match(r"^color[:\s]+(.*)$", last_line, re.IGNORECASE)
                    if color_match:
                        color = color_match.group(1).strip()
                    else:
                        color = last_line[5:].strip()
                    last_idx = i
                break
        
        # Description is everything in between first and last (or end)
        description_lines = lines[first_idx + 1:last_idx]
        description = "\n".join(description_lines).strip()
        
        return {"title": title, "description": description, "color": color}

    def get_product_images(self, folder_path: Path) -> List[Path]:
        """
        Primary: cover.*
        Gallery: img* sorted naturally
        """
        all_files = list(folder_path.iterdir())
        
        primary = None
        gallery = []

        # Find cover
        for f in all_files:
            if f.is_file() and f.name.lower().startswith("cover."):
                primary = f
                break
        
        # Find img*
        img_files = [f for f in all_files if f.is_file() and f.name.lower().startswith("img")]
        
        # Natural sort for gallery
        def natural_sort_key(s):
            return [int(text) if text.isdigit() else text.lower() for text in re.split(r'(\d+)', s.name)]
        
        img_files.sort(key=natural_sort_key)
        gallery = img_files

        images = []
        if primary:
            images.append(primary)
        images.extend(gallery)
        
        return images

    def upload_image(self, file_path: Path) -> Optional[str]:
        if self.dry_run:
            logger.info(f"[Dry Run] Would upload image: {file_path.name}")
            return f"https://example.com/dry-run/{file_path.name}"

        # Determine MIME type
        mime_type = "image/png" if file_path.name.lower().endswith(".png") else "image/jpeg"
        if file_path.name.lower().endswith(".webp"):
            mime_type = "image/webp"

        for attempt in range(RETRY_COUNT):
            try:
                with open(file_path, "rb") as f:
                    files = {"file": (file_path.name, f, mime_type)}
                    response = requests.post(
                        f"{self.api_base_url}/api/upload", 
                        files=files, 
                        timeout=TIMEOUT,
                        cookies=self.cookies
                    )
                
                if response.status_code == 401:
                    logger.error(f"Unauthorized: Check your admin token. Response: {response.text}")
                    return None

                if not response.ok:
                    logger.error(f"Upload failed for {file_path.name} (Status: {response.status_code}): {response.text}")
                    if attempt < RETRY_COUNT - 1:
                        time.sleep(RETRY_DELAY)
                        continue
                    return None

                data = response.json()
                if data.get("success") and data.get("url"):
                    return data["url"]
                else:
                    logger.error(f"Upload failed for {file_path.name}: {data.get('error', 'Unknown error')}")
            except Exception as e:
                logger.warning(f"Attempt {attempt + 1} failed for {file_path.name}: {e}")
                if attempt < RETRY_COUNT - 1:
                    time.sleep(RETRY_DELAY)
        
        return None

    def create_product(self, product_data: Dict) -> bool:
        if self.dry_run:
            logger.info(f"[Dry Run] Would create product: {product_data['title']} (SKU: {product_data['sku']})")
            return True

        for attempt in range(RETRY_COUNT):
            try:
                response = requests.post(
                    f"{self.api_base_url}/api/products",
                    json=product_data,
                    headers={"Content-Type": "application/json"},
                    timeout=TIMEOUT,
                    cookies=self.cookies
                )
                
                if response.status_code == 401:
                    logger.error(f"Unauthorized to create product: {product_data['sku']}. Check admin token.")
                    return False

                response.raise_for_status()
                return True
            except Exception as e:
                logger.warning(f"Attempt {attempt + 1} failed to create product {product_data['sku']}: {e}")
                if attempt < RETRY_COUNT - 1:
                    time.sleep(RETRY_DELAY)
        
        return False

    def process_folder(self, folder_path: Path, category: str, subcategory: str):
        folder_name = folder_path.name
        match = FOLDER_NAME_REGEX.match(folder_name)
        
        if not match:
            logger.warning(f"Skipping folder with invalid name format: {folder_name}")
            return

        sku = match.group(1).upper()
        name_part = match.group(2) or folder_name
        # Improve fallback title by replacing dashes with spaces
        name_part_pretty = name_part.replace("-", " ").strip()

        # Parse Info
        info_path = folder_path / "info.txt.txt"
        info_data = self.parse_info_file(info_path)
        
        title = info_data["title"] or name_part_pretty
        description = info_data["description"]
        color = info_data["color"]

        # Discover Images
        image_files = self.get_product_images(folder_path)
        if not image_files:
            logger.warning(f"No images found for {sku}. Skipping.")
            self.stats["failed"] += 1
            return

        # Upload Images
        image_urls = []
        for img_file in image_files:
            url = self.upload_image(img_file)
            if url:
                image_urls.append(url)
            else:
                logger.error(f"Failed to upload {img_file.name}. Product creation might fail or have missing images.")

        if not image_urls:
            logger.error(f"Failed to upload any images for {sku}. Skipping product creation.")
            self.stats["failed"] += 1
            return

        # Create Product
        product_data = {
            "title": title,
            "category": category,
            "subcategory": subcategory,
            "price": "Price on Request",
            "description": description,
            "images": image_urls,
            "sku": sku,
            "color": color,
            "slug": slugify(title),
            "deliveryTime": "8 to 12 weeks" # Default value
        }

        if self.create_product(product_data):
            if not self.dry_run:
                logger.info(f"Successfully created product: {sku}")
                self.stats["created"] += 1
                self.existing_skus.add(sku)
            else:
                self.stats["created"] += 1 # Count as created for dry-run stats
        else:
            logger.error(f"Failed to create product: {sku}")
            self.stats["failed"] += 1

    def run(self, base_paths: List[Path]):
        self.fetch_existing_skus()

        processed_count = 0
        for base_path in base_paths:
            if not base_path.exists():
                logger.warning(f"Base path does not exist: {base_path}")
                continue

            logger.info(f"Scanning base path: {base_path}")
            
            for path_suffix, (cat, subcat) in CATEGORY_MAP.items():
                category_dir = base_path.joinpath(*path_suffix.split("/"))
                if not category_dir.exists():
                    continue

                logger.info(f"Scanning category: {path_suffix}")
                for product_dir in category_dir.iterdir():
                    if product_dir.is_dir():
                        # Extract SKU to check if we should skip before incrementing processed_count
                        folder_name = product_dir.name
                        match = FOLDER_NAME_REGEX.match(folder_name)
                        if match:
                            sku = match.group(1).upper()
                            if sku in self.existing_skus:
                                logger.info(f"Skipping existing product: {sku}")
                                self.stats["skipped"] += 1
                                continue

                        if self.limit and processed_count >= self.limit:
                            break
                        
                        logger.info(f"Processing product: {folder_name} (SKU: {sku})")
                        self.process_folder(product_dir, cat, subcat)
                        processed_count += 1
                
                if self.limit and processed_count >= self.limit:
                    break

        logger.info("--- Summary ---")
        created_label = "Would create" if self.dry_run else "Created"
        logger.info(f"{created_label}: {self.stats['created']}")
        logger.info(f"Skipped: {self.stats['skipped']}")
        logger.info(f"Failed: {self.stats['failed']}")

def main():
    parser = argparse.ArgumentParser(description="Upload products from local folders to LMR Atelier API.")
    parser.add_argument("--api-base-url", default=DEFAULT_API_BASE_URL, help="Base URL of the API")
    parser.add_argument("--admin-token", default=DEFAULT_ADMIN_TOKEN, help="Admin token (can also set via ADMIN_TOKEN env var)")
    parser.add_argument("--base-path", action="append", help="Base path to scan (repeatable, defaults to E:\\LMR_ATLIER\\LMR)")
    parser.add_argument("--scan-legacy", action="store_true", help="Also scan the legacy path E:\\LMR")
    parser.add_argument("--dry-run", action="store_true", help="Perform a dry run without making API calls")
    parser.add_argument("--limit", type=int, help="Limit the number of products to upload")

    args = parser.parse_args()

    base_paths = []
    if args.base_path:
        base_paths.extend([Path(p) for p in args.base_path])
    else:
        base_paths.append(Path(SCAN_PATHS[0]))
        if args.scan_legacy:
            base_paths.append(Path(r"E:\LMR"))

    uploader = ProductUploader(args.api_base_url, args.admin_token, dry_run=args.dry_run, limit=args.limit)
    uploader.run(base_paths)

if __name__ == "__main__":
    main()
