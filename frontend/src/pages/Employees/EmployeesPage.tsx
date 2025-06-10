import { useEffect, useState } from 'react';
import { MainLayout } from '../../components/MainLayout.tsx';
import { Input } from '../../components/Input.tsx';
import axios from '../../lib/axios.ts';
import toast from 'react-hot-toast';
import type {Employee} from '../../types/employee.ts';
import { EmployeeCreateModal } from '../../components/EmployeeCreateModal.tsx';
import {Button} from "../../components/Button.tsx";
import { useNavigate } from 'react-router-dom';

export default function EmployeesPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const handleEmployeeCreated = (newEmployee: Employee) => {
        setEmployees((prev) => [...prev, newEmployee]);
    };


    const navigate = useNavigate();

    const handleEdit = (employee: Employee) => {
        navigate(`/employees/edit/${employee.emp_no}`);
    };

    const handleView = (employee: Employee) => {
        navigate(`/employees/${employee.emp_no}`);
    };



    const handleDelete = async (empNo: number) => {
        if (!confirm('Are you sure you want to delete this employee?')) return;

        try {
            await axios.delete(`/employees/${empNo}`);
            setEmployees((prev) => prev.filter((emp) => emp.emp_no !== empNo));
            toast.success('Employees deleted successfully');
        } catch (error) {
            console.error('Failed to delete employee:', error);
            toast.error('Failed to delete employee');
        }
    };

    useEffect(() => {
        const fetchEmployees = async () => {
            setLoading(true);
            try {
                const response = await axios.get<Employee[]>('/employees');
                setEmployees(response.data);
            } catch (error) {
                console.error('Failed to fetch employees:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEmployees();
    }, []);



    return (
        <MainLayout>
            <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                    <Button onClick={() => setIsModalOpen(true)}>Add Employee</Button>
                    <EmployeeCreateModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        onCreated={handleEmployeeCreated}
                    />

                    <div className="w-64">
                        <Input
                            id="employee-search"
                            value={searchQuery}
                            onChange={(value) => setSearchQuery(value)}
                            placeholder="Search employees..."
                            label="Search employees..."
                            icon={
                                <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            }
                        />
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-10 text-slate-500 text-lg">Loading employees...</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-slate-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Employee</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Department</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Title</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Salary</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Hire Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-slate-200">
                            {employees.map((emp) => (
                                <tr key={emp.emp_no} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                                                <span className="text-blue-600">
                                                    {emp.first_name[0]}
                                                    {emp.last_name[0]}
                                                </span>
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-slate-900">
                                                    {emp.first_name} {emp.last_name}
                                                </div>
                                                <div className="text-sm text-slate-500">{emp.email ?? '—'}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{emp.department || '—'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{emp.title || '—'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                                        {emp.salary ? `$${emp.salary.toLocaleString()}` : '—'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{emp.hire_date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 space-x-2">
                                        <button onClick={() => handleView(emp)} className="text-green-600 hover:underline">View</button>
                                        <button onClick={() => handleEdit(emp)} className="text-blue-600 hover:underline">Edit</button>
                                        <button onClick={() => handleDelete(emp.emp_no)} className="text-red-600 hover:underline">Delete</button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </MainLayout>
    );
}
