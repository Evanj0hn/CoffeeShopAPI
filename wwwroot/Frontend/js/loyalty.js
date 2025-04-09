const API_BASE = "http://localhost:5208/api";
const token = localStorage.getItem("token");

async function loadLoyaltyPoints() {
    const userId = 1; // Use the actual user ID you're testing with

    const response = await fetch(`${API_BASE}/loyalty/${userId}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    const pointsElem = document.getElementById("points");

    if (response.ok) {
        const points = await response.json();
        pointsElem.innerText = `${points} points`;
    } else {
        pointsElem.innerText = "Unable to fetch points";
        pointsElem.className = "text-danger";
    }
}

async function loadPromotions() {
    const response = await fetch(`${API_BASE}/promotions`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    const list = document.getElementById("promoList");
    list.innerHTML = ""; // Clear loading text

    if (response.ok) {
        const promos = await response.json();

        if (promos.length === 0) {
            list.innerHTML = "<li class='list-group-item'>No active promotions.</li>";
            return;
        }

        promos.forEach(promo => {
            const li = document.createElement("li");
            li.className = "list-group-item";
            li.innerHTML = `<strong>${promo.title}</strong><br>${promo.description}<br><small>${promo.startDate.split("T")[0]} to ${promo.endDate.split("T")[0]}</small>`;
            list.appendChild(li);
        });
    } else {
        list.innerHTML = "<li class='list-group-item text-danger'>Failed to load promotions.</li>";
    }
}

loadLoyaltyPoints();
loadPromotions();
