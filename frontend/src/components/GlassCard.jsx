import React from 'react';

export function GlassCard({ children, className = '', onClick }) {
    return (
        <div
            onClick={onClick}
            className={
                `glass rounded-2xl p-5 transition hover:translate-y-[-2px] hover:shadow-xl cursor-pointer ${className}`
            }
        >
            {children}
        </div>
    );
}
