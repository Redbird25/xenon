import { API_BASE } from './index';

/**
 * Получить список модулей для курса
 * @param {string} token — JWT
 * @param {number|string} courseId
 * @returns {Promise<Array<{ id:number, title:string }>>}
 */
export async function fetchCourseModules(token, courseId) {
    const res = await fetch(`${API_BASE}/courses/${courseId}/modules`, {
        headers: { Authorization: `Bearer ${token}` }
    });

    if (!res.ok) throw new Error(`Ошибка загрузки модулей: ${res.status}`);
    return res.json();
}
