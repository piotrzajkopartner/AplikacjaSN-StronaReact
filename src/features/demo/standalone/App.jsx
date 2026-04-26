import React, { useState, useRef, useCallback } from 'react';
import DocumentList from './components/DocumentList';
import SerialEntry from './components/SerialEntry';
import Toast from './components/Toast';
import LicenseOverlay from './components/LicenseOverlay';
import LicenseStatus from './components/LicenseStatus';
import logo from './assets/logo300x300.png';

import { QrCode } from 'lucide-react';
import QRCode from 'react-qr-code';

function App() {
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [notification, setNotification] = useState(null); // { message, type }
  const [showQr, setShowQr] = useState(false);
  const serialEntryRef = useRef(null);

  // Lifted state for DocumentList persistence
  const [listState, setListState] = useState({
    documents: [],
    page: 1,
    totalPages: 1,
    tab: 'pending', // 'pending' or 'completed'
    docType: 'PZ',  // 'PZ', 'ZK', 'WZ', 'PA'
    searchQuery: '',
    searchScope: 'all', // 'all' | 'sn' | 'PZ' | 'ZK' | 'WZ' | 'PA'
    searchResults: null,
    lastUpdated: new Date()
  });

  const updateListState = useCallback((updates) => {
    setListState(prev => ({ ...prev, ...updates }));
  }, []);

  const showNotification = useCallback((message, type = 'success') => {
    setNotification({ message, type });
  }, []);

  const simulateLicenseBlock = () => {
    localStorage.setItem('demo_license_error', '1');
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-transparent font-sans text-gray-900 relative">
      <LicenseOverlay />

      {/* Toast Notification */}
      {notification && (
        <Toast
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
          <div
            className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => {
              if (selectedDocument) {
                // Route the click through SerialEntry's dirty-check gate
                serialEntryRef.current?.requestBack();
              }
            }}
            title={selectedDocument ? "Powrót do listy dokumentów" : "Partner Numery Seryjne"}
          >
            <img src={import.meta.env.VITE_APP_LOGO_URL || logo} alt="Logo" className="w-10 h-10 rounded-lg object-contain bg-white" />
            <h1 className="text-xl font-bold tracking-tight text-gray-900">
              Partner Numery Seryjne
            </h1>
          </div>

          <div className="ml-4 hidden sm:flex items-center">
            <LicenseStatus />
          </div>

          <div className="ml-4 hidden md:flex items-center">
            <span className="px-2 py-1 text-xs font-bold tracking-wide bg-amber-100 text-amber-800 border border-amber-300 rounded">
              TRYB DEMO (READ-ONLY)
            </span>
          </div>

          <div className="ml-2 hidden lg:flex items-center">
            <button
              onClick={simulateLicenseBlock}
              className="px-2 py-1 text-xs font-semibold bg-red-50 text-red-700 border border-red-200 rounded hover:bg-red-100 transition-colors"
              title="Symuluj zablokowaną licencję"
            >
              Symuluj blokadę licencji
            </button>
          </div>

          <div className="ml-auto">
            <button
              onClick={() => setShowQr(true)}
              className="p-2 text-gray-400 hover:text-gray-900 transition-colors"
              title="Pokaż kod QR do wersji mobilnej"
            >
              <QrCode size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* QR Code Modal */}
      {showQr && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setShowQr(false)}>
          <div className="bg-white p-6 rounded-2xl shadow-xl flex flex-col items-center gap-4 max-w-sm mx-4" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-gray-900">Skanuj aby otworzyć na telefonie</h3>
            <div className="p-4 bg-white border-2 border-gray-100 rounded-xl">
              <QRCode value={window.location.href} size={200} />
            </div>
            <p className="text-sm text-gray-500 text-center">
              Upewnij się, że telefon jest w tej samej sieci Wi-Fi co komputer.
            </p>
            <button
              onClick={() => setShowQr(false)}
              className="w-full py-2 bg-gray-100 font-medium text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Zamknij
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {selectedDocument ? (
          <SerialEntry
            ref={serialEntryRef}
            document={selectedDocument}
            onBack={() => {
              setSelectedDocument(null);
              // Optional: trigger refresh on back? Not needed strictly if we want to save state.
              // But if data changed, maybe? For now, we keep state.
            }}
            showNotification={showNotification}
            onNavigateToDocument={(doc) => {
              setSelectedDocument(doc);
            }}
          />
        ) : (
          <DocumentList
            onSelectDocument={setSelectedDocument}
            listState={listState}
            onUpdateListState={updateListState}
          />
        )}
      </main>
    </div>
  );
}

export default App;
