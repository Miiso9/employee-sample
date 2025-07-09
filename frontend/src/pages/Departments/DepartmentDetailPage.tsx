import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MainLayout } from '../../components/MainLayout';
import { Button } from '../../components/Button';
import axios from '../../lib/axios';
import toast from 'react-hot-toast';
import { AssignEmployeeModal } from '../../components/AssignEmployeeModal';
import { AssignManagerModal } from '../../components/AssignManagerModal';
import { useNavigate } from 'react-router-dom';

interface Employee {
    emp_no: string;
    first_name: string;
    last_name: string;
    from_date: string;
    to_date: string;
}

interface Department {
    dept_no: string;
    dept_name: string;
    employees: Employee[];
    managers: Employee[];
}

export default function DepartmentDetailPage() {
    const { dept_no } = useParams<{ dept_no: string }>();
    const [department, setDepartment] = useState<Department | null>(null);
    const [loading, setLoading] = useState(true);
    const [isAssignEmployeeOpen, setIsAssignEmployeeOpen] = useState(false);
    const [isAssignManagerOpen, setIsAssignManagerOpen] = useState(false);
    const navigate = useNavigate();

    const fetchDepartment = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`/departments/${dept_no}`);
            setDepartment(response.data);
        } catch (error) {
            console.error('Failed to fetch department:', error);
            toast.error('Failed to load department details');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (dept_no) fetchDepartment();
    }, [dept_no]);

    if (loading || !department) {
        return (
            <MainLayout>
                <div className="flex justify-center items-center h-64 text-slate-500">
                    Loading department...
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <Link to="/departments" className="text-blue-600 hover:text-blue-800 flex items-center">
                            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Departments
                        </Link>
                        <h1 className="text-2xl font-bold text-slate-800 mt-4">
                            {department.dept_name} (#{department.dept_no})
                        </h1>
                    </div>
                    <Button onClick={() => navigate(`/departments/edit/${dept_no}`)}>
                        Edit Department
                    </Button>
                </div>

                {/* Employees Section */}
                <div className="mt-6">
                    <h2 className="text-xl font-bold mb-4">Employees</h2>
                    {department.employees.length > 0 ? (
                        <ul className="space-y-2">
                            {department.employees.map((emp) => (
                                <li key={emp.emp_no} className="p-2 bg-slate-50 rounded">
                                    {emp.first_name} {emp.last_name} (From: {emp.from_date}, To: {emp.to_date})
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-slate-500">No employees assigned to this department.</p>
                    )}
                    <Button onClick={() => setIsAssignEmployeeOpen(true)} className="mt-4">
                        Assign Employee
                    </Button>
                </div>

                {/* Managers Section */}
                <div className="mt-6">
                    <h2 className="text-xl font-bold mb-4">Managers</h2>
                    {department.managers.length > 0 ? (
                        <ul className="space-y-2">
                            {department.managers.map((mgr) => (
                                <li key={mgr.emp_no} className="p-2 bg-slate-50 rounded">
                                    {mgr.first_name} {mgr.last_name} (From: {mgr.from_date}, To: {mgr.to_date})
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-slate-500">No managers assigned to this department.</p>
                    )}
                    <Button onClick={() => setIsAssignManagerOpen(true)} className="mt-4">
                        Assign Manager
                    </Button>
                </div>

                {/* Modals */}
                <AssignEmployeeModal
                    isOpen={isAssignEmployeeOpen}
                    onClose={() => setIsAssignEmployeeOpen(false)}
                    dept_no={department.dept_no}
                    onAssigned={fetchDepartment}
                />
                <AssignManagerModal
                    isOpen={isAssignManagerOpen}
                    onClose={() => setIsAssignManagerOpen(false)}
                    dept_no={department.dept_no}
                    onAssigned={fetchDepartment}
                />
            </div>
        </MainLayout>
    );
}
