import { API_BASE } from './index';

/**
 * Получить детали урока (контент)
 * @param {string} token — JWT
 * @param {number|string} lessonId
 * @returns {Promise<{ id:number, title:string, content:string }>}
 */
export async function fetchLessonDetail(token, lessonId) {
    const res = await fetch(`${API_BASE}/lessons/${lessonId}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error(`Ошибка загрузки урока: ${res.status}`);
    return res.json();
}
