import { MainLayout } from '../components/MainLayout'
import { Input } from '../components/Input'
import {useState} from "react";

export default function TitlesPage() {
    const [searchQuery, setSearchQuery] = useState('')

    return (
        <MainLayout>
            <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-slate-800">Job Titles</h1>
                    <div className="w-64">
                        <Input
                            label="Search titles..."
                            id="title-search"
                            value={searchQuery}
                            onChange={setSearchQuery}
                            icon={
                                <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            }
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {['Senior Developer', 'Marketing Manager', 'HR Specialist'].map((title) => (
                        <div key={title} className="p-6 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-medium text-slate-800">{title}</h3>
                                <span className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">5 employees</span>
                            </div>
                            <div className="text-sm text-slate-600">
                                <div className="mb-2">
                                    <span className="text-slate-500">Department:</span> Engineering
                                </div>
                                <div>
                                    <span className="text-slate-500">Avg Salary:</span> $98,500
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </MainLayout>
    )
}
