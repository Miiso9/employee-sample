import { Navigate, type RouteObject } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import EmployeesPage from '../pages/Employees/EmployeesPage.tsx';
import EmployeeDetailPage from '../pages/Employees/EmployeeDetailPage.tsx';
import DepartmentsPage from '../pages/Departments/DepartmentsPage.tsx';
import SalariesPage from '../pages/Salaries/SalariesPage.tsx';
import TitlesPage from '../pages/TitlesPage';
import SocialLoginSuccess from '../pages/SocialLoginSuccess';
import ProtectedRoute from './ProtectedRoute';
import EmployeeEditPage from "../pages/Employees/EmployeeEditPage.tsx";
import DepartmentEditPage from "../pages/Departments/DepartmentEditPage.tsx";
import SalaryEditPage from "../pages/Salaries/SalaryEditPage.tsx";
import SalaryDetailPage from "../pages/Salaries/SalaryDetailPage.tsx";

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
        path: '/employees/:emp_no',
        element: (
            <ProtectedRoute>
                <EmployeeDetailPage />
            </ProtectedRoute>
        ),
    },
    {
        path: '/employees/edit/:emp_no',
        element: (
            <ProtectedRoute>
                <EmployeeEditPage />
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
        path: '/departments/edit/:dept_no',
        element: (
            <ProtectedRoute>
                <DepartmentEditPage />
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
        path: '/salaries/edit/:emp_no/:from_date',
        element: (
            <ProtectedRoute>
                <SalaryEditPage />
            </ProtectedRoute>
        ),
    },
    {
        path: '/salaries/:emp_no/:from_date',
        element: (
            <ProtectedRoute>
                <SalaryDetailPage />
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
