import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MainLayout } from '../../components/MainLayout';
import { Button } from '../../components/Button';
import axios from '../../lib/axios';

type Title = {
    emp_no: number;
    title: string;
    from_date: string;
    to_date: string | null;
    employee: {
        first_name: string;
        last_name: string;
    };
};

export default function TitleDetailPage() {
    const { emp_no } = useParams<{ emp_no: string }>();
    const [titles, setTitles] = useState<Title[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTitle = async () => {
            try {
                const response = await axios.get(`/titles/${emp_no}`);
                setTitles(response.data);
            } catch (err) {
                setError('Failed to fetch title details');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (emp_no) fetchTitle();
    }, [emp_no]);

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
                    <Button onClick={() => navigate('/titles')}>Back to Titles</Button>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <Link to="/titles" className="text-blue-600 hover:text-blue-800 flex items-center">
                            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Titles
                        </Link>
                        <h1 className="text-2xl font-bold text-slate-800 mt-4">
                            Employee #{emp_no}
                        </h1>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {titles.map((title, index) => (
                        <div key={index} className="p-4 bg-slate-50 rounded-lg">
                            <h2 className="text-sm font-medium text-slate-600 mb-2">Title Record</h2>
                            <dl className="space-y-2">
                                <div>
                                    <dt className="text-sm text-slate-500">Title</dt>
                                    <dd className="text-slate-800">{title.title}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm text-slate-500">From Date</dt>
                                    <dd className="text-slate-800">{title.from_date}</dd>
                                </div>
                                {title.to_date && (
                                    <div>
                                        <dt className="text-sm text-slate-500">To Date</dt>
                                        <dd className="text-slate-800">{title.to_date}</dd>
                                    </div>
                                )}
                                <div>
                                    <dt className="text-sm text-slate-500">Employee</dt>
                                    <dd className="text-slate-800">
                                        {title.employee.first_name} {title.employee.last_name}
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    ))}
                </div>
            </div>
        </MainLayout>
    );
}
