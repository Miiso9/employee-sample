import { useNavigate } from 'react-router-dom';
import axios from '../lib/axios.ts';
import toast from 'react-hot-toast';

const useLogout = () => {
    const navigate = useNavigate();

    const logout = async () => {
        try {
            await axios.post('/logout');
            toast.success('Logged out');
        } catch (error) {
            console.error('Logout failed:', error);
            toast.error('Logout failed')
        } finally {
            localStorage.removeItem('auth_token');
            navigate('/login');
        }
    };

    return logout;
};

export default useLogout;
