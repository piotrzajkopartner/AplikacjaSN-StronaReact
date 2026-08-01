import { useState, useRef, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import QRCode from 'react-qr-code';
import DocumentList from './components/DocumentList';
import SerialEntry from './components/SerialEntry';
import Toast from './components/Toast';
import LicenseStatus from './components/LicenseStatus';
import logo from './assets/logo300x300.png';

import { QrCode as QrCodeIcon } from 'lucide-react';

function App() {
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [notification, setNotification] = useState(null); // { message, type }
  const [showQr, setShowQr] = useState(false);
  const serialEntryRef = useRef(null);
  const qrTriggerRef = useRef(null);
  const qrCloseRef = useRef(null);
  const qrPreviousFocusRef = useRef(null);
  const demoUrl = typeof window !== 'undefined'
    ? new URL('/demo', window.location.origin).href
    : '/demo';
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

  const closeQr = useCallback(() => {
    setShowQr(false);
    const previousFocus = qrPreviousFocusRef.current;
    qrPreviousFocusRef.current = null;
    window.requestAnimationFrame(() => {
      if (previousFocus?.isConnected) previousFocus.focus();
    });
  }, []);

  const openQr = () => {
    qrPreviousFocusRef.current = document.activeElement;
    setShowQr(true);
  };

  useEffect(() => {
    if (!showQr) return undefined;

    const focusFrame = window.requestAnimationFrame(() => qrCloseRef.current?.focus());
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') closeQr();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeQr, showQr]);

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
              ref={qrTriggerRef}
              type="button"
              onClick={openQr}
              className="p-2 text-gray-400 hover:text-gray-900 transition-colors"
              title="Pokaż kod QR do wersji mobilnej"
              aria-label="Pokaż kod QR do strony demo"
            >
              <QrCodeIcon size={24} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* QR Code Modal */}
      {showQr && portalTarget && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/65 p-4 backdrop-blur-sm" onClick={closeQr}>
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="demo-qr-title"
            className="max-h-[calc(100dvh-2rem)] w-full max-w-sm overflow-y-auto overscroll-contain rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 id="demo-qr-title" className="text-lg font-bold text-gray-900">Otwórz tę stronę demo na telefonie</h3>
            <div className="mt-4 flex justify-center rounded-xl border-2 border-gray-100 bg-white p-4">
              <QRCode
                value={demoUrl}
                size={200}
                title="Kod QR prowadzący do strony demo"
                className="h-[200px] w-[200px]"
              />
            </div>
            <p className="mt-4 text-sm text-gray-500">
              Kod zawiera aktualny adres tej witryny z bezpośrednią ścieżką /demo. Zeskanuj go,
              aby otworzyć ten sam interaktywny pokaz w przeglądarce telefonu.
            </p>
            <a href="tel:+48531977177" className="mt-2 block text-xs font-semibold text-indigo-600 hover:text-indigo-700">
              W razie pytań po demo: 531 977 177
            </a>
            <button
              ref={qrCloseRef}
              type="button"
              onClick={closeQr}
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
