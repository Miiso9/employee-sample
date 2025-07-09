import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthLayout } from '../components/AuthLayout';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import axios from '../lib/axios';

const PasswordStrength = ({ password }: { password: string }) => {
    const strength = Math.min(
        Math.floor(password.length / 3) +
        (/[A-Z]/.test(password) ? 1 : 0) +
        (/[!@#$%^&*]/.test(password) ? 1 : 0),
        4
    );

    return (
        <div className="h-1 bg-slate-100 rounded-full overflow-hidden mb-4">
            <div
                className={`h-full transition-all duration-500 ${
                    strength > 3
                        ? 'bg-green-400'
                        : strength > 2
                            ? 'bg-blue-400'
                            : strength > 1
                                ? 'bg-yellow-400'
                                : 'bg-red-400'
                }`}
                style={{ width: `${(strength / 4) * 100}%` }}
            />
        </div>
    );
};

export default function Register() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { setToken, fetchUser } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        console.log("IN");
        e.preventDefault();
        setError('');

        try {
            await axios.post('/register', { name, email, password });

            const loginResponse = await axios.post<{ token: string }>('/login', {
                email,
                password,
            });

            const token = loginResponse.data.token;
            setToken(token);
            await fetchUser();

            toast.success('Account created successfully!');
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
            title="Join Our Team"
            subtitle="Already have an account?"
            linkPath="/login"
            linkText="Sign in here"
        >
            <form onSubmit={handleSubmit}>
                <Input
                    label="Full Name"
                    id="name"
                    type="text"
                    value={name}
                    onChange={setName}
                    error={error}
                    autoFocus
                />

                <Input
                    label="Company Email"
                    id="email"
                    type="email"
                    value={email}
                    onChange={setEmail}
                    error={error}
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
                    label="Create Password"
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

                <PasswordStrength password={password}/>

                <div className="mt-8">
                    <Button type="submit" className="w-full">Create Account</Button>
                </div>
            </form>

            <div className="grid grid-cols-2 gap-4 mt-4">
                <a
                    href="http://localhost:8000/auth/google/redirect"
                    className="flex items-center justify-center p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                >
                    <img src="/google.svg" className="w-5 h-5 mr-2" alt="Google"/>
                    <span className="text-slate-700 text-sm">Google</span>
                </a>

                <button
                    className="flex items-center justify-center p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                >
                    <img src="/facebook.svg" className="w-5 h-5 mr-2" alt="Facebook"/>
                    <span className="text-slate-700 text-sm">Facebook</span>
                </button>
            </div>
            <a href="/login" className="text-blue-500 hover:text-blue-600">
                Have account already?
            </a>
            <div className="mt-8 pt-8 border-t border-slate-100">

                <p className="text-sm text-slate-500 text-center">
                    By creating an account, you agree to our
                    <br/>
                    <a href="#" className="text-blue-500 hover:text-blue-600">
                        Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="#" className="text-blue-500 hover:text-blue-600">
                        Privacy Policy
                    </a>
                </p>
            </div>
        </AuthLayout>
    );
}
