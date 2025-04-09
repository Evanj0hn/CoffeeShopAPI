const API_BASE = "http://localhost:5208/api";
const token = localStorage.getItem("token");

async function loadMenu() {
    const res = await fetch(`${API_BASE}/menu`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    const items = await res.json();
    const container = document.getElementById("menuContainer");

    items.forEach(item => {
        const card = document.createElement("div");
        card.className = "col-md-4 mb-4";
        card.innerHTML = `
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">${item.name}</h5>
          <p class="card-text">${item.description}</p>
          <p><strong>Price: $${item.price.toFixed(2)}</strong></p>

          <select class="form-select mb-2" id="size-${item.id}">
            <option>Small</option>
            <option>Medium</option>
            <option>Large</option>
          </select>

          <input class="form-control mb-2" id="milk-${item.id}" placeholder="Milk type (e.g. Oat)">
          <input class="form-control mb-2" id="addOns-${item.id}" placeholder="Add-ons (e.g. extra shot)">

          <button class="btn btn-primary w-100" onclick="placeOrder(${item.id}, '${item.name}')">Order</button>
        </div>
      </div>
    `;
        container.appendChild(card);
    });
}

async function placeOrder(menuItemId, drinkName) {
    const size = document.getElementById(`size-${menuItemId}`).value;
    const milkType = document.getElementById(`milk-${menuItemId}`).value;
    const addOns = document.getElementById(`addOns-${menuItemId}`).value;

    const res = await fetch(`${API_BASE}/orders`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            menuItemId,
            drink: drinkName,
            size,
            milkType,
            addOns
        })
    });

    const msg = document.getElementById("message");

    if (res.ok) {
        msg.innerText = "Order placed successfully!";
        msg.className = "text-success";
    } else {
        msg.innerText = "Failed to place order.";
        msg.className = "text-danger";
    }
}

loadMenu();
