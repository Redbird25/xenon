import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { AppShell } from '../components/AppShell';
import {useNavigate} from "react-router-dom";

export function Login() {
    const { loginUser } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await loginUser(email, password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.message);
        }
    };
    return (
        <AppShell>
            <div className="max-w-md mx-auto">
                <div className="glass gradient-border rounded-2xl p-6">
                    <h1 className="h1 mb-2">Вход</h1>
                    <p className="muted mb-6">Добро пожаловать обратно в Xenon</p>
                    <form className="space-y-4" onSubmit={onSubmit}>
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
                        <button type="submit" className="btn-neon rounded-xl w-full py-3 font-semibold">Войти</button>
                    </form>
                </div>
            </div>
        </AppShell>
    );
}
