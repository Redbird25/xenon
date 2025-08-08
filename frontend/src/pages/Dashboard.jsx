// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { fetchMyCourses, createCourse } from '../api/courses';
import { useNavigate } from 'react-router-dom';

export function Dashboard() {
    const { token } = useAuth();
    const navigate = useNavigate();

    const [courses, setCourses] = useState([]);
    const [error, setError] = useState(null);
    const [newTitle, setNewTitle] = useState('');
    const [newDesc, setNewDesc] = useState('');

    // загрузка списка курсов
    useEffect(() => {
        fetchMyCourses(token)
            .then(setCourses)
            .catch(err => setError(err.message));
    }, [token]);

    // создание нового курса
    const onCreate = async e => {
        e.preventDefault();
        try {
            const created = await createCourse(token, { title: newTitle, description: newDesc });
            setCourses(prev => [...prev, created]);
            setNewTitle('');
            setNewDesc('');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] p-6">
            <h1 className="text-2xl font-bold mb-4 text-[#003366]">Мои курсы</h1>
            {error && <div className="mb-4 text-red-600">{error}</div>}

            {/* Список курсов: при клике переходим на детали */}
            <ul className="space-y-3 mb-6">
                {courses.map(c => (
                    <li
                        key={c.id}
                        onClick={() => navigate(`/courses/${c.id}`)}
                        className="cursor-pointer p-4 bg-white rounded shadow hover:shadow-lg transition"
                    >
                        <h2 className="text-lg font-semibold text-[#03C5C2]">{c.title}</h2>
                        {c.description && (
                            <p className="text-[#1F2937] mt-1">{c.description}</p>
                        )}
                        <small className="text-gray-500 block mt-2">
                            Создан: {new Date(c.createdAt).toLocaleString()}
                        </small>
                    </li>
                ))}
            </ul>

            {/* Форма создания курса */}
            <form onSubmit={onCreate} className="max-w-md space-y-4 bg-white p-6 rounded shadow">
                <h2 className="text-xl font-bold text-[#003366]">Новый курс</h2>
                <input
                    type="text"
                    value={newTitle}
                    onChange={e => setNewTitle(e.target.value)}
                    placeholder="Заголовок курса"
                    required
                    className="w-full p-3 border border-[#03C5C2] rounded focus:ring-2 focus:ring-[#03C5C2]"
                />
                <textarea
                    value={newDesc}
                    onChange={e => setNewDesc(e.target.value)}
                    placeholder="Описание (опционально)"
                    className="w-full p-3 border border-[#03C5C2] rounded focus:ring-2 focus:ring-[#03C5C2]"
                />
                <button
                    type="submit"
                    className="w-full py-3 font-semibold rounded bg-[#03C5C2] hover:bg-[#FFCD02] text-white transition"
                >
                    Создать курс
                </button>
            </form>
        </div>
    );
}
