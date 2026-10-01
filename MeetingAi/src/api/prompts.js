const API_URL = "https://localhost:7248";

async function post(endpoint, body) {
    const res = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        throw new Error(`Fel ${res.status}`);
    }

    return res.json();
}

export function createAgenda(userPrompt) {
    return post("/agenda", { userPrompt });
}

export function createSummary(userPrompt) {
    return post("/summarize", { userPrompt });
}

export function createInvite(userPrompt) {
    return post("/invite", { userPrompt });
}
