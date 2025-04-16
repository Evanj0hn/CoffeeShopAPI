// api.js: Global API helper file

const API_BASE = "http://localhost:5208/api";

// Function to retrieve the JWT token from localStorage
function getToken() {
    return localStorage.getItem("token");
}

// Generic API request function with error handling
async function apiRequest(endpoint, options = {}) {
    try {
        const token = getToken();
        options.headers = {
            ...options.headers,
            ...(token && { "Authorization": `Bearer ${token}` })
        };

        const response = await fetch(`${API_BASE}/${endpoint}`, options);
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || "API request failed");
        }
        return await response.json();
    } catch (error) {
        console.error("Error in API Request:", error);
        throw error;
    }
}

// Example usage:
// apiRequest('menu').then(data => console.log(data)).catch(err => console.error(err));
