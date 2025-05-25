import { Link, useLocation } from 'react-router-dom'

export const Navigation = () => {
    const { pathname } = useLocation()

    const links = [
        { name: 'Employees', path: '/employees' },
        { name: 'Departments', path: '/departments' },
        { name: 'Salaries', path: '/salaries' },
        { name: 'Titles', path: '/titles' },
    ]

    return (
        <nav className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex space-x-8">
                        {links.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                                    pathname === link.path
                                        ? 'border-blue-500 text-blue-700'
                                        : 'border-transparent text-slate-600 hover:text-slate-800 hover:border-slate-300'
                                }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    )
}
