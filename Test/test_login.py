import requests
import sys

API_BASE = "http://localhost:5208/api"

def test_login():
    payload = {
        "email": "johndoe@example.com",
        "password": "p@ssword123"
    }
    r = requests.post(f"{API_BASE}/auth/login", json=payload)
    if r.status_code != 200:
        print(f"❌ Login failed: {r.status_code} {r.text}")
        sys.exit(1)

    token = r.json().get("token")
    if not token:
        print("❌ No token returned")
        sys.exit(1)

    print("✅ Login test passed")
    return token

if __name__ == "__main__":
    test_login()
