import { useState } from 'react';
import { Input } from './Input';
import { Button } from './Button';
import axios from '../lib/axios';
import type { Employee } from '../types/employee';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onCreated: (employee: Employee) => void;
}

export function EmployeeCreateModal({ isOpen, onClose, onCreated }: Props) {
    const [form, setForm] = useState<Partial<Employee>>({});
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (field: keyof Employee, value: string) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.post('/employees', form);
            onCreated(response.data);
            onClose();
            setForm({}); // Reset form
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
                    <h2 className="text-xl font-bold">Create New Employee</h2>
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
                        id="first_name"
                        label="First Name"
                        value={form.first_name || ''}
                        onChange={(val) => handleChange('first_name', val)}
                    />
                    <Input
                        id="last_name"
                        label="Last Name"
                        value={form.last_name || ''}
                        onChange={(val) => handleChange('last_name', val)}
                    />
                    <Input
                        id="birth_date"
                        label="Birth Date"
                        type="date"
                        value={form.birth_date || ''}
                        onChange={(val) => handleChange('birth_date', val)}
                    />
                    <Input
                        id="hire_date"
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
