import { MainLayout } from '../components/MainLayout'
import { Button } from '../components/Button'
import { Link } from 'react-router-dom'

export default function EmployeeDetailPage() {
    return (
        <MainLayout>
            <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <Link to="/employees" className="text-blue-600 hover:text-blue-800 flex items-center">
                            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Employees
                        </Link>
                        <h1 className="text-2xl font-bold text-slate-800 mt-4">John Doe</h1>
                    </div>
                    <Button>Edit Employee</Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div className="p-4 bg-slate-50 rounded-lg">
                            <h2 className="text-sm font-medium text-slate-600 mb-2">Personal Information</h2>
                            <dl className="space-y-2">
                                <div>
                                    <dt className="text-sm text-slate-500">Birth Date</dt>
                                    <dd className="text-slate-800">1990-05-15</dd>
                                </div>
                                <div>
                                    <dt className="text-sm text-slate-500">Gender</dt>
                                    <dd className="text-slate-800">Male</dd>
                                </div>
                            </dl>
                        </div>

                        <div className="p-4 bg-slate-50 rounded-lg">
                            <h2 className="text-sm font-medium text-slate-600 mb-2">Job Information</h2>
                            <dl className="space-y-2">
                                <div>
                                    <dt className="text-sm text-slate-500">Department</dt>
                                    <dd className="text-slate-800">Engineering</dd>
                                </div>
                                <div>
                                    <dt className="text-sm text-slate-500">Current Title</dt>
                                    <dd className="text-slate-800">Senior Developer</dd>
                                </div>
                            </dl>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="p-4 bg-slate-50 rounded-lg">
                            <h2 className="text-sm font-medium text-slate-600 mb-2">Salary History</h2>
                            <div className="space-y-3">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="flex justify-between items-center">
                                        <div>
                                            <div className="text-slate-800">$95,000</div>
                                            <div className="text-sm text-slate-500">2023-01-15 to 2024-01-14</div>
                                        </div>
                                        <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Current</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}
