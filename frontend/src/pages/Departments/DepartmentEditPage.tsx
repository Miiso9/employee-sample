import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MainLayout } from '../../components/MainLayout';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import axios from '../../lib/axios';

interface Department {
    dept_no: string;
    dept_name: string;
}

export default function DepartmentEditPage() {
    const { dept_no } = useParams<{ dept_no: string }>();
    const [department, setDepartment] = useState<Department | null>(null);
    const [form, setForm] = useState<Partial<Department>>({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDepartment = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`/departments/${dept_no}`);
                setDepartment(response.data);
                setForm(response.data);
            } catch (error) {
                console.error('Failed to fetch department:', error);
            } finally {
                setLoading(false);
            }
        };

        if (dept_no) fetchDepartment();
    }, [dept_no]);

    const handleChange = (field: keyof Department, value: string) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            await axios.put(`/departments/${dept_no}`, form);
            navigate('/departments');
        } catch (error) {
            console.error('Update failed:', error);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
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
                            Edit Department: {department?.dept_name}
                        </h1>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                        id="dept_name"
                        label="Department Name"
                        value={form.dept_name || ''}
                        onChange={(val) => handleChange('dept_name', val)}
                    />

                    <div className="flex justify-end space-x-3 pt-4">
                        <Button
                            type="button"
                            onClick={() => navigate('/departments')}
                            className="bg-gray-200 text-gray-800 hover:bg-gray-300"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={saving}
                        >
                            {saving ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </div>
                </form>
            </div>
        </MainLayout>
    );
}
