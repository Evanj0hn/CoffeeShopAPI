const API_BASE = "http://localhost:5208/api";
const token = localStorage.getItem("token");

async function loadOrdersForFeedback() {
    const res = await fetch(`${API_BASE}/orders`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    const select = document.getElementById("orderSelect");
    select.innerHTML = "";

    if (!res.ok) {
        select.innerHTML = `<option disabled>Error loading orders</option>`;
        return;
    }

    const orders = await res.json();

    if (orders.length === 0) {
        select.innerHTML = `<option disabled>No orders found</option>`;
        return;
    }

    orders.forEach(order => {
        const option = document.createElement("option");
        option.value = order.id;
        option.text = `${order.drink} - ${order.size} (${order.status})`;
        select.appendChild(option);
    });
}

async function submitFeedback() {
    const orderId = document.getElementById("orderSelect").value;
    const rating = parseInt(document.getElementById("rating").value);
    const comment = document.getElementById("comment").value;
    const msg = document.getElementById("message");

    if (!orderId || !rating || !comment) {
        msg.innerText = "All fields are required.";
        msg.className = "text-danger";
        return;
    }

    const res = await fetch(`${API_BASE}/feedback`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            orderId,
            rating,
            comment
        })
    });

    if (res.ok) {
        msg.innerText = "Thank you! Your feedback has been submitted.";
        msg.className = "text-success";
    } else {
        msg.innerText = "Failed to submit feedback.";
        msg.className = "text-danger";
    }
}

loadOrdersForFeedback();
