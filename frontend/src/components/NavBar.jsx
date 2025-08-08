import React from 'react';
import { Link } from 'react-router-dom';

export function NavBar() {
    return (
        <header className="sticky top-0 z-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                <div className="glass gradient-border rounded-2xl px-4 py-3 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-[rgba(3,197,194,0.2)] neon flex items-center justify-center">
                            <span className="text-xl">⚡</span>
                        </div>
                        <div>
                            <div className="font-extrabold tracking-tight">Xenon</div>
                            <div className="text-xs muted -mt-1">Modular AI Courses</div>
                        </div>
                    </Link>
                    <nav className="flex items-center gap-2">
                        <Link to="/dashboard" className="px-3 py-2 rounded-lg hover:bg-white/5">Dashboard</Link>
                        <Link to="/profile" className="px-3 py-2 rounded-lg hover:bg-white/5">Profile</Link>
                        <Link to="/logout" className="btn-neon rounded-xl px-4 py-2 text-sm">Logout</Link>
                    </nav>
                </div>
            </div>
        </header>
    );
}
