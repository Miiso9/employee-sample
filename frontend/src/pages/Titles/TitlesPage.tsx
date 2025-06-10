import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '../../components/MainLayout';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { TitleCreateModal } from '../../components/TitleCreateModal';
import axios from '../../lib/axios';
import toast from 'react-hot-toast';

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

export default function TitlesPage() {
    const [titles, setTitles] = useState<Title[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const fetchTitles = async () => {
        setLoading(true);
        try {
            const response = await axios.get<Title[]>('/titles');
            setTitles(response.data);
        } catch (error) {
            console.error('Failed to fetch titles:', error);
            toast.error('Failed to load titles');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTitles();
    }, []);

    const filteredTitles = titles.filter((t) =>
        t.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleDelete = async (t: Title) => {
        if (!confirm('Are you sure you want to delete this title?')) return;

        try {
            await axios.delete(`/titles/${t.emp_no}`, {
                data: {
                    title: t.title,
                    from_date: t.from_date,
                },
            });
            toast.success('Title deleted');
            setTitles(prev =>
                prev.filter(item =>
                    !(item.emp_no === t.emp_no && item.title === t.title && item.from_date === t.from_date)
                )
            );
        } catch (err) {
            console.error('Failed to delete title:', err);
            toast.error('Failed to delete title');
        }
    };

    return (
        <MainLayout>
            <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-slate-800">Job Titles</h1>
                    <div className="flex items-center space-x-4">
                        <div className="w-64">
                            <Input
                                label="Search titles..."
                                id="title-search"
                                value={searchQuery}
                                onChange={setSearchQuery}
                            />
                        </div>
                        <Button onClick={() => setIsModalOpen(true)}>Add Title</Button>
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-10 text-slate-500">Loading titles...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredTitles.map((t, index) => (
                            <div key={`${t.emp_no}-${t.title}-${t.from_date}-${index}`} className="p-6 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-medium text-slate-800">{t.title}</h3>
                                    <span className="text-xs text-slate-500">#{t.emp_no}</span>
                                </div>
                                <div className="text-sm text-slate-600">
                                    <div className="mb-2">
                                        <span className="text-slate-500">Employee:</span> {t.employee.first_name} {t.employee.last_name}
                                    </div>
                                    <div>
                                        <span className="text-slate-500">From:</span> {t.from_date}
                                    </div>
                                    {t.to_date && (
                                        <div>
                                            <span className="text-slate-500">To:</span> {t.to_date}
                                        </div>
                                    )}
                                </div>
                                <div className="flex space-x-3 text-sm text-blue-600 mt-4">
                                    <button onClick={() => navigate(`/titles/${t.emp_no}`)}>View</button>
                                    <button onClick={() => navigate(`/titles/edit/${t.emp_no}/${encodeURIComponent(t.title)}/${t.from_date}`)}>Edit</button>
                                    <button onClick={() => handleDelete(t)} className="text-red-600">Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <TitleCreateModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onCreated={fetchTitles}
            />
        </MainLayout>
    );
}
