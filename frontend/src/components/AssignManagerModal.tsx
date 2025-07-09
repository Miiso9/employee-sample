// src/components/AssignManagerModal.tsx

import { useState, useEffect } from 'react';
import { Input } from './Input';
import { Button } from './Button';
import axios from '../lib/axios.ts';
import toast from 'react-hot-toast';

interface Employee {
    emp_no: string;
    first_name: string;
    last_name: string;
}

interface Props {
    isOpen: boolean;
    onClose: () => void;
    dept_no: string;
    onAssigned: () => void;
}

export function AssignManagerModal({ isOpen, onClose, dept_no, onAssigned }: Props) {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [form, setForm] = useState({
        emp_no: '',
        from_date: '',
        to_date: '',
    });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isOpen) {
            axios.get('/employees').then((response) => {
                setEmployees(response.data);
            });
        }
    }, [isOpen]);

    const handleChange = (field: string, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await axios.post('/dept_manager', {
                emp_no: form.emp_no,
                dept_no,
                from_date: form.from_date,
                to_date: form.to_date,
            });
            toast.success('Manager assigned to department');
            onAssigned();
            onClose();
        } catch (error) {
            console.error('Assignment failed:', error);
            toast.error('Failed to assign manager');
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
                <h2 className="text-xl font-bold mb-4">Assign Manager to Department</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="emp_no" className="block text-sm font-medium text-gray-700">
                            Employee
                        </label>
                        <select
                            id="emp_no"
                            value={form.emp_no}
                            onChange={(e) => handleChange('emp_no', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        >
                            <option value="">Select Employee</option>
                            {employees.map((emp) => (
                                <option key={emp.emp_no} value={emp.emp_no}>
                                    {emp.first_name} {emp.last_name} (#{emp.emp_no})
                                </option>
                            ))}
                        </select>
                    </div>
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
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? 'Assigning...' : 'Assign as Manager'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
