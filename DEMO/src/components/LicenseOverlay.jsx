import React, { useEffect, useState } from 'react';
import api from '../api';

const LicenseOverlay = () => {
    const [licenseError, setLicenseError] = useState(null);

    useEffect(() => {
        const handleLicenseError = (e) => {
            setLicenseError(e.detail);
        };
        
        window.addEventListener('license-error', handleLicenseError);
        
        return () => {
            window.removeEventListener('license-error', handleLicenseError);
        };
    }, []);

    if (!licenseError) return null;

    const { error, message, hwid } = licenseError;

    const copyHwid = () => {
        if (hwid) {
            navigator.clipboard.writeText(hwid);
            alert('Skopiowano HWID do schowka!');
        }
    };

    const handleRefresh = async () => {
        try {
            await api.post('/license/refresh');
            window.location.reload();
        } catch (err) {
            alert('Nie udało się odświeżyć statusu. Spróbuj ponownie.');
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-red-900 bg-opacity-90 flex items-center justify-center text-white p-4">
            <div className="bg-white text-gray-900 p-8 rounded shadow-lg max-w-md w-full text-center">
                <h1 className="text-2xl font-bold text-red-600 mb-4">Aplikacja Zablokowana</h1>
                <p className="mb-4">{message || 'Wystąpił problem z licencją systemu.'}</p>
                <p className="text-sm text-gray-500 mb-4">Kod błędu: {error}</p>
                
                {hwid && (
                    <div className="mt-4 p-4 bg-gray-100 rounded border border-gray-300">
                        <p className="text-sm font-semibold mb-2">Twój identyfikator sprzętowy (HWID):</p>
                        <code className="block break-all bg-gray-200 p-2 rounded text-xs mb-3 select-all">
                            {hwid}
                        </code>
                        <div className="flex gap-2 justify-center">
                            <button 
                                onClick={copyHwid}
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                            >
                                Kopiuj HWID
                            </button>
                            <button 
                                onClick={handleRefresh}
                                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                            >
                                Ponów sprawdzenie
                            </button>
                        </div>
                    </div>
                )}
                
                <p className="mt-6 text-sm text-gray-600">
                    Prosimy o kontakt z pomocą techniczną (dostawcą oprogramowania) w celu przywrócenia dostępu.
                </p>
                
                {!hwid && (
                    <button 
                        onClick={handleRefresh}
                        className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                    >
                        Odśwież stronę i spróbuj ponownie
                    </button>
                )}
            </div>
        </div>
    );
};

export default LicenseOverlay;
