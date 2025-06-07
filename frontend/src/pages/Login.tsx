import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthLayout } from '../components/AuthLayout';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import axios from '../lib/axios';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { setToken, fetchUser } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post<{ token: string }>('/login', {
                email,
                password,
            });

            const token = response.data.token;
            setToken(token);
            await fetchUser();

            toast.success('Logged in successfully!');
            navigate('/employees');
        } catch (err: any) {
            if (err.response?.data?.message) {
                setError(err.response.data.message);
                toast.error(err.response.data.message);
            } else {
                setError('Something went wrong');
                toast.error('Something went wrong');
            }
        }
    };

    return (
        <AuthLayout
            title="Welcome Back"
            subtitle="New to Employee Portal?"
            linkPath="/register"
            linkText="Create account"
        >
            <form onSubmit={handleSubmit}>
                <Input
                    label="Company Email"
                    id="email"
                    type="email"
                    value={email}
                    onChange={setEmail}
                    error={error}
                    autoFocus
                    icon={
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                        </svg>
                    }
                />

                <Input
                    label="Password"
                    id="password"
                    type="password"
                    value={password}
                    onChange={setPassword}
                    error={error}
                    icon={
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                        </svg>
                    }
                />

                <div className="mt-8">
                    <Button type="submit" className="w-full">
                        Sign In
                    </Button>
                </div>
            </form>

            <div className="my-8 flex items-center">
                <div className="flex-1 border-t border-slate-200"></div>
                <span className="px-4 text-slate-500 text-sm">Or continue with</span>
                <div className="flex-1 border-t border-slate-200"></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <a
                    href="http://localhost:8000/auth/google/redirect"
                    className="flex items-center justify-center p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                >
                    <img src="/google.svg" className="w-5 h-5 mr-2" alt="Google" />
                    <span className="text-slate-700 text-sm">Google</span>
                </a>

                <button
                    disabled
                    className="flex items-center justify-center p-3 border border-slate-200 rounded-lg bg-slate-100 text-slate-400 cursor-not-allowed"
                >
                    <img src="/microsoft.svg" className="w-5 h-5 mr-2" alt="Microsoft" />
                    <span className="text-sm">Microsoft</span>
                </button>
            </div>
        </AuthLayout>
    );
}
