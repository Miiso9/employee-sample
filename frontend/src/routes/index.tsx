import {Navigate, type RouteObject} from 'react-router-dom'
import Login from '../pages/Login'
import Register from '../pages/Register'
import EmployeesPage from '../pages/EmployeesPage'
import EmployeeDetailPage from '../pages/EmployeeDetailPage'
import DepartmentsPage from '../pages/DepartmentsPage'
import SalariesPage from '../pages/SalariesPage'
import TitlesPage from '../pages/TitlesPage'
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
        path: '/employees',
        element: <EmployeesPage />,
    },
    {
        path: '/employees/:id',
        element: <EmployeeDetailPage />,
    },
    {
        path: '/departments',
        element: <DepartmentsPage />,
    },
    {
        path: '/salaries',
        element: <SalariesPage />,
    },
    {
        path: '/titles',
        element: <TitlesPage />,
    }
]
