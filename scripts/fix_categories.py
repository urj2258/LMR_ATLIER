import requests
import json

API_BASE_URL = "http://localhost:3000"
ADMIN_TOKEN = "secure_admin_token_value"
COOKIES = {"admin_token": ADMIN_TOKEN}

def fix_categories():
    print("Fetching products...")
    r = requests.get(f"{API_BASE_URL}/api/products")
    products = r.json()
    
    updated_count = 0
    
    for p in products:
        sku = p.get("sku", "")
        cat = p.get("category", "")
        subcat = p.get("subcategory", "")
        
        new_cat = None
        new_subcat = None
        
        # Bridal Edit -> Women Wear / Bridal Edit
        if cat == "Bridal Edit" and not subcat:
            new_cat = "Women Wear"
            new_subcat = "Bridal Edit"
        
        # Formal Edit -> Women Wear / Formal Edit
        elif cat == "Formal Edit" and not subcat:
            new_cat = "Women Wear"
            new_subcat = "Formal Edit"
            
        if new_cat:
            print(f"Fixing {sku}: {cat} -> {new_cat} | {subcat} -> {new_subcat}")
            
            # The /api/products POST endpoint creates OR updates if ID is provided?
            # Wait, let me check the API route.
            
            # Actually, I'll just use the same product data but with new cat/subcat
            p["category"] = new_cat
            p["subcategory"] = new_subcat
            
            # Assuming POST /api/products handles updates if SKU/ID exists?
            # Let me check src/app/api/products/route.ts
            
            resp = requests.put(
                f"{API_BASE_URL}/api/products",
                json=p,
                cookies=COOKIES
            )
            if resp.status_code in [200, 201]:
                updated_count += 1
            else:
                print(f"Failed to update {sku}: {resp.status_code} {resp.text}")
                
    print(f"Total updated: {updated_count}")

if __name__ == "__main__":
    fix_categories()
