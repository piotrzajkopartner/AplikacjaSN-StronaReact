import React, { useEffect } from 'react';
import { CheckCircle, AlertCircle, X, Info } from 'lucide-react';

const Toast = ({ message, type = 'success', onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => onClose(), 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    const icons = {
        success: <CheckCircle className="text-green-600" size={20} />,
        error: <AlertCircle className="text-red-600" size={20} />,
        info: <Info className="text-indigo-600" size={20} />
    };

    const bgStyles = {
        success: 'bg-white border-l-4 border-green-500',
        error: 'bg-white border-l-4 border-red-500',
        info: 'bg-white border-l-4 border-indigo-500'
    };

    return (
        <div className={`fixed top-6 right-6 z-50 transform transition-all duration-300 ease-in-out ui-fade-in`} role="status" aria-live="polite">
            <div className={`flex items-start gap-3 p-3 rounded-lg shadow-lg border border-gray-100 max-w-sm ${bgStyles[type] || bgStyles.success}`}>
                <div className="flex-shrink-0 mt-0.5">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-50">
                        {icons[type] || icons.success}
                    </div>
                </div>
                <div className="flex-1 mr-3">
                    <p className="text-sm font-medium text-gray-800 leading-tight">
                        {message}
                    </p>
                </div>
                <button
                    onClick={onClose}
                    aria-label="Zamknij powiadomienie"
                    className="text-gray-400 hover:text-gray-700 transition-fast p-1"
                >
                    <X size={16} />
                </button>
            </div>
        </div>
    );
};

export default Toast;
