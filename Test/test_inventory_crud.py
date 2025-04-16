import requests
import sys

API_BASE = "http://localhost:5208/api"

def test_inventory_crud():
    # 1) Create a new inventory item
    payload = {
        "name": "Test Beans",
        "quantity": 123,
        "unit": "grams"
    }
    r = requests.post(f"{API_BASE}/inventory", json=payload)
    if r.status_code not in (200, 201):
        print(f"❌ POST /api/inventory failed: {r.status_code} {r.text}")
        sys.exit(1)

    item = r.json()
    item_id = item.get("id")
    if not item_id or item.get("name") != "Test Beans":
        print(f"❌ Unexpected response body: {item}")
        sys.exit(1)

    # 2) Retrieve that same item
    r2 = requests.get(f"{API_BASE}/inventory/{item_id}")
    if r2.status_code != 200:
        print(f"❌ GET /api/inventory/{item_id} failed: {r2.status_code}")
        sys.exit(1)

    fetched = r2.json()
    if fetched.get("id") != item_id or fetched.get("quantity") != 123:
        print(f"❌ Retrieved item mismatch: {fetched}")
        sys.exit(1)

    print("✅ Inventory CRUD test passed")

if __name__ == "__main__":
    test_inventory_crud()
