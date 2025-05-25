import { Link } from 'react-router-dom'

export const AuthLayout = ({
                               children,
                               title,
                               subtitle,
                               linkPath,
                               linkText
                           }: {
    children: React.ReactNode
    title: string
    subtitle: string
    linkPath: string
    linkText: string
}) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl">
                <div className="flex justify-center mb-8">
                    <svg className="w-12 h-12 text-blue-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 14L8 10H16L12 14Z" fill="currentColor"/>
                        <path d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2ZM12 20C7.589 20 4 16.411 4 12C4 7.589 7.589 4 12 4C16.411 4 20 7.589 20 12C20 16.411 16.411 20 12 20Z" fill="currentColor"/>
                    </svg>
                </div>

                <h1 className="text-3xl font-bold text-slate-800 text-center mb-2">
                    {title}
                </h1>
                <p className="text-slate-500 text-center mb-8">
                    {subtitle}{' '}
                    <Link
                        to={linkPath}
                        className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
                    >
                        {linkText}
                    </Link>
                </p>

                {children}

                <div className="mt-8 pt-8 border-t border-slate-100">
                    <div className="text-center text-sm text-slate-500">
                        Employee Portal v1.0 · © 2025
                    </div>
                </div>
            </div>
        </div>
    )
}
