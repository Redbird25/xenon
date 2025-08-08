import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { fetchCourseModules } from '../api/modules';
import { fetchModuleLessons } from '../api/lessons';
import { fetchLessonDetail } from '../api/lessonDetails';
import { AppShell } from '../components/AppShell';

export function CourseDetail() {
    const { courseId } = useParams();
    const { token } = useAuth();

    const [modules, setModules] = useState([]);
    const [lessonsByModule, setLessonsByModule] = useState({});
    const [selectedModuleId, setSelectedModuleId] = useState(null);
    const [selectedLessonId, setSelectedLessonId] = useState(null);
    const [lessonDetail, setLessonDetail] = useState({ title: '', content: '' });
    const [error, setError] = useState('');

    useEffect(() => {
        fetchCourseModules(token, courseId)
            .then(mods => {
                setModules(mods);
                if (mods.length > 0) setSelectedModuleId(mods[0].id);
            })
            .catch(err => setError(err.message));
    }, [token, courseId]);

    useEffect(() => {
        if (!selectedModuleId) return;
        fetchModuleLessons(token, selectedModuleId)
            .then(ls => {
                setLessonsByModule(prev => ({ ...prev, [selectedModuleId]: ls }));
                if (ls.length > 0) setSelectedLessonId(ls[0].id);
            })
            .catch(err => setError(err.message));
    }, [token, selectedModuleId]);

    useEffect(() => {
        if (!selectedLessonId) return;
        fetchLessonDetail(token, selectedLessonId)
            .then(setLessonDetail)
            .catch(err => setError(err.message));
    }, [token, selectedLessonId]);

    return (
        <AppShell>
            {error && (
                <div className="glass rounded-xl p-3 text-red-300 mb-4">
                    Ошибка: {error}
                </div>
            )}
            <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8">
                {/* Сайдбар модулей/уроков */}
                <aside className="glass gradient-border rounded-2xl p-4 h-[80vh] overflow-auto">
                    <h2 className="text-lg font-bold mb-3">Модули</h2>
                    <div className="space-y-5">
                        {modules.map(mod => (
                            <div key={mod.id}>
                                <button
                                    onClick={() => setSelectedModuleId(mod.id)}
                                    className={`w-full text-left mb-2 px-3 py-2 rounded-xl border transition
                    ${mod.id === selectedModuleId
                                        ? 'border-[#03C5C2] bg-[rgba(3,197,194,0.08)]'
                                        : 'border-white/10 hover:bg-white/5'}`}
                                >
                                    <div className="font-semibold">{mod.title}</div>
                                    <div className="text-xs muted">Модуль #{mod.id}</div>
                                </button>
                                <ul className="space-y-1 ml-1">
                                    {(lessonsByModule[mod.id] || []).map(lesson => (
                                        <li key={lesson.id}>
                                            <button
                                                onClick={() => setSelectedLessonId(lesson.id)}
                                                className={`w-full text-left text-sm px-3 py-2 rounded-lg transition
                          ${lesson.id === selectedLessonId
                                                    ? 'bg-[#FFCD02] text-[#0B1220]'
                                                    : 'hover:bg-white/5 text-white'}`}
                                            >
                                                {lesson.title}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </aside>

                {/* Контент урока */}
                <section className="space-y-4">
                    <div className="glass gradient-border rounded-2xl p-6">
                        <div className="flex items-center justify-between">
                            <h1 className="h1">{lessonDetail.title || 'Выберите урок'}</h1>
                            <button className="btn-neon rounded-xl px-4 py-2 text-sm">Сгенерировать видео</button>
                        </div>
                        <div className="mt-4 text-[15px] leading-7 whitespace-pre-line">
                            {lessonDetail.content || 'Контент урока появится здесь.'}
                        </div>
                    </div>

                    {/* Заглушка для квизов – вставите реальные данные позже */}
                    <div className="glass rounded-2xl p-6">
                        <h2 className="text-xl font-bold mb-3">Квиз по уроку</h2>
                        <p className="muted">Вопросы появятся после генерации/сохранения.</p>
                    </div>
                </section>
            </div>
        </AppShell>
    );
}
