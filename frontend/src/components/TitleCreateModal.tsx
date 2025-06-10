import { useEffect, useState } from 'react';
import { Input } from './Input';
import { Button } from './Button';
import axios from '../lib/axios';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onCreated: () => void;
}

interface Employee {
    emp_no: number;
    first_name: string;
    last_name: string;
}

export function TitleCreateModal({ isOpen, onClose, onCreated }: Props) {
    const [form, setForm] = useState({
        emp_no: '',
        title: '',
        from_date: '',
        to_date: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [employees, setEmployees] = useState<Employee[]>([]);

    useEffect(() => {
        if (isOpen) {
            axios.get('/employees')
                .then(res => setEmployees(res.data))
                .catch(err => console.error('Failed to fetch employees:', err));
        }
    }, [isOpen]);

    const handleChange = (field: string, value: string) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await axios.post('/titles', {
                emp_no: parseInt(form.emp_no),
                title: form.title,
                from_date: form.from_date,
                to_date: form.to_date || null,
            });
            onCreated();
            onClose();
            setForm({ emp_no: '', title: '', from_date: '', to_date: '' });
        } catch (error) {
            console.error('Creation failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
            <div
                className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Create New Title</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Employee</label>
                        <select
                            value={form.emp_no}
                            onChange={(e) => handleChange('emp_no', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            required
                        >
                            <option value="">Select Employee</option>
                            {employees.map(emp => (
                                <option key={emp.emp_no} value={emp.emp_no}>
                                    {emp.first_name} {emp.last_name} (#{emp.emp_no})
                                </option>
                            ))}
                        </select>
                    </div>

                    <Input
                        id="title"
                        label="Job Title"
                        value={form.title}
                        onChange={(val) => handleChange('title', val)}
                    />
                    <Input
                        id="from_date"
                        label="From Date"
                        type="date"
                        value={form.from_date}
                        onChange={(val) => handleChange('from_date', val)}
                    />
                    <Input
                        id="to_date"
                        label="To Date"
                        type="date"
                        value={form.to_date}
                        onChange={(val) => handleChange('to_date', val)}
                    />

                    <div className="flex justify-end space-x-2">
                        <Button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-200 text-gray-800 hover:bg-gray-300"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Creating...' : 'Create'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
