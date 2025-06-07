import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SocialLoginSuccess: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const params: URLSearchParams = new URLSearchParams(window.location.search);
        const token: string | null = params.get('token');

        if (token) {
            localStorage.setItem('auth_token', token);
            navigate('/employees');
        } else {
            navigate('/login');
        }
    }, [navigate]);

    return <p>Logging you in...</p>;
};

export default SocialLoginSuccess;
