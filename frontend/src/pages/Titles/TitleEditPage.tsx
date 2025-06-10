import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MainLayout } from '../../components/MainLayout';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
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

export default function TitleEditPage() {
    const { emp_no, title, from_date } = useParams<{ emp_no: string; title: string; from_date: string }>();
    const [record, setRecord] = useState<Title | null>(null);
    const [form, setForm] = useState<Partial<Title>>({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTitle = async () => {
            try {
                const response = await axios.get(`/titles/${emp_no}`);
                const match = response.data.find((t: Title) => t.title === title && t.from_date === from_date);
                setRecord(match);
                setForm({
                    to_date: match?.to_date || '',
                });
            } catch (error) {
                console.error('Failed to fetch title:', error);
            } finally {
                setLoading(false);
            }
        };

        if (emp_no && title && from_date) fetchTitle();
    }, [emp_no, title, from_date]);

    const handleChange = (field: keyof Title, value: string) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            await axios.put(`/titles/${emp_no}`, {
                title,
                from_date,
                to_date: form.to_date || null,
            });
            navigate('/titles');
        } catch (error) {
            console.error('Update failed:', error);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <MainLayout>
                <div className="flex justify-center items-center h-64">Loading...</div>
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
                            Edit Title for {record?.employee?.first_name} {record?.employee?.last_name}
                        </h1>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                            onClick={() => navigate('/titles')}
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
