import { useState } from 'react'

interface InputProps {
    label?: string;
    id: string;
    type?: string;
    value: string;
    onChange: (value: string) => void;
    error?: string;
    autoFocus?: boolean;
    icon?: React.ReactNode;
    placeholder?: string;
}

export const Input = ({
                          label,
                          id,
                          type = 'text',
                          value,
                          onChange,
                          error,
                          autoFocus = false,
                          icon,
                          placeholder
                      }: InputProps) => {
    const [isFocused, setIsFocused] = useState(false)

    return (
        <div className="mb-6">
            <div className={`relative border-b ${error ? 'border-red-400' : 'border-slate-200'} ${isFocused ? 'border-blue-500' : ''} transition-colors`}>
                {icon && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-400">
                        {icon}
                    </div>
                )}
                <input
                    id={id}
                    type={type}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    autoFocus={autoFocus}
                    className={`w-full pt-6 pb-2 ${icon ? 'pl-8' : 'pl-0'} pr-4 bg-transparent outline-none text-slate-700 placeholder-transparent peer`}
                    placeholder={placeholder || label}
                />
                <label
                    htmlFor={id}
                    className={`absolute left-0 ${icon ? 'pl-8' : 'pl-0'} transition-all duration-200 ${
                        value || isFocused
                            ? 'top-1 text-xs text-blue-500'
                            : 'top-1/2 -translate-y-1/2 text-slate-400'
                    }`}
                >
                    {label}
                </label>
            </div>
            {error && (
                <div className="mt-1 text-red-500 text-sm flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {error}
                </div>
            )}
        </div>
    )
}
