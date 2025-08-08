// src/pages/Register.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export function Register() {
    const { registerUser } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerUser(email, password);
            navigate('/login');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
            <form
                onSubmit={onSubmit}
                className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg"
            >
                <h2 className="text-3xl font-bold mb-6 text-[#003366] text-center">
                    Регистрация
                </h2>
                {error && (
                    <div className="mb-4 text-center text-red-600">
                        {error}
                    </div>
                )}
                <label className="block mb-2 text-[#1F2937] font-medium">Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    placeholder="you@example.com"
                    className="w-full mb-4 p-3 border border-[#03C5C2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#03C5C2] text-[#1F2937] bg-white"
                />

                <label className="block mb-2 text-[#1F2937] font-medium">Пароль</label>
                <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="w-full mb-6 p-3 border border-[#03C5C2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#03C5C2] text-[#1F2937] bg-white"
                />

                <button
                    type="submit"
                    className="w-full py-3 font-semibold rounded-lg bg-[#03C5C2] hover:bg-[#FFCD02] text-white transition"
                >
                    Зарегистрироваться
                </button>
            </form>
        </div>
    );
}
