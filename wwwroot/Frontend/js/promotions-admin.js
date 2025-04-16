// promotions-admin.js

const API_BASE = "http://localhost:5208/api";
const token = localStorage.getItem("token");

document.getElementById("promoForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    // Retrieve form values
    const title = document.getElementById("promoTitle").value;
    const description = document.getElementById("promoDescription").value;
    const startDate = document.getElementById("promoStart").value;
    const endDate = document.getElementById("promoEnd").value;

    try {
        const response = await fetch(`${API_BASE}/promotions`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                title,
                description,
                startDate,
                endDate
            })
        });

        const messageElem = document.getElementById("promoMessage");
        if (!response.ok) {
            throw new Error("Failed to create promotion");
        }

        messageElem.innerText = "Promotion created successfully!";
        messageElem.className = "text-success";
        document.getElementById("promoForm").reset();
    } catch (error) {
        const messageElem = document.getElementById("promoMessage");
        messageElem.innerText = error.message;
        messageElem.className = "text-danger";
    }
});
