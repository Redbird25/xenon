import React, { useEffect, useMemo, useState } from 'react';

const STEPS = [
    'Анализирую тему и описание…',
    'Проектирую структуру модулей…',
    'Пишу черновики уроков…',
    'Генерирую квизы…',
    'Сохраняю в базу…',
];

export function GenerationOverlay({ visible, onCancel }) {
    const [idx, setIdx] = useState(0);
    const [progress, setProgress] = useState(6);

    // Плавный фейковый прогресс, чтобы не замирал
    useEffect(() => {
        if (!visible) return;
        setIdx(0);
        setProgress(6);

        const stepTimer = setInterval(() => {
            setIdx(prev => (prev + 1) % STEPS.length);
        }, 1600);

        const progTimer = setInterval(() => {
            setProgress(p => Math.min(p + Math.random() * 4.5, 92)); // не доходить до 100%
        }, 350);

        return () => { clearInterval(stepTimer); clearInterval(progTimer); };
    }, [visible]);

    const stepText = useMemo(() => STEPS[idx], [idx]);

    if (!visible) return null;

    return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center">
            {/* фон */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

            {/* «космос» */}
            <div className="absolute w-[800px] h-[800px] rounded-full opacity-30 blur-3xl bg-[radial-gradient(circle_at_50%_50%,rgba(3,197,194,0.25),transparent_60%)] animate-pulse" />

            {/* карточка */}
            <div className="relative w-[min(560px,92vw)] glass rounded-2xl p-6 gradient-border">
                <div className="flex items-center gap-3">
                    {/* неоновая «турбина» */}
                    <div className="relative w-12 h-12">
                        <div className="absolute inset-0 rounded-full border border-[#03C5C2]/30 animate-[spin_2.8s_linear_infinite]" />
                        <div className="absolute inset-2 rounded-full border border-[#FFCD02]/40 animate-[spin_1.8s_linear_infinite_reverse]" />
                        <div className="absolute inset-4 rounded-full bg-[#03C5C2]/30 blur-[2px]" />
                    </div>
                    <div>
                        <div className="text-xl font-bold">Генерация курса</div>
                        <div className="text-sm muted -mt-0.5">Это может занять до 15–40 сек</div>
                    </div>
                </div>

                {/* прогресс */}
                <div className="mt-6">
                    <div className="h-3 w-full rounded-full bg-white/10 overflow-hidden">
                        <div
                            className="h-full rounded-full bg-gradient-to-r from-[#03C5C2] via-[#41E8E5] to-[#FFCD02] transition-[width] duration-300"
                            style={{ width: `${Math.min(progress, 97)}%` }}
                        />
                    </div>
                    <div className="mt-2 text-xs muted">{Math.round(progress)}%</div>
                </div>

                {/* текущий шаг */}
                <div className="mt-5 text-[15px]">{stepText}</div>

                {/* декоративные точки */}
                <div className="mt-6 flex items-center gap-2">
                    {[0,1,2].map(i => (
                        <span
                            key={i}
                            className={`inline-block w-2 h-2 rounded-full bg-[#03C5C2] ${i===idx%3 ? 'opacity-100' : 'opacity-40'}`}
                        />
                    ))}
                </div>

                {/* опционально — кнопка отмены (только UI, не отменяет fetch) */}
                {onCancel && (
                    <div className="mt-6 text-right">
                        <button onClick={onCancel} className="text-sm px-3 py-1 rounded-lg hover:bg-white/10">
                            Отменить (скрыть)
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
