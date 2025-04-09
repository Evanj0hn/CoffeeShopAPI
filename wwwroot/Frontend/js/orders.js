const API_BASE = "http://localhost:5208/api";
const token = localStorage.getItem("token");

async function loadOrders() {
    const res = await fetch(`${API_BASE}/orders`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    const list = document.getElementById("orderList");
    list.innerHTML = "";

    if (!res.ok) {
        list.innerHTML = "<div class='text-danger'>Failed to load orders.</div>";
        return;
    }

    const orders = await res.json();

    if (orders.length === 0) {
        list.innerHTML = "<div>No orders found.</div>";
        return;
    }

    orders.forEach(order => {
        const item = document.createElement("div");
        item.className = "list-group-item";
        item.innerHTML = `
      <strong>${order.drink}</strong> - ${order.size} (${order.milkType})<br>
      Add-ons: ${order.addOns}<br>
      <span class="badge bg-info text-dark">${order.status}</span>
      <div class="text-muted small">Ordered on: ${order.orderTime.split("T")[0]}</div>
    `;
        list.appendChild(item);
    });
}

loadOrders();
