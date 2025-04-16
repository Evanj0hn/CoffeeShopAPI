const API_BASE = "http://localhost:5208/api";

async function login() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const response = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    const msg = document.getElementById("message");

    if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        msg.innerText = "Login successful!";
        msg.className = "text-success text-center mt-4";
        // Redirect to the menu page after successful login
        window.location.href = "http://localhost:5208/Frontend/menu.html";
    } else {
        msg.innerText = "Login failed. Check your credentials.";
        msg.className = "text-danger text-center mt-4";
    }
}

async function register() {
    const name = document.getElementById("registerName").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;

    const response = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
    });

    const msg = document.getElementById("message");

    if (response.ok) {
        msg.innerText = "Registration successful!";
        msg.className = "text-success text-center mt-4";
    } else {
        msg.innerText = "Registration failed. Try again.";
        msg.className = "text-danger text-center mt-4";
    }
}
