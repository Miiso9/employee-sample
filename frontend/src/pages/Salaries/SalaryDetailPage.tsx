import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MainLayout } from '../../components/MainLayout.tsx';
import { Button } from '../../components/Button.tsx';
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

export default function SalaryDetailPage() {
    const { emp_no, from_date } = useParams<{ emp_no: string; from_date: string }>();
    const [salary, setSalary] = useState<Salary | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSalary = async () => {
            try {
                const response = await axios.get(`/salaries/${emp_no}/${from_date}`);
                setSalary(response.data);
            } catch (err) {
                setError('Failed to fetch salary details');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (emp_no && from_date) fetchSalary();
    }, [emp_no, from_date]);

    if (loading) {
        return (
            <MainLayout>
                <div className="flex justify-center items-center h-64">Loading...</div>
            </MainLayout>
        );
    }

    if (error) {
        return (
            <MainLayout>
                <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                    <div className="text-red-500 mb-4">{error}</div>
                    <Button onClick={() => navigate('/salaries')}>Back to Salaries</Button>
                </div>
            </MainLayout>
        );
    }

    if (!salary) return null;

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
                            {salary.employee.first_name} {salary.employee.last_name}
                        </h1>
                    </div>
                    <Button onClick={() => navigate(`/salaries/edit/${salary.emp_no}/${salary.from_date}`)}>
                        Edit Salary
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 bg-slate-50 rounded-lg">
                        <h2 className="text-sm font-medium text-slate-600 mb-2">Salary Information</h2>
                        <dl className="space-y-2">
                            <div>
                                <dt className="text-sm text-slate-500">Employee ID</dt>
                                <dd className="text-slate-800">{salary.emp_no}</dd>
                            </div>
                            <div>
                                <dt className="text-sm text-slate-500">Salary</dt>
                                <dd className="text-slate-800">${salary.salary.toLocaleString()}</dd>
                            </div>
                            <div>
                                <dt className="text-sm text-slate-500">From Date</dt>
                                <dd className="text-slate-800">{salary.from_date}</dd>
                            </div>
                            <div>
                                <dt className="text-sm text-slate-500">To Date</dt>
                                <dd className="text-slate-800">{salary.to_date}</dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
