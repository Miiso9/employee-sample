import { useState } from 'react';
import { Input } from './Input';
import { Button } from './Button';
import axios from '../lib/axios';

interface Department {
    dept_no: string;
    dept_name: string;
}

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onCreated: (department: Department) => void;
}

export function DepartmentCreateModal({ isOpen, onClose, onCreated }: Props) {
    const [form, setForm] = useState<Partial<Department>>({});
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (field: keyof Department, value: string) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.post('/departments', {
                dept_name: form.dept_name,
            });
            onCreated(response.data);
            onClose();
            setForm({});
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
                    <h2 className="text-xl font-bold">Create New Department</h2>
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
                    <Input
                        id="dept_name"
                        label="Department Name"
                        value={form.dept_name || ''}
                        onChange={(val) => handleChange('dept_name', val)}
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
