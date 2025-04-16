import requests
import sys

API_BASE = "http://localhost:5208/api"

def test_get_menu():
    r = requests.get(f"{API_BASE}/menu")
    if r.status_code != 200:
        print(f"❌ GET /api/menu failed: {r.status_code}")
        sys.exit(1)

    items = r.json()
    if not isinstance(items, list) or len(items) == 0:
        print(f"❌ Menu is empty or invalid: {items}")
        sys.exit(1)

    print(f"✅ Menu test passed ({len(items)} items)")

if __name__ == "__main__":
    test_get_menu()
