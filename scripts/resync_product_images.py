import os
import re
import time
import argparse
import requests
from pathlib import Path
from typing import List, Dict, Optional

# Configuration
API_BASE_URL = "http://localhost:3000"
SCAN_PATHS = [r"E:\LMR_ATLIER\LMR"]
ADMIN_TOKEN = os.environ.get("ADMIN_TOKEN", "secure_admin_token_value")
COOKIES = {"admin_token": ADMIN_TOKEN}

# Regex for SKU parsing: LMR-<code>-<number>-<name> -> LMR-<code>-<number>
FOLDER_NAME_REGEX = re.compile(r"^(LMR-[A-Z]+-\d+)(?:-(.*))?$", re.IGNORECASE)

def natural_sort_key(s):
    return [int(text) if text.isdigit() else text.lower() for text in re.split(r'(\d+)', str(s))]

def get_product_images_from_folder(folder_path: Path) -> List[Path]:
    """Finds cover.* and img* files in a folder, sorted naturally."""
    all_files = list(folder_path.iterdir())
    
    primary = None
    gallery = []

    # Find cover
    for f in all_files:
        if f.is_file() and f.name.lower().startswith("cover."):
            primary = f
            break
    
    # Find img* and other images
    image_extensions = {".jpg", ".jpeg", ".png", ".webp"}
    other_images = [f for f in all_files if f.is_file() and f.suffix.lower() in image_extensions and f != primary]
    
    # Sort naturally
    other_images.sort(key=natural_sort_key)
    
    result = []
    if primary:
        result.append(primary)
    result.extend(other_images)
    
    return result

def upload_image(file_path: Path) -> Optional[str]:
    """Uploads an image to the /api/upload endpoint."""
    try:
        with open(file_path, "rb") as f:
            files = {"file": (file_path.name, f, "image/jpeg")}
            r = requests.post(f"{API_BASE_URL}/api/upload", files=files, cookies=COOKIES)
            if r.status_code == 200:
                return r.json().get("url")
            else:
                print(f"      Upload failed for {file_path.name}: {r.status_code} {r.text}")
    except Exception as e:
        print(f"      Error uploading {file_path.name}: {e}")
    return None

def resync(dry_run=True, only_missing=False):
    print(f"--- {'DRY RUN' if dry_run else 'LIVE RUN'} ---")
    
    # Fetch all products to match by SKU
    print("Fetching products from API...")
    try:
        r = requests.get(f"{API_BASE_URL}/api/products")
        r.raise_for_status()
        products = r.json()
    except Exception as e:
        print(f"Error fetching products: {e}")
        return

    sku_to_product = {p.get("sku", "").upper(): p for p in products if p.get("sku")}
    
    stats = {"updated": 0, "skipped": 0, "failed": 0}

    for base_path_str in SCAN_PATHS:
        base_path = Path(base_path_str)
        if not base_path.exists():
            continue
            
        # Recursive scan for product folders (rglob matches SKU pattern)
        for path in base_path.rglob("*"):
            if not path.is_dir():
                continue
                
            match = FOLDER_NAME_REGEX.match(path.name)
            if not match:
                continue
                
            sku = match.group(1).upper()
            if sku not in sku_to_product:
                print(f"Skipping folder {path.name}: SKU {sku} not found in DB.")
                stats["skipped"] += 1
                continue
                
            product = sku_to_product[sku]
            pid = product["id"]
            existing_images = product.get("images", [])
            
            image_files = get_product_images_from_folder(path)
            if not image_files:
                print(f"Skipping {sku}: No images found in folder.")
                stats["failed"] += 1
                continue
                
            if only_missing and len(existing_images) >= len(image_files):
                print(f"Skipping {sku}: Already has {len(existing_images)} images.")
                stats["skipped"] += 1
                continue

            print(f"Processing {sku}: Found {len(image_files)} images in folder.")
            
            if dry_run:
                for img in image_files:
                    print(f"  [Dry Run] Would upload {img.name}")
                stats["updated"] += 1
                continue

            # Live Run
            new_image_urls = []
            for img in image_files:
                url = upload_image(img)
                if url:
                    new_image_urls.append(url)
                    print(f"  Uploaded: {img.name} -> {url}")
                else:
                    print(f"  Failed to upload: {img.name}")
            
            if new_image_urls:
                # Update product in DB
                update_data = {"id": pid, "images": new_image_urls}
                ur = requests.put(f"{API_BASE_URL}/api/products", json=update_data, cookies=COOKIES)
                if ur.status_code == 200:
                    print(f"  Successfully updated {sku} in DB.")
                    stats["updated"] += 1
                else:
                    print(f"  Failed to update {sku} in DB: {ur.status_code} {ur.text}")
                    stats["failed"] += 1
            else:
                print(f"  No images successfully uploaded for {sku}.")
                stats["failed"] += 1

    print(f"\nSummary: {stats['updated']} updated, {stats['skipped']} skipped, {stats['failed']} failed.")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Resync product images from local folders to DB.")
    parser.add_argument("--dry-run", action="store_true", default=False)
    parser.add_argument("--live", action="store_true", default=False)
    parser.add_argument("--only-missing", action="store_true", default=False)
    
    args = parser.parse_args()
    is_dry = args.dry_run or not args.live
    
    resync(dry_run=is_dry, only_missing=args.only_missing)
