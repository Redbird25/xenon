import { API_BASE } from './index';

export async function register(data) {
    const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`Ошибка ${res.status}`);
    return res.json();
}

export async function login(data) {
    const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Ошибка ${res.status}`);
    }
    return res.json(); // { token: "...", type: "Bearer" }
}
