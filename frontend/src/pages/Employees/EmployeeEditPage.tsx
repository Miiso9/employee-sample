import { useEffect, useState } from 'react';
import {useParams, useNavigate, Link} from 'react-router-dom';
import { MainLayout } from '../../components/MainLayout.tsx';
import { Button } from '../../components/Button.tsx';
import { Input } from '../../components/Input.tsx';
import axios from '../../lib/axios.ts';
import type { Employee } from '../../types/employee.ts';

export default function EmployeeEditPage() {
    const { emp_no } = useParams<{ emp_no: string }>();
    const [employee, setEmployee] = useState<Employee | null>(null);
    const [form, setForm] = useState<Partial<Employee>>({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`/employees/${emp_no}`);
                setEmployee(response.data);
                setForm(response.data);
            } catch (error) {
                console.error('Failed to fetch employee:', error);
            } finally {
                setLoading(false);
            }
        };

        if (emp_no) fetchEmployee();
    }, [emp_no]);

    const handleChange = (field: keyof Employee, value: string) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            await axios.put(`/employees/${emp_no}`, form);
            navigate(`/employees/${emp_no}`);
        } catch (error) {
            console.error('Update failed:', error);
        } finally {
            setSaving(false);
        }
    };

    if (loading) return (
        <MainLayout>
            <div className="flex justify-center items-center h-64">
                {/*<Spinner className="w-10 h-10 text-blue-500" />*/}
            </div>
        </MainLayout>
    );

    return (
        <MainLayout>
            <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <Link to={`/employees/${emp_no}`} className="text-blue-600 hover:text-blue-800 flex items-center">
                            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Employee
                        </Link>
                        <h1 className="text-2xl font-bold text-slate-800 mt-4">
                            Edit Employee: {employee?.first_name} {employee?.last_name}
                        </h1>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            id="a"
                            label="First Name"
                            value={form.first_name || ''}
                            onChange={(val) => handleChange('first_name', val)}
                        />
                        <Input
                            id="a"
                            label="Last Name"
                            value={form.last_name || ''}
                            onChange={(val) => handleChange('last_name', val)}
                        />
                        <Input
                            id="a"
                            label="Birth Date"
                            type="date"
                            value={form.birth_date || ''}
                            onChange={(val) => handleChange('birth_date', val)}
                        />
                        <Input
                            id="a"
                            label="Hire Date"
                            type="date"
                            value={form.hire_date || ''}
                            onChange={(val) => handleChange('hire_date', val)}
                        />
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Gender
                            </label>
                            <select
                                value={form.gender || ''}
                                onChange={(e) => handleChange('gender', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                required
                            >
                                <option value="">Select Gender</option>
                                <option value="M">Male</option>
                                <option value="F">Female</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                        <Button
                            type="button"
                            onClick={() => navigate(`/employees/${emp_no}`)}
                            className="bg-gray-200 text-gray-800 hover:bg-gray-300"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={saving}
                        >
                            {saving ? (
                                <>
                                    {/*<Spinner className="w-4 h-4 mr-2" />*/}
                                    Saving...
                                </>
                            ) : 'Save Changes'}
                        </Button>
                    </div>
                </form>
            </div>
        </MainLayout>
    );
}
