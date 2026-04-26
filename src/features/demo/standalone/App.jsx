import React, { useState, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import DocumentList from './components/DocumentList';
import SerialEntry from './components/SerialEntry';
import Toast from './components/Toast';
import LicenseStatus from './components/LicenseStatus';
import logo from './assets/logo300x300.png';

import { QrCode } from 'lucide-react';

function App() {
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [notification, setNotification] = useState(null); // { message, type }
  const [showQr, setShowQr] = useState(false);
  const serialEntryRef = useRef(null);
  const qrValue = 'tel:+48531977177';
  const qrImageSrc = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=8&data=${encodeURIComponent(qrValue)}`;
  const portalTarget = typeof document !== 'undefined' ? document.body : null;

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

  return (
    <div className="min-h-screen bg-transparent font-sans text-gray-900 relative">
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

          <div className="ml-auto">
            <button
              onClick={() => setShowQr(true)}
              className="p-2 text-gray-400 hover:text-gray-900 transition-colors"
              title="Pokaż kod QR do szybkiego telefonu"
            >
              <QrCode size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* QR Code Modal */}
      {showQr && portalTarget && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/65 p-4 backdrop-blur-sm" onClick={() => setShowQr(false)}>
          <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-gray-900">Skanuj, aby od razu zadzwonic</h3>
            <div className="mt-4 flex justify-center rounded-xl border-2 border-gray-100 bg-white p-4">
              <img src={qrImageSrc} alt="Kod QR do wersji demo" width="200" height="200" className="h-[200px] w-[200px] rounded" />
            </div>
            <p className="mt-4 text-sm text-gray-500">
              Po zeskanowaniu telefon otworzy dialer z gotowym numerem kontaktowym.
            </p>
            <p className="mt-2 text-xs font-semibold text-indigo-600">Masz pytania po demo? Zadzwoń od razu: 531-977-177.</p>
            <button
              onClick={() => setShowQr(false)}
              className="mt-4 w-full rounded-lg bg-gray-100 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-200"
            >
              Zamknij
            </button>
          </div>
        </div>,
        portalTarget
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
