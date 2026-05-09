import os
import re
import argparse
from pathlib import Path
import requests

# Configuration
API_BASE_URL = "http://localhost:3000"
ADMIN_TOKEN = os.environ.get("ADMIN_TOKEN", "secure_admin_token_value")
SCAN_PATHS = [r"E:\LMR_ATLIER\LMR"]

# Regex for SKU parsing: LMR-<code>-<number>-<name> -> LMR-<code>-<number>
FOLDER_NAME_REGEX = re.compile(r"^(LMR-[A-Z]+-\d+)(?:-(.*))?$", re.IGNORECASE)

def get_local_skus() -> set:
    """Scans local folders recursively to build a set of valid SKUs."""
    local_skus = set()
    for base_path_str in SCAN_PATHS:
        base_path = Path(base_path_str)
        if not base_path.exists():
            continue
            
        # Use rglob to find all directories
        for path in base_path.rglob("*"):
            if path.is_dir():
                match = FOLDER_NAME_REGEX.match(path.name)
                if match:
                    sku = match.group(1).upper()
                    local_skus.add(sku)
    return local_skus

def prune(dry_run=True, delete_missing_sku=False):
    print(f"--- {'DRY RUN' if dry_run else 'LIVE RUN'} ---")
    
    local_skus = get_local_skus()
    print(f"Found {len(local_skus)} valid SKUs in local folders.")
    
    print("Fetching products from API...")
    try:
        r = requests.get(f"{API_BASE_URL}/api/products")
        r.raise_for_status()
        products = r.json()
    except Exception as e:
        print(f"Error fetching products: {e}")
        return

    to_delete = []
    
    for p in products:
        sku = p.get("sku", "").upper()
        pid = p.get("id")
        title = p.get("title", "No Title")
        
        should_delete = False
        reason = ""
        
        if not sku:
            if delete_missing_sku:
                should_delete = True
                reason = "Missing SKU"
        elif sku not in local_skus:
            should_delete = True
            reason = f"SKU '{sku}' not found in folders"
            
        if should_delete:
            to_delete.append((pid, sku, title, reason))

    if not to_delete:
        print("No products found to prune.")
        return

    print(f"Identified {len(to_delete)} products to prune:")
    for pid, sku, title, reason in to_delete:
        print(f"  - [{reason}] {sku or 'N/A'}: {title} (ID: {pid})")

    if dry_run:
        print(f"\n[Dry Run] Would delete {len(to_delete)} products.")
        return

    # Live Delete
    print(f"\nDeleting {len(to_delete)} products...")
    cookies = {"admin_token": ADMIN_TOKEN}
    deleted_count = 0
    
    for pid, sku, title, reason in to_delete:
        try:
            url = f"{API_BASE_URL}/api/products?id={pid}"
            dr = requests.delete(url, cookies=cookies)
            if dr.status_code == 200:
                print(f"  DELETED: {sku or 'N/A'}: {title}")
                deleted_count += 1
            else:
                print(f"  FAILED to delete {sku or 'N/A'}: {dr.status_code} {dr.text}")
        except Exception as e:
            print(f"  ERROR deleting {sku or 'N/A'}: {e}")

    print(f"\nSuccessfully deleted {deleted_count} products.")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Prune products not present in local folders.")
    parser.add_argument("--dry-run", action="store_true", default=False, help="Do not actually delete products.")
    parser.add_argument("--delete-missing-sku", action="store_true", default=False, help="Delete products that have no SKU.")
    parser.add_argument("--live", action="store_true", default=False, help="Perform actual deletions.")
    
    args = parser.parse_args()
    
    # If neither --live nor --dry-run is specified, default to dry-run for safety
    is_dry = args.dry_run or not args.live
    
    prune(dry_run=is_dry, delete_missing_sku=args.delete_missing_sku)
