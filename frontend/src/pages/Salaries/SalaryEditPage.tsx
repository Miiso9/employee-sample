import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MainLayout } from '../../components/MainLayout.tsx';
import { Button } from '../../components/Button.tsx';
import { Input } from '../../components/Input.tsx';
import axios from '../../lib/axios.ts';

type Salary = {
    emp_no: number;
    salary: number;
    from_date: string;
    to_date: string;
    employee: {
        first_name: string;
        last_name: string;
    };
};

export default function SalaryEditPage() {
    const { emp_no, from_date } = useParams<{ emp_no: string; from_date: string }>();
    const [salary, setSalary] = useState<Salary | null>(null);
    const [form, setForm] = useState<Partial<Salary>>({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSalary = async () => {
            try {
                const response = await axios.get(`/salaries/${emp_no}/${from_date}`);
                setSalary(response.data);
                setForm({
                    salary: response.data.salary,
                    to_date: response.data.to_date,
                });
            } catch (error) {
                console.error('Failed to fetch salary:', error);
            } finally {
                setLoading(false);
            }
        };

        if (emp_no && from_date) fetchSalary();
    }, [emp_no, from_date]);

    const handleChange = (field: keyof Salary, value: string) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            await axios.put(`/salaries/${emp_no}/${from_date}`, form);
            navigate('/salaries');
        } catch (error) {
            console.error('Update failed:', error);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <MainLayout>
                <div className="flex justify-center items-center h-64">
                    {/* <Spinner className="w-10 h-10 text-blue-500" /> */}
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <Link to="/salaries" className="text-blue-600 hover:text-blue-800 flex items-center">
                            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Salaries
                        </Link>
                        <h1 className="text-2xl font-bold text-slate-800 mt-4">
                            Edit Salary for {salary?.employee?.first_name} {salary?.employee?.last_name}
                        </h1>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            id="salary"
                            label="Salary"
                            type="number"
                            value={form.salary?.toString() || ''}
                            onChange={(val) => handleChange('salary', val)}
                        />
                        <Input
                            id="to_date"
                            label="To Date"
                            type="date"
                            value={form.to_date || ''}
                            onChange={(val) => handleChange('to_date', val)}
                        />
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                        <Button
                            type="button"
                            onClick={() => navigate('/salaries')}
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
