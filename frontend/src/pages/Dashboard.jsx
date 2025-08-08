import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { fetchMyCourses, createCourse } from '../api/courses';
import { useNavigate } from 'react-router-dom';
import { AppShell } from '../components/AppShell';
import { GlassCard } from '../components/GlassCard';
import {GenerationOverlay} from "../components/GenerationOverlay.jsx";

export function Dashboard() {
    const { token } = useAuth();
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState(null);
    const [newTitle, setNewTitle] = useState('');
    const [newDesc, setNewDesc] = useState('');
    const [generating, setGenerating] = useState(false);        // ← добавили

    useEffect(() => {
        fetchMyCourses(token).then(setCourses).catch(e => setError(e.message));
    }, [token]);

    const onCreate = async (e) => {
        e.preventDefault();
        setError(null);
        setGenerating(true);                                      // ← показываем анимацию
        try {
            const created = await createCourse(token, { title: newTitle, description: newDesc });
            setCourses(prev => [...prev, created]);
            setNewTitle(''); setNewDesc('');
        } catch (e) {
            setError(e.message || 'Не удалось создать курс');
        } finally {
            setGenerating(false);                                   // ← скрываем анимацию
        }
    };

    return (
        <AppShell>
            <GenerationOverlay visible={generating} />              {/* ← оверлей */}

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Список курсов */}
                <section className="flex-1">
                    <h1 className="h1 mb-4">Мои курсы</h1>
                    {error && <div className="text-red-400 mb-4">{error}</div>}
                    <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                        {courses.map(c => (
                            <GlassCard key={c.id} onClick={() => navigate(`/courses/${c.id}`)}>
                                <div className="flex items-start justify-between">
                                    <h3 className="text-lg font-bold text-white">{c.title}</h3>
                                    <span className="text-xs px-2 py-1 rounded bg-white/10 border border-white/15">
                    #{c.id}
                  </span>
                                </div>
                                {c.description && (
                                    <p className="muted mt-2 line-clamp-3">{c.description}</p>
                                )}
                                <div className="mt-4 text-xs muted">
                                    Создан: {new Date(c.createdAt).toLocaleString()}
                                </div>
                            </GlassCard>
                        ))}
                    </div>
                </section>

                {/* Форма создания */}
                <aside className="w-full lg:w-[380px]">
                    <div className="glass gradient-border rounded-2xl p-6">
                        <h2 className="text-xl font-bold mb-4">Создать курс</h2>
                        <form className="space-y-4" onSubmit={onCreate}>
                            <input
                                value={newTitle}
                                onChange={e => setNewTitle(e.target.value)}
                                placeholder="Заголовок курса"
                                required
                                className="w-full rounded-xl bg-white/5 border border-white/15 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#03C5C2]"
                            />
                            <textarea
                                value={newDesc}
                                onChange={e => setNewDesc(e.target.value)}
                                placeholder="Короткое описание"
                                className="w-full rounded-xl bg-white/5 border border-white/15 px-4 py-3 h-28 focus:outline-none focus:ring-2 focus:ring-[#03C5C2]"
                            />
                            <button className="btn-neon rounded-xl w-full py-3 font-semibold">
                                Сгенерировать с AI
                            </button>
                            <p className="text-xs muted">
                                AI разобьёт курс на модули, создаст уроки и квизы.
                            </p>
                        </form>
                    </div>
                </aside>
            </div>
        </AppShell>
    );
}
