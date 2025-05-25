import { MainLayout } from '../components/MainLayout'
import { Input } from '../components/Input'
import {useState} from "react";

export default function EmployeesPage() {
    const [searchQuery, setSearchQuery] = useState('')

    return (
        <MainLayout>
            <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-slate-800">Employees</h1>
                    <div className="w-64">
                        <Input
                            id="employee-search"
                            value={searchQuery}
                            onChange={(value) => setSearchQuery(value)}
                            placeholder="Search employees..."
                            label="Search employees..."
                            icon={
                                <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            }
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Employee</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Department</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Title</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Salary</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Hire Date</th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-slate-200">
                        {[1, 2, 3].map((i) => (
                            <tr key={i} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                                            <span className="text-blue-600">JD</span>
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-slate-900">John Doe</div>
                                            <div className="text-sm text-slate-500">john.doe@company.com</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">Engineering</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">Senior Developer</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">$95,000</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">2023-01-15</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </MainLayout>
    )
}
