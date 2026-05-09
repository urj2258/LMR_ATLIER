import requests
import re

# Same logic as JS slugify
def slugify(text):
    if not text: return ""
    text = text.lower().strip()
    text = text.replace("–", "-").replace("—", "-")
    text = text.replace("&", "and")
    text = re.sub(r"[^a-z0-9]+", "-", text)
    text = re.sub(r"-+", "-", text)
    return text.strip("-")

API_BASE_URL = "http://localhost:3000"
ADMIN_TOKEN = "secure_admin_token_value"
COOKIES = {"admin_token": ADMIN_TOKEN}

def migrate_slugs():
    print("Fetching products...")
    r = requests.get(f"{API_BASE_URL}/api/products")
    products = r.json()
    
    updated = 0
    for p in products:
        title = p.get("title", "")
        new_slug = slugify(title)
        
        if p.get("slug") != new_slug:
            print(f"Updating slug for '{title}': {p.get('slug')} -> {new_slug}")
            # Partial update via PUT
            ur = requests.put(
                f"{API_BASE_URL}/api/products", 
                json={"id": p["id"], "slug": new_slug}, 
                cookies=COOKIES
            )
            if ur.status_code == 200:
                updated += 1
            else:
                print(f"Failed to update {title}: {ur.status_code}")
                
    print(f"Total updated: {updated}")

if __name__ == "__main__":
    migrate_slugs()
