import {createContext, useContext, useState, type ReactNode, useEffect} from 'react';
import axios from '../lib/axios';
import toast from "react-hot-toast";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthContextType {
    token: string | null;
    setToken: (token: string | null) => void;
    logout: () => void;
    user: User | null;
    fetchUser: () => Promise<void>;
}

interface User {
    id: number;
    name: string;
    email: string;
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setTokenState] = useState<string | null>(localStorage.getItem('auth_token'));
    const [user, setUser] = useState<User | null>(null);

    const setToken = (newToken: string | null) => {
        if (newToken) {
            localStorage.setItem('auth_token', newToken);
        } else {
            localStorage.removeItem('auth_token');
        }
        setTokenState(newToken);
    };

    const fetchUser = async () => {
        try {
            const response = await axios.get<User>('/user');
            setUser(response.data);
        } catch {
            setUser(null);
        }
    };

    const logout = async () => {
        try {
            await axios.post('/logout');
            toast.success('Logged out');
        } catch {
            toast.error('Logout failed');
        } finally {
            setToken(null);
            setUser(null);
        }
    };

    useEffect(() => {
        if (token) {
            fetchUser();
        }
    }, [token]);

    return (
        <AuthContext.Provider value={{ token, setToken, logout, user, fetchUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
};
