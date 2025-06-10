import { useEffect, useState } from 'react';
import { MainLayout } from '../../components/MainLayout.tsx';
import { Input } from '../../components/Input.tsx';
import { Button } from '../../components/Button.tsx';
import axios from '../../lib/axios.ts';
import {SalaryCreateModal} from "../../components/SalariesCreateModal.tsx";
import {useNavigate} from "react-router-dom";

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

export default function SalariesPage() {
    const [salaries, setSalaries] = useState<Salary[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const fetchSalaries = async () => {
        try {
            const response = await axios.get('/salaries');
            setSalaries(response.data);
        } catch (err) {
            setError('Failed to fetch salary records.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSalaries();
    }, []);

    const handleDelete = async (emp_no: number, from_date: string) => {
        if (!confirm('Are you sure you want to delete this salary record?')) return;

        try {
            await axios.delete(`/salaries/${emp_no}/${from_date}`);
            setSalaries(prev => prev.filter(s => !(s.emp_no === emp_no && s.from_date === from_date)));
        } catch (error) {
            console.error('Failed to delete salary:', error);
        }
    };

    const filteredSalaries = salaries.filter(salary => {
        const fullName = `${salary.employee?.first_name ?? ''} ${salary.employee?.last_name ?? ''}`.toLowerCase();
        return fullName.includes(searchQuery.toLowerCase());
    });

    return (
        <MainLayout>
            <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                    <Button onClick={() => setIsModalOpen(true)}>Add Salary</Button>
                    <div className="flex gap-4">
                        <Input
                            label="Search salaries..."
                            id="salary-search"
                            value={searchQuery}
                            onChange={setSearchQuery}
                        />
                    </div>
                </div>

                {loading ? (
                    <div className="text-center text-slate-500">Loading...</div>
                ) : error ? (
                    <div className="text-center text-red-500">{error}</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-slate-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Employee</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Salary</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">From Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">To Date</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-slate-200">
                            {filteredSalaries.map((salary, index) => (
                                <tr key={index} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div
                                                className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                                                    <span className="text-blue-600">
                                                        {salary.employee?.first_name?.[0] ?? ''}{salary.employee?.last_name?.[0] ?? ''}
                                                    </span>
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-slate-900">
                                                    {salary.employee?.first_name} {salary.employee?.last_name}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                                        ${salary.salary.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                                        {salary.from_date}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                                        {salary.to_date}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right space-x-2">
                                        <button
                                            onClick={() => navigate(`/salaries/${salary.emp_no}/${salary.from_date}`)}
                                            className="text-green-600  hover:text-green-800"
                                        >
                                            View
                                        </button>
                                        <button
                                            onClick={() => navigate(`/salaries/edit/${salary.emp_no}/${salary.from_date}`)}
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(salary.emp_no, salary.from_date)}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            Delete
                                        </button>
                                    </td>

                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            <SalaryCreateModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onCreated={fetchSalaries}
            />
        </MainLayout>

    );
}
