import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MainLayout } from '../../components/MainLayout.tsx';
import { Button } from '../../components/Button.tsx';
import axios from '../../lib/axios.ts';
import type { Employee } from '../../types/employee.ts';

export default function EmployeeDetailPage() {
    const { emp_no } = useParams<{ emp_no: string }>();
    const [employee, setEmployee] = useState<Employee | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`/employees/${emp_no}`);
                setEmployee(response.data);
            } catch (err) {
                setError('Failed to fetch employee details');
                console.error('Failed to fetch employee:', err);
            } finally {
                setLoading(false);
            }
        };

        if (emp_no) fetchEmployee();
    }, [emp_no]);

    if (loading) return (
        <MainLayout>
            <div className="flex justify-center items-center h-64">
                {/*<Spinner className="w-10 h-10 text-blue-500" />*/}
            </div>
        </MainLayout>
    );

    if (error) return (
        <MainLayout>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="text-red-500 mb-4">{error}</div>
                <Button onClick={() => navigate('/employees')}>Back to Employees</Button>
            </div>
        </MainLayout>
    );

    if (!employee) return null;

    return (
        <MainLayout>
            <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <Link to="/employees" className="text-blue-600 hover:text-blue-800 flex items-center">
                            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Employees
                        </Link>
                        <h1 className="text-2xl font-bold text-slate-800 mt-4">
                            {employee.first_name} {employee.last_name}
                        </h1>
                    </div>
                    <Button onClick={() => navigate(`/employees/edit/${employee.emp_no}`)}>
                        Edit Employee
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div className="p-4 bg-slate-50 rounded-lg">
                            <h2 className="text-sm font-medium text-slate-600 mb-2">Personal Information</h2>
                            <dl className="space-y-2">
                                <div>
                                    <dt className="text-sm text-slate-500">Employee ID</dt>
                                    <dd className="text-slate-800">{employee.emp_no}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm text-slate-500">Birth Date</dt>
                                    <dd className="text-slate-800">{employee.birth_date}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm text-slate-500">Gender</dt>
                                    <dd className="text-slate-800">{employee.gender === 'M' ? 'Male' : 'Female'}</dd>
                                </div>
                            </dl>
                        </div>

                        <div className="p-4 bg-slate-50 rounded-lg">
                            <h2 className="text-sm font-medium text-slate-600 mb-2">Job Information</h2>
                            <dl className="space-y-2">
                                <div>
                                    <dt className="text-sm text-slate-500">Hire Date</dt>
                                    <dd className="text-slate-800">{employee.hire_date}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm text-slate-500">Department</dt>
                                    <dd className="text-slate-800">{employee.department ?? '—'}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm text-slate-500">Current Title</dt>
                                    <dd className="text-slate-800">{employee.title ?? '—'}</dd>
                                </div>
                            </dl>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="p-4 bg-slate-50 rounded-lg">
                            <h2 className="text-sm font-medium text-slate-600 mb-2">Salary</h2>
                            <div className="text-slate-800 text-lg">
                                {employee.salary ? `$${employee.salary.toLocaleString()}` : '—'}
                            </div>
                        </div>

                        <div className="p-4 bg-slate-50 rounded-lg">
                            <h2 className="text-sm font-medium text-slate-600 mb-2">Employment History</h2>
                            <p className="text-slate-500 text-sm">No additional history available</p>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
