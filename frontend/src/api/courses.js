import { API_BASE } from './index';

export async function fetchMyCourses(token) {
    const res = await fetch(`${API_BASE}/courses`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (!res.ok) throw new Error(`Ошибка ${res.status}`);
    return res.json(); // массив { id, title, description, createdAt }
}

export async function createCourse(token, { title, description }) {
    const res = await fetch(`${API_BASE}/courses`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title, description })
    });
    if (!res.ok) throw new Error(`Ошибка ${res.status}`);
    return res.json();
}
