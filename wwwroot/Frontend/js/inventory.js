// inventory.js

const API_BASE = "http://localhost:5208/api";
const token = localStorage.getItem("token");

// Function to load inventory items from the API
async function loadInventory() {
    try {
        const response = await fetch(`${API_BASE}/inventory`, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        if (!response.ok) {
            throw new Error("Failed to fetch inventory");
        }
        const items = await response.json();
        const tbody = document.querySelector("#inventoryTable tbody");
        tbody.innerHTML = ""; // Clear previous content

        items.forEach(item => {
            const row = document.createElement("tr");
            row.innerHTML = `
        <td>${item.id}</td>
        <td>${item.name}</td>
        <td>
          <input type="number" class="form-control" value="${item.quantity}" id="quantity-${item.id}" min="0">
        </td>
        <td>${item.unit}</td>
        <td>${new Date(item.lastUpdated).toLocaleString()}</td>
        <td>
          <button class="btn btn-primary btn-sm" onclick="updateInventory(${item.id})">Update</button>
        </td>
      `;
            tbody.appendChild(row);
        });
    } catch (error) {
        document.getElementById("message").innerText = error.message;
        document.getElementById("message").className = "text-danger";
    }
}

// Function to update an inventory item's quantity
async function updateInventory(itemId) {
    const quantityInput = document.getElementById(`quantity-${itemId}`);
    const newQuantity = parseInt(quantityInput.value, 10);
    try {
        const response = await fetch(`${API_BASE}/inventory/${itemId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ id: itemId, quantity: newQuantity })
        });
        if (!response.ok) {
            throw new Error("Failed to update inventory item");
        }
        document.getElementById("message").innerText = "Inventory updated successfully!";
        document.getElementById("message").className = "text-success";
        // Optionally reload the inventory list
        loadInventory();
    } catch (error) {
        document.getElementById("message").innerText = error.message;
        document.getElementById("message").className = "text-danger";
    }
}

// Load inventory when the page loads
loadInventory();
