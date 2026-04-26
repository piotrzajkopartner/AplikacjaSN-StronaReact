import React from 'react';
import { AlertTriangle, ArrowLeft, X } from 'lucide-react';

/**
 * Modal dialog shown when the user tries to navigate away from SerialEntry
 * with unsaved serial number changes.
 *
 * Props:
 *   onStay    — callback when user clicks "Zostań na stronie"
 *   onLeave   — callback when user clicks "Opuść bez zapisywania"
 */
const UnsavedChangesDialog = ({ onStay, onLeave }) => {
    return (
        /* Backdrop */
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in"
            onClick={onStay} /* clicking backdrop = stay */
        >
            {/* Animated Border Wrapper */}
            <div
                className="relative w-full max-w-sm mx-4 p-[3px] rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center"
                onClick={e => e.stopPropagation()}
                style={{ animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}
            >
                {/* Spinning gradient background for the animated border */}
                <div
                    className="absolute w-[250%] h-[250%] bg-[conic-gradient(from_0deg,transparent_0%,transparent_75%,#4f46e5_100%)] animate-spin opacity-90 delay-150"
                    style={{ animationDuration: '3s' }}
                />

                {/* Inner Card content */}
                <div className="relative bg-white rounded-[14px] w-full h-full overflow-hidden flex flex-col z-10">
                    {/* Close X */}
                    <button
                        onClick={onStay}
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100 z-20"
                        aria-label="Zamknij"
                    >
                        <X size={18} />
                    </button>

                    <div className="p-6">
                        {/* Icon + Title */}
                        <div className="flex items-center gap-4 mb-4">
                            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                                <AlertTriangle className="text-orange-500" size={24} />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-gray-900">Niezapisane zmiany</h2>
                                <p className="text-xs text-orange-600 font-medium mt-0.5">Dane nie zostały zapisane</p>
                            </div>
                        </div>

                        {/* Body */}
                        <p className="text-sm text-gray-600 leading-relaxed mb-6">
                            Wpisałeś numery seryjne, które <span className="font-semibold text-gray-800">nie zostały jeszcze zapisane</span>.
                            Jeśli teraz wyjdziesz, wszystkie wprowadzone dane zostaną utracone.
                        </p>

                        {/* Buttons */}
                        <div className="flex flex-col gap-3">
                            {/* Primary — stay */}
                            <button
                                onClick={onStay}
                                className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 active:scale-95 transition-all shadow-md shadow-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            >
                                Zostań na stronie
                            </button>

                            {/* Secondary — leave */}
                            <button
                                onClick={onLeave}
                                className="w-full py-3 px-4 flex items-center justify-center gap-2 bg-white text-red-600 font-medium rounded-xl border border-red-200 hover:bg-red-50 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-red-300"
                            >
                                <ArrowLeft size={16} />
                                Opuść bez zapisywania
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(16px) scale(0.97); }
                    to   { opacity: 1; transform: translateY(0)    scale(1); }
                }
            `}</style>
        </div>
    );
};

export default UnsavedChangesDialog;
