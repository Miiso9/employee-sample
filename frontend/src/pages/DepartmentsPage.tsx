import { MainLayout } from '../components/MainLayout'

export default function DepartmentsPage() {
    return (
        <MainLayout>
            <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-slate-800">Departments</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {['Engineering', 'Marketing', 'HR'].map((dept) => (
                        <div key={dept} className="p-6 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-medium text-slate-800">{dept}</h3>
                                <span className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">15 employees</span>
                            </div>
                            <div className="text-sm text-slate-600">
                                <div className="mb-2">
                                    <span className="text-slate-500">Manager:</span> John Doe
                                </div>
                                <div>
                                    <span className="text-slate-500">Budget:</span> $1.2M
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </MainLayout>
    )
}
