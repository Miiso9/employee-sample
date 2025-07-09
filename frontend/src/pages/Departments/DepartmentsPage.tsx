import { useEffect, useState } from 'react';
import { MainLayout } from '../../components/MainLayout.tsx';
import axios from '../../lib/axios.ts';
import toast from 'react-hot-toast';
import { Button } from '../../components/Button.tsx';
import { useNavigate } from 'react-router-dom';
import { DepartmentCreateModal } from '../../components/DepartmentCreateModal.tsx';

type Department = {
    dept_no: string;
    dept_name: string;
};

export default function DepartmentsPage() {
    const [departments, setDepartments] = useState<Department[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const fetchDepartments = async () => {
        setLoading(true);
        try {
            const response = await axios.get<Department[]>('/departments');
            setDepartments(response.data);
        } catch (error) {
            console.error('Failed to fetch departments:', error);
            toast.error('Failed to load departments');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (deptNo: string) => {
        if (!confirm('Are you sure you want to delete this department?')) return;

        try {
            await axios.delete(`/departments/${deptNo}`);
            setDepartments((prev) => prev.filter((d) => d.dept_no !== deptNo));
            toast.success('Department deleted');
        } catch (error) {
            console.error('Failed to delete department:', error);
            toast.error('Failed to delete department');
        }
    };

    const handleCreated = (newDept: Department) => {
        setDepartments((prev) => [...prev, newDept]);
    };

    useEffect(() => {
        fetchDepartments();
    }, []);

    return (
        <MainLayout>
            <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-slate-800">Departments</h1>
                    <Button onClick={() => setIsModalOpen(true)}>Add Department</Button>
                    <DepartmentCreateModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        onCreated={handleCreated}
                    />
                </div>

                {loading ? (
                    <div className="text-center py-10 text-slate-500">Loading departments...</div>
                ) : departments.length === 0 ? (
                    <div className="text-center py-10 text-slate-500">No departments found.</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {departments.map((dept) => (
                            <div key={dept.dept_no} className="p-6 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-medium text-slate-800">{dept.dept_name}</h3>
                                    <span className="text-xs text-slate-500">#{dept.dept_no}</span>
                                </div>
                                <div className="flex space-x-3 text-sm text-blue-600">
                                    <button onClick={() => navigate(`/departments/${dept.dept_no}`)}>View</button>
                                    <button onClick={() => navigate(`/departments/edit/${dept.dept_no}`)}>Edit</button>
                                    <button onClick={() => handleDelete(dept.dept_no)} className="text-red-600">Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </MainLayout>
    );
}
