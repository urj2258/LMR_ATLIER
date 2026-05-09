import requests
import json

API_BASE_URL = "http://localhost:3000"
ADMIN_TOKEN = "secure_admin_token_value"
COOKIES = {"admin_token": ADMIN_TOKEN}

JUNK_SKUS = {'78', '98', 'MB 11', 'MB 12'}

RULES = [
    (r"^LMR-KD-", "Little Ones", ""),
    (r"^LMR-MF-", "Menswear", "FORMAL"),
    (r"^LMR-MG-", "Menswear", "GROOM"),
    (r"^LMR-WB-", "Women Wear", "Bridal Edit"),
    (r"^LMR-WF-", "Women Wear", "Formal Edit"),
]

import re

def normalize():
    print("Fetching products...")
    r = requests.get(f"{API_BASE_URL}/api/products")
    products = r.json()
    
    deleted = 0
    updated = 0
    
    for p in products:
        sku = p.get("sku", "")
        pid = p.get("id")
        
        # 1. Delete Junk
        if sku in JUNK_SKUS:
            print(f"Deleting junk SKU: {sku} (ID: {pid})")
            dr = requests.delete(f"{API_BASE_URL}/api/products?id={pid}", cookies=COOKIES)
            if dr.status_code == 200:
                deleted += 1
            else:
                print(f"Failed to delete {sku}: {dr.status_code}")
            continue
            
        # 2. Normalize
        target_cat = None
        target_sub = None
        
        # Rule by SKU (highest priority)
        if sku:
            for pattern, cat, sub in RULES:
                if re.match(pattern, sku, re.IGNORECASE):
                    target_cat = cat
                    target_sub = sub
                    break
        
        # Rule by existing category (fallback for manual entries)
        if not target_cat:
            cur_cat = p.get("category", "").lower()
            if "bridal" in cur_cat:
                target_cat = "Women Wear"
                target_sub = "Bridal Edit"
            elif "wedding" in cur_cat:
                target_cat = "Women Wear"
                target_sub = "Wedding Edit"
            elif "formal" in cur_cat and ("women" in cur_cat or "edit" in cur_cat):
                target_cat = "Women Wear"
                target_sub = "Formal Edit"
            elif "menswear" in cur_cat:
                target_cat = "Menswear"
                # Hard to tell subcategory without SKU, leave as is or default to FORMAL?
                # For now, only fix if it's missing subcategory
                if not p.get("subcategory"):
                    target_sub = "FORMAL"
                else:
                    target_cat = p.get("category")
                    target_sub = p.get("subcategory")
            elif "little" in cur_cat or "kids" in cur_cat:
                target_cat = "Little Ones"
                target_sub = ""
        
        if target_cat:
            if p.get("category") != target_cat or p.get("subcategory") != target_sub:
                print(f"Normalizing {sku or pid}: {p.get('category')}/{p.get('subcategory')} -> {target_cat}/{target_sub}")
                
                update_payload = {
                    "id": pid,
                    "category": target_cat,
                    "subcategory": target_sub
                }
                ur = requests.put(f"{API_BASE_URL}/api/products", json=update_payload, cookies=COOKIES)
                if ur.status_code == 200:
                    updated += 1
                else:
                    print(f"Failed to update {sku or pid}: {ur.status_code} {ur.text}")
        else:
            print(f"No rule matched for Product: {sku or pid} ({p.get('category')})")

    print("\n--- Final Summary ---")
    print(f"Total Deleted: {deleted}")
    print(f"Total Updated: {updated}")

if __name__ == "__main__":
    normalize()
