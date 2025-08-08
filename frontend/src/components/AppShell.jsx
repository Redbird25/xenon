import React from 'react';
import { NavBar } from './NavBar';

export function AppShell({ children }) {
    return (
        <div className="min-h-screen relative">
            <div className="bg-grid" />
            <NavBar />
            <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>
        </div>
    );
}
