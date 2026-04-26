import React, { useEffect, useState } from 'react';
import api from '../api';

const LicenseStatus = () => {
    const [licenseInfo, setLicenseInfo] = useState(null);

    useEffect(() => {
        const fetchLicense = async () => {
            try {
                const res = await api.get('/license/status');
                setLicenseInfo(res.data);
            } catch (err) {
                console.error('Błąd pobierania statusu licencji', err);
            }
        };

        fetchLicense();
        // Check every hour
        const interval = setInterval(fetchLicense, 60 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    if (!licenseInfo || !licenseInfo.expirationDate) return null;

    const expiryDate = new Date(licenseInfo.expirationDate);
    const now = new Date();
    const daysLeft = Math.ceil((expiryDate - now) / (1000 * 60 * 60 * 24));

    let textColor = "text-gray-500";
    if (daysLeft <= 14 && daysLeft > 0) textColor = "text-orange-500 font-bold";
    else if (daysLeft <= 0) textColor = "text-red-600 font-bold";

    return (
        <div className={`text-xs ml-auto flex items-center ${textColor}`}>
            <span>Licencja ważna do: {expiryDate.toLocaleDateString('pl-PL')}</span>
            {daysLeft <= 14 && daysLeft > 0 && <span className="ml-1">(Pozostało {daysLeft} dni)</span>}
        </div>
    );
};

export default LicenseStatus;
