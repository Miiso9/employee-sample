import { Navigate, type RouteObject } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import EmployeesPage from '../pages/EmployeesPage';
import EmployeeDetailPage from '../pages/EmployeeDetailPage';
import DepartmentsPage from '../pages/DepartmentsPage';
import SalariesPage from '../pages/SalariesPage';
import TitlesPage from '../pages/TitlesPage';
import SocialLoginSuccess from '../pages/SocialLoginSuccess';
import ProtectedRoute from './ProtectedRoute';

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <Navigate to="/register" replace />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/register',
        element: <Register />,
    },
    {
        path: '/social-login-success',
        element: <SocialLoginSuccess />,
    },
    {
        path: '/employees',
        element: (
            <ProtectedRoute>
                <EmployeesPage />
            </ProtectedRoute>
        ),
    },
    {
        path: '/employees/:id',
        element: (
            <ProtectedRoute>
                <EmployeeDetailPage />
            </ProtectedRoute>
        ),
    },
    {
        path: '/departments',
        element: (
            <ProtectedRoute>
                <DepartmentsPage />
            </ProtectedRoute>
        ),
    },
    {
        path: '/salaries',
        element: (
            <ProtectedRoute>
                <SalariesPage />
            </ProtectedRoute>
        ),
    },
    {
        path: '/titles',
        element: (
            <ProtectedRoute>
                <TitlesPage />
            </ProtectedRoute>
        ),
    },
];
