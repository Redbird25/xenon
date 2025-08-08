import { API_BASE } from './index';

/**
 * Получить список уроков для модуля
 * @param {string} token — JWT
 * @param {number|string} moduleId
 * @returns {Promise<Array<{ id:number, title:string }>>}
 */
export async function fetchModuleLessons(token, moduleId) {
    const res = await fetch(`${API_BASE}/modules/${moduleId}/lessons`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error(`Ошибка загрузки уроков: ${res.status}`);
    return res.json();
}
