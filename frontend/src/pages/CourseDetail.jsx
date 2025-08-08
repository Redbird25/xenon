// src/pages/CourseDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { fetchCourseModules } from '../api/modules';
import { fetchModuleLessons } from '../api/lessons';
import { fetchLessonDetail } from '../api/lessonDetails';

export function CourseDetail() {
    const { courseId } = useParams();
    const { token } = useAuth();

    const [modules, setModules] = useState([]);
    const [lessonsByModule, setLessonsByModule] = useState({});
    const [selectedModuleId, setSelectedModuleId] = useState(null);
    const [selectedLessonId, setSelectedLessonId] = useState(null);
    const [lessonDetail, setLessonDetail] = useState({ title: '', content: '' });
    const [error, setError] = useState('');

    // Загрузить модули курса
    useEffect(() => {
        fetchCourseModules(token, courseId)
            .then(mods => {
                setModules(mods);
                if (mods.length > 0) {
                    setSelectedModuleId(mods[0].id);
                }
            })
            .catch(err => setError(err.message));
    }, [token, courseId]);

    // При смене модуля — загрузить уроки
    useEffect(() => {
        if (!selectedModuleId) return;
        fetchModuleLessons(token, selectedModuleId)
            .then(ls => {
                setLessonsByModule(prev => ({ ...prev, [selectedModuleId]: ls }));
                if (ls.length > 0) {
                    setSelectedLessonId(ls[0].id);
                }
            })
            .catch(err => setError(err.message));
    }, [token, selectedModuleId]);

    // При смене урока — загрузить контент
    useEffect(() => {
        if (!selectedLessonId) return;
        fetchLessonDetail(token, selectedLessonId)
            .then(detail => setLessonDetail(detail))
            .catch(err => setError(err.message));
    }, [token, selectedLessonId]);



    return (
        <div className="min-h-screen bg-[#F8FAFC] p-6 flex">
            {/* Сайдбар */}
            <aside className="w-80 bg-white p-4 rounded-lg shadow-md mr-6 overflow-auto">
                <h2 className="text-xl font-semibold mb-4 text-[#003366]">
                    Модули
                </h2>
                {modules.map(mod => (
                    <div key={mod.id} className="mb-6">
                        <button
                            onClick={() => setSelectedModuleId(mod.id)}
                            className={`w-full text-left font-medium mb-2 p-2 rounded ${
                                mod.id === selectedModuleId
                                    ? 'bg-[#03C5C2] text-white'
                                    : 'text-[#03C5C2] hover:bg-[#E0F7F6]'
                            }`}
                        >
                            {mod.title}
                        </button>
                        <ul className="pl-4">
                            {(lessonsByModule[mod.id] || []).map(lesson => (
                                <li key={lesson.id} className="mb-1">
                                    <button
                                        onClick={() => setSelectedLessonId(lesson.id)}
                                        className={`w-full text-left p-1 rounded ${
                                            lesson.id === selectedLessonId
                                                ? 'bg-[#FFCD02] text-white'
                                                : 'text-[#1F2937] hover:bg-[#FFF9E0]'
                                        }`}
                                    >
                                        {lesson.title}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </aside>

            {/* Основной контент урока */}
            <main className="flex-1 bg-white p-6 rounded-lg shadow-md overflow-auto">
                <h2 className="text-2xl font-bold mb-4 text-[#003366]">
                    {lessonDetail.title}
                </h2>
                <div className="text-[#1F2937] whitespace-pre-line">
                    {lessonDetail.content}
                </div>
            </main>
        </div>
    );
}
