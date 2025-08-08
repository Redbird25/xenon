import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { AppShell } from '../components/AppShell';

export function Register() {
    const { register } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <AppShell>
            <div className="max-w-md mx-auto">
                <div className="glass gradient-border rounded-2xl p-6">
                    <h1 className="h1 mb-2">Регистрация</h1>
                    <p className="muted mb-6">Создайте аккаунт инструктора или студента</p>
                    <form className="space-y-4" onSubmit={(e)=>{ e.preventDefault(); register(email, password); }}>
                        <input
                            type="email"
                            className="w-full rounded-xl bg-white/5 border border-white/15 px-4 py-3"
                            placeholder="Email"
                            value={email} onChange={e => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            className="w-full rounded-xl bg-white/5 border border-white/15 px-4 py-3"
                            placeholder="Пароль"
                            value={password} onChange={e => setPassword(e.target.value)}
                            required
                        />
                        <button className="btn-neon rounded-xl w-full py-3 font-semibold">Создать аккаунт</button>
                    </form>
                </div>
            </div>
        </AppShell>
    );
}
