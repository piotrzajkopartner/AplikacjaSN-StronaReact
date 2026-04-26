import React, { useState, useEffect, useRef, useCallback, forwardRef, useImperativeHandle } from 'react';
import { ArrowLeft, Save, Box, AlertCircle, CheckCircle, RefreshCw, X, FileText, Camera, ScanLine, Lock } from 'lucide-react';
import api, { endpoints, openWarrantyPreview } from '../api';
import MobileScanner from './MobileScanner';
import UnsavedChangesDialog from './UnsavedChangesDialog';
import useSWR from 'swr';

// Helper SWR fetcher
const fetcher = url => api.get(url).then(res => res.data);

const SerialEntry = forwardRef(({ document: initialDocument, onBack, showNotification, onNavigateToDocument }, ref) => {
    const documentId = initialDocument.Id;

    const debugFlicker = useCallback((message, payload) => {
        if (localStorage.getItem('sn_debug_flicker') !== '1') return;
        if (payload !== undefined) {
            console.debug(`[SerialEntry:${documentId}] ${message}`, payload);
            return;
        }
        console.debug(`[SerialEntry:${documentId}] ${message}`);
    }, [documentId]);

    // Merge props with fetched details
    const [document, setDocument] = useState(initialDocument);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // State to hold serial numbers: { [itemId]: string[] }
    const [serialsMap, setSerialsMap] = useState({});

    // Baseline snapshot of serials as loaded from the server (used for dirty-check)
    const [initialSerialsMap, setInitialSerialsMap] = useState({});

    // Unsaved-changes dialog
    const [showUnsavedDialog, setShowUnsavedDialog] = useState(false);
    const pendingBackAction = useRef(null);

    // State to track duplicates: { 'itemId-index': { isLocal: bool, isDb: bool, details: string } }
    const [duplicates, setDuplicates] = useState({});

    // Filtering State
    const [searchTerm, setSearchTerm] = useState('');
    const [hideNonSerial, setHideNonSerial] = useState(false);

    // Mobile Scanner State
    const [isScannerOpen, setIsScannerOpen] = useState(false);
    const [scannerMode, setScannerMode] = useState('single'); // 'single' | 'multi'
    const [scanTarget, setScanTarget] = useState(null); // { itemId, index } for single, { itemId } for multi

    // --- LOCKING SYSTEM ---
    const [isLockedByMe, setIsLockedByMe] = useState(false);
    const [lockMessage, setLockMessage] = useState('');
    const [zkUnlocked, setZkUnlocked] = useState(false);

    // SWR to poll lock status if we DON'T own it (to know when it's free)
    // Polling every 5 seconds if not locked by me
    const { data: lockStatus, mutate: mutateLock } = useSWR(
        !isLockedByMe ? `/documents/${documentId}/lock?clientId=${localStorage.getItem('sn_client_id')}` : null,
        fetcher,
        { refreshInterval: 5000 }
    );

    const tryAcquireLock = useCallback(async () => {
        try {
            const res = await endpoints.lockDocument(documentId);
            setIsLockedByMe(res.data.lockedByMe);
            if (!res.data.lockedByMe) {
                setLockMessage(res.data.message || 'Zablokowane przez innego użytkownika');
            } else {
                setLockMessage('');
            }
        } catch (err) {
            console.error('Lock error:', err);
        }
    }, [documentId]);

    const handleTakeOver = () => {
        tryAcquireLock().then(() => {
            // Po przejęciu blokady ODŚWIEŻAMY wszystkie dane, aby widzieć zmiany poprzednika
            loadData();
        });
    };

    useEffect(() => {
        debugFlicker('lock-init');
        // Initial lock attempt only when opening/changing document
        tryAcquireLock();

        return () => {
            // Unlock only when leaving/changing document (not on every heartbeat state change)
            endpoints.unlockDocument(documentId).catch(console.error);
        };
    }, [documentId, tryAcquireLock, debugFlicker]);

    useEffect(() => {
        if (!isLockedByMe) return undefined;

        const intervalId = setInterval(() => {
            tryAcquireLock(); // Renew lock heartbeat
        }, 10000);

        return () => clearInterval(intervalId);
    }, [isLockedByMe, tryAcquireLock]);

    const isReadOnly = !isLockedByMe;
    const canTakeOver = lockStatus && !lockStatus.isLocked && !isLockedByMe;

    // ZK Block Logic
    const isZkBlocked = document.Symbol === 'ZK' && document.IsComplete && !!document.RealizedByWzId && !zkUnlocked;
    const isSaveDisabled = saving || isReadOnly || isZkBlocked;
    const isInputDisabled = isReadOnly || isZkBlocked;
    // ----------------------

    const loadData = useCallback(async () => {
        debugFlicker('loadData:start');
        setLoading(true);
        try {
            // 1. Fetch Full Document Details
            const docRes = await api.get(`/documents/${documentId}`);
            if (docRes.data) {
                setDocument(docRes.data);
            }

            // 2. Fetch Items
            const response = await api.get(`/documents/${documentId}/items`);
            setItems(response.data);

            // Initialize serials map
            const initialMap = {};
            response.data.forEach(item => {
                const saved = item.savedSerials || [];
                const slotCount = Math.max(item.Ilosc, saved.length);
                const slots = new Array(slotCount).fill('');

                saved.forEach((sn, idx) => {
                    if (idx < slots.length) slots[idx] = sn;
                });

                initialMap[item.AsortymentId] = slots;
            });
            setSerialsMap(initialMap);
            // Snapshot the baseline for dirty-checking
            setInitialSerialsMap(JSON.parse(JSON.stringify(initialMap)));
        } catch (error) {
            console.error('Error fetching data:', error);
            if (showNotification) showNotification('Błąd pobierania danych', 'error');
        } finally {
            setLoading(false);
            debugFlicker('loadData:end');
        }
    }, [documentId, showNotification, debugFlicker]);

    // --- DIRTY CHECK HELPERS ---

    /**
     * Returns true when the current serialsMap differs from the
     * baseline snapshot that was taken right after the last load/save.
     */
    const hasUnsavedChanges = useCallback(() => {
        const currentKeys = Object.keys(serialsMap);
        const initialKeys = Object.keys(initialSerialsMap);
        if (currentKeys.length !== initialKeys.length) return true;
        for (const key of currentKeys) {
            const cur = serialsMap[key] || [];
            const init = initialSerialsMap[key] || [];
            if (cur.length !== init.length) return true;
            for (let i = 0; i < cur.length; i++) {
                if ((cur[i] || '') !== (init[i] || '')) return true;
            }
        }
        return false;
    }, [serialsMap, initialSerialsMap]);

    /**
     * Gate-keeper for all back/navigate-away actions.
     * If the form is dirty (and editable), shows the confirmation dialog.
     * Otherwise executes the action immediately.
     */
    const handleBackRequest = useCallback((action) => {
        if (isReadOnly || !hasUnsavedChanges()) {
            action();
        } else {
            pendingBackAction.current = action;
            setShowUnsavedDialog(true);
        }
    }, [isReadOnly, hasUnsavedChanges]);

    /** Called by App.jsx via ref when the logo is clicked */
    useImperativeHandle(ref, () => ({
        requestBack: () => handleBackRequest(onBack)
    }), [handleBackRequest, onBack]);

    // Block browser tab-close / refresh when dirty
    useEffect(() => {
        const handleBeforeUnload = (e) => {
            if (!isReadOnly && hasUnsavedChanges()) {
                e.preventDefault();
                e.returnValue = ''; // Required for Chrome
            }
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [isReadOnly, hasUnsavedChanges]);

    useEffect(() => {
        if (initialDocument) {
            loadData();
        }
    }, [documentId, loadData, initialDocument]);

    // Debounce utility function
    const debounce = (func, wait) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), wait);
        };
    };

    // Client-side helpers mirroring backend normalization logic
    const normalizeSerialClient = (value) => {
        if (value == null) return '';
        return String(value).replace(/\s+/g, '');
    };

    const isPlaceholderClient = (value) => {
        const normalized = normalizeSerialClient(value);
        return normalized.toLowerCase() === 'brak';
    };

    // Check for duplicates (local and database)
    const checkDuplicate = async (itemId, index, value) => {
        const key = `${itemId}-${index}`;

        if (!value || value.trim() === '') {
            // Clear duplicate status for empty fields
            setDuplicates(prev => {
                const updated = { ...prev };
                delete updated[key];
                return updated;
            });
            return;
        }

        const normalizedValue = normalizeSerialClient(value);

        // Allow placeholder "brak" (after normalization) without duplicate errors
        if (!normalizedValue || isPlaceholderClient(normalizedValue)) {
            setDuplicates(prev => {
                const updated = { ...prev };
                delete updated[key];
                return updated;
            });
            return;
        }

        // Check local duplicates (within the form)
        const allSerials = Object.entries(serialsMap).flatMap(([iId, serials]) =>
            serials.map((sn, idx) => ({ sn, iId, idx }))
        );

        const duplicatesFound = allSerials.filter(({ sn, iId, idx }) => {
            const localNorm = normalizeSerialClient(sn);
            return localNorm && localNorm === normalizedValue && !(iId === itemId.toString() && idx === index);
        });
        const hasLocalDuplicate = duplicatesFound.length > 0;

        // Check database duplicates
        let hasDbDuplicate = false;
        let dbDetails = '';

        try {
            const response = await api.get(
                `/serials/check-duplicate?sn=${encodeURIComponent(normalizedValue)}&excludeDocId=${document.Id}&excludeItemId=${itemId}&symbol=${document.Symbol}`
            );

            if (response.data.isDuplicate) {
                hasDbDuplicate = true;
                dbDetails = response.data.existingDocument;
            }
        } catch (error) {
            console.error('Error checking duplicate:', error);
        }

        // Update duplicate state
        if (hasLocalDuplicate || hasDbDuplicate) {
            setDuplicates(prev => ({
                ...prev,
                [key]: {
                    isLocal: hasLocalDuplicate,
                    isDb: hasDbDuplicate,
                    details: dbDetails
                }
            }));
        } else {
            setDuplicates(prev => {
                const updated = { ...prev };
                delete updated[key];
                return updated;
            });
        }
    };

    // Debounced version of checkDuplicate
    const debouncedCheckDuplicate = React.useMemo(
        () => debounce(checkDuplicate, 500),
        [serialsMap, document.Id]
    );

    const handleSerialChange = (itemId, index, value) => {
        setSerialsMap(prev => ({
            ...prev,
            [itemId]: prev[itemId].map((sn, idx) => idx === index ? value : sn)
        }));

        // Trigger duplicate check with debounce
        debouncedCheckDuplicate(itemId, index, value);
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const payload = {
                documentId: document.Id,
                items: Object.entries(serialsMap).map(([itemId, serials]) => ({
                    itemId: parseInt(itemId),
                    serials: serials.filter(s => s.trim() !== '') // Send only non-empty
                }))
            };

            await api.post('/serials', payload);

            // After a successful save, advance the baseline snapshot so the
            // dirty-check no longer fires until the user edits again.
            setInitialSerialsMap(JSON.parse(JSON.stringify(serialsMap)));

            // Show Success Notification
            if (showNotification) {
                showNotification('Zapisano pomyślnie!', 'success');
            }

            // Show temporary saved indicator
            const indicator = window.document.getElementById('save-indicator');
            if (indicator) {
                indicator.classList.remove('hidden');
                setTimeout(() => indicator.classList.add('hidden'), 2200);
            }

            // REMOVED: onBack() call to keep user on the same page
        } catch (error) {
            console.error('Error saving:', error);
            if (error.response && error.response.status === 409) {
                // Duplicates found
                const duplicates = error.response.data.duplicates.join(', ');
                if (showNotification) {
                    showNotification(`Duplikaty: ${duplicates}`, 'error');
                } else {
                    alert(`BŁĄD: Następujące numery seryjne już istnieją w systemie:\n${duplicates}`);
                }
            } else {
                if (showNotification) {
                    showNotification('Błąd podczas zapisu. Sprawdź konsolę.', 'error');
                } else {
                    alert('Błąd podczas zapisu. Sprawdź konsolę.');
                }
            }
        } finally {
            setSaving(false);
        }
    };

    // Reliable Enter navigation using state-based IDs
    const handleKeyDown = (e, currentItem, currentIndex) => {
        if (e.key === 'Enter') {
            e.preventDefault();

            // Trigger immediate duplicate check before moving
            const value = e.target.value;
            if (value && value.trim()) {
                checkDuplicate(currentItem.AsortymentId, currentIndex, value);
            }

            // 1. Try next slot in the same item
            const nextIndex = currentIndex + 1;
            if (nextIndex < currentItem.Ilosc) {
                const nextId = `serial-${currentItem.AsortymentId}-${nextIndex}`;
                // Use window.document because 'document' prop shadows global document
                const el = window.document.getElementById(nextId);
                if (el) el.focus();
                return;
            }

            // 2. If no more slots in this item, jump to next REQUIRED item
            const requiredItems = items.filter(i => i.requiresSerial);
            const currentItemIndex = requiredItems.findIndex(i => i.AsortymentId === currentItem.AsortymentId);

            if (currentItemIndex > -1 && currentItemIndex < requiredItems.length - 1) {
                const nextItem = requiredItems[currentItemIndex + 1];
                const nextId = `serial-${nextItem.AsortymentId}-0`;
                const el = window.document.getElementById(nextId);
                if (el) el.focus();
            } else {
                e.target.blur();
            }
        }
    };

    // Handle blur event to trigger duplicate check
    const handleBlur = (itemId, index, value) => {
        if (value && value.trim()) {
            checkDuplicate(itemId, index, value);
        }
    };

    // Calculate progress (only for required items)
    const requiredItems = items.filter(i => i.requiresSerial);
    const totalSlots = requiredItems.reduce((acc, item) => acc + item.Ilosc, 0);

    // Count filled slots only for required items
    const filledSlots = requiredItems.reduce((acc, item) => {
        const serials = serialsMap[item.AsortymentId] || [];
        const filledRequest = serials.filter(s => s && s.trim().length > 0).length;
        return acc + filledRequest;
    }, 0);

    const progress = totalSlots > 0 ? (filledSlots / totalSlots) * 100 : 100;

    // Filter Logic
    const filteredItems = items.filter(item => {
        // 1. Hide Non-Serial
        if (hideNonSerial && !item.requiresSerial) return false;

        // 2. Search Term
        if (searchTerm.trim()) {
            const term = searchTerm.toLowerCase();
            const matchName = item.Nazwa?.toLowerCase().includes(term);
            const matchSymbol = item.Symbol?.toLowerCase().includes(term);
            if (!matchName && !matchSymbol) return false;
        }

        return true;
    });

    // Handle Enter key in search input
    const handleSearchKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const firstRequired = filteredItems.find(item => item.requiresSerial);
            if (firstRequired) {
                const targetId = `serial-${firstRequired.AsortymentId}-0`;
                // Use window.document to be safe, though document is not shadowed here
                const el = window.document.getElementById(targetId);
                if (el) {
                    el.focus();
                }
            }
        }
    };

    // Scanner Handlers
    const openSingleScanner = (itemId, index) => {
        setScannerMode('single');
        setScanTarget({ itemId, index });
        setIsScannerOpen(true);
    };

    const openMultiScanner = (itemId) => {
        setScannerMode('multi');
        setScanTarget({ itemId });
        setIsScannerOpen(true);
    };

    const handleScanResult = (code) => {
        if (!code) return;

        if (scannerMode === 'single') {
            const { itemId, index } = scanTarget;
            handleSerialChange(itemId, index, code);
            // Single mode closes automatically in MobileScanner via onClose, but we can double check
            setIsScannerOpen(false);
        } else if (scannerMode === 'multi') {
            const { itemId } = scanTarget;
            const currentSerials = serialsMap[itemId] || [];

            // Find first empty slot
            const firstEmptyIndex = currentSerials.findIndex(s => !s || s.trim() === '');

            if (firstEmptyIndex !== -1) {
                handleSerialChange(itemId, firstEmptyIndex, code);
                // Multi mode stays open, user scans next
            } else {
                // If full, maybe show notification or just stop? 
                // For now we just stay open but maybe sound alert?
                if (showNotification) showNotification('Wszystkie wymagane pola są już pełne!', 'warning');
            }
        }
    };

    if (loading) return (
        <div className="p-8">
            <div className="space-y-4">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="ui-card p-4 animate-pulse">
                        <div className="h-4 bg-gray-200 rounded w-2/3 mb-3" />
                        <div className="h-3 bg-gray-200 rounded w-1/3" />
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="space-y-6 pb-24 md:pb-0">
            <div className="sticky top-0 bg-[rgba(244,247,252,0.95)] backdrop-blur-sm pt-4 pb-4 z-10 border-b border-gray-200 mb-6">
                <button
                    onClick={() => handleBackRequest(onBack)}
                    className="ui-btn ui-btn-link mb-4"
                >
                    <ArrowLeft size={20} className="mr-1" /> Wróć do listy
                </button>

                {/* LOCK BANNER */}
                {isReadOnly && (
                    <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3 p-4 bg-yellow-50 text-yellow-800 border border-yellow-200 rounded-xl shadow-sm animate-fade-in">
                        <div className="flex items-center gap-3">
                            <Lock className="text-yellow-600" size={24} />
                            <div>
                                <h3 className="font-bold text-yellow-900">Tryb tylko do odczytu</h3>
                                <p className="text-sm">{lockMessage || "Inna osoba aktualnie edytuje ten dokument. Twoje pola są zablokowane i nie możesz zapisać zmian."}</p>
                            </div>
                        </div>
                        {canTakeOver && (
                            <button
                                onClick={handleTakeOver}
                                className="ui-btn bg-yellow-500 text-white font-bold hover:bg-yellow-600 active:bg-yellow-700 md:animate-pulse"
                            >
                                Dokument zwolniony - Przejmij edycję
                            </button>
                        )}
                    </div>
                )}

                <div className="flex justify-between items-end">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">{document.NumerWewnetrzny_PelnaSygnatura}</h2>
                        {document.KlientNazwa && (
                            <p className="text-sm text-indigo-700 font-semibold">
                                {document.KlientNazwa} <span className="text-gray-500 font-normal ml-1">{document.KlientNIP}</span>
                            </p>
                        )}
                        {document.DokumentPowiazany && document.Symbol !== 'ZK' && (
                            <p className="text-xs text-gray-500 font-mono mt-0.5">
                                Powiązany: {document.DokumentPowiazany}
                            </p>
                        )}
                        {document.ZrodlowePA && (
                            <p className="text-xs text-gray-600 font-mono mt-0.5">
                                Powiązany Paragon: <span className="font-bold">{document.ZrodlowePA}</span>
                            </p>
                        )}
                        {document.ZrodloweZK && (
                            <p className="text-xs text-indigo-600 font-bold font-mono mt-0.5">
                                Realizuje: {document.ZrodloweZK}
                            </p>
                        )}
                        <p className="text-sm text-gray-500 mt-1">
                            Data dokumentu: <span className="font-medium text-gray-700">{new Date(document.DataWprowadzenia).toLocaleDateString()}</span>
                        </p>

                        {/* ZK Zrealizowane Blocker */}
                        {document.Symbol === 'ZK' && document.IsComplete && !!document.RealizedByWzId && !zkUnlocked && (
                            <div className="mt-2 inline-flex items-center gap-2 px-3 py-2 bg-orange-100 text-orange-800 rounded-lg text-sm font-bold border border-orange-200">
                                <AlertCircle size={16} />
                                Ten dokument został zrealizowany. Skany wykonuj na WZ!
                                {document.RealizedByWzId && onNavigateToDocument && (
                                    <button
                                        onClick={() => handleBackRequest(() => onNavigateToDocument({ Id: document.RealizedByWzId, Symbol: 'WZ', NumerWewnetrzny_PelnaSygnatura: document.RealizedByWzSymbol }))}
                                        className="ml-2 px-3 py-1 bg-indigo-600 text-white rounded text-xs hover:bg-indigo-700 transition-colors shadow-sm"
                                    >
                                        Przejdź do WZ ( {document.RealizedByWzSymbol} )
                                    </button>
                                )}
                                <button
                                    onClick={() => setZkUnlocked(true)}
                                    className="ml-3 px-2 py-1 bg-white text-orange-600 border border-orange-300 rounded text-xs hover:bg-orange-50 transition-colors"
                                >
                                    Odblokuj awaryjnie
                                </button>
                            </div>
                        )}

                        {/* Excess Indicator */}
                        {items.some(item => {
                            const serials = serialsMap[item.AsortymentId] || [];
                            const validSerialsCount = serials.filter(s => s && s.trim().length > 0).length;
                            return validSerialsCount > item.Ilosc;
                        }) && (
                                <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-sm font-bold border border-purple-200">
                                    <AlertCircle size={16} />
                                    NADMIAR! (Wpisano więcej numerów niż wymagano)
                                </div>
                            )}
                        <p className="text-sm text-gray-500 mt-1">Wprowadzanie numerów seryjnych</p>
                    </div>
                    <div className="hidden md:flex gap-2">
                        <button
                            onClick={loadData}
                            className="ui-icon-btn"
                            title="Odśwież dane z serwera"
                        >
                            <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
                        </button>

                        {(document.Symbol === 'WZ' || document.Symbol === 'PA') && document.IsComplete && (
                            <button
                                onClick={() => openWarrantyPreview(document)}
                                className="ui-btn ui-btn-soft px-6 py-2.5 active:scale-95"
                            >
                                <FileText size={18} />
                                Pobierz Gwarancję
                            </button>
                        )}

                        {totalSlots > 0 && !isZkBlocked && (
                            <>
                                <button
                                    onClick={handleSave}
                                    disabled={isSaveDisabled}
                                    className={`ui-btn px-6 py-2.5 shadow-md transition-all active:scale-95 ${isReadOnly
                                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-70'
                                        : 'ui-btn-primary'
                                        }`}
                                >
                                    {saving ? <RefreshCw className="animate-spin" size={18} /> : (isReadOnly ? <Lock size={18} /> : <Save size={18} />)}
                                    {isReadOnly ? 'Tylko odczyt' : 'Zapisz zmiany'}
                                </button>
                                {/* Saved indicator placeholder */}
                                <div id="save-indicator" className="ml-2 text-sm text-green-600 hidden items-center gap-2" aria-hidden="true">
                                    <CheckCircle size={16} /> Zapisano
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Progress bar (only if there are required items) */}
                {totalSlots > 0 ? (
                    <>
                        <div className="mt-4 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-green-500 transition-all duration-500 ease-out"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <div className="text-xs text-right mt-1 text-gray-500">
                            Wypełniono {filledSlots} z {totalSlots} wymaganych numerów
                        </div>
                    </>
                ) : (
                    <div className="mt-4 p-3 bg-green-50 text-green-700 rounded-lg text-sm flex items-center gap-2 border border-green-200">
                        <CheckCircle size={18} />
                        Ten dokument nie zawiera towarów wymagających numerów seryjnych.
                    </div>
                )}

                {/* Search & Filter Controls */}
                <div className="mt-4 flex flex-col md:flex-row gap-3">
                    <div className="relative flex-1">
                        <input
                            type="text"
                            placeholder="Szukaj towaru (nazwa, symbol)..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={handleSearchKeyDown}
                            className="ui-input w-full pl-9 pr-4 text-sm"
                        />
                        <div className="absolute left-3 top-2.5 text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                        </div>
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm('')}
                                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                            >
                                <X size={16} />
                            </button>
                        )}
                    </div>
                    <label className="ui-card-muted flex items-center gap-2 text-sm text-gray-700 cursor-pointer px-3 py-2 select-none">
                        <input
                            type="checkbox"
                            checked={hideNonSerial}
                            onChange={(e) => setHideNonSerial(e.target.checked)}
                            className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500 border-gray-300"
                        />
                        Ukryj towary bez SN
                    </label>
                </div>
            </div>

            <div className="grid gap-6">
                {filteredItems.length === 0 ? (
                    <div className="text-center py-10 text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                        {searchTerm || hideNonSerial ? 'Brak towarów spełniających kryteria wyszukiwania.' : 'Brak pozycji w dokumencie.'}
                    </div>
                ) : (
                    filteredItems.map(item => (
                        <div key={item.LP} className={`p-6 rounded-xl border ${item.requiresSerial ? 'ui-card' : 'ui-card-muted opacity-75'}`}>
                            <div className="flex items-center gap-3 mb-4 border-b border-gray-200 pb-3">
                                <Box className={item.requiresSerial ? "text-indigo-500" : "text-gray-400"} size={20} />
                                <div>
                                    <h3 className="font-semibold text-gray-800">{item.Nazwa}</h3>
                                    <p className="text-xs text-gray-500 font-mono">{item.Symbol}</p>

                                    {/* Warranty Display (Only for WZ and PA) */}
                                    {(document.Symbol === 'WZ' || document.Symbol === 'PA') && item.I0 && (
                                        <p className="text-xs text-green-600 font-bold mt-1">
                                            {(() => {
                                                const code = parseInt(item.I0);
                                                const docDate = new Date(document.DataWprowadzenia);

                                                // Helper to add months safely
                                                const addMonths = (date, months) => {
                                                    const d = new Date(date);
                                                    d.setMonth(d.getMonth() + months);
                                                    return d;
                                                };

                                                let expiryDate = null;
                                                let label = '';

                                                switch (code) {
                                                    case 100007: expiryDate = addMonths(docDate, 3); break;
                                                    case 100000: expiryDate = addMonths(docDate, 12); break;
                                                    case 100001: expiryDate = addMonths(docDate, 24); break;
                                                    case 100002: expiryDate = addMonths(docDate, 36); break;
                                                    case 100003: expiryDate = addMonths(docDate, 60); break;
                                                    case 100005: label = 'Gwarancja: Dożywotnia'; break;
                                                    case 100004: label = 'Gwarancja Producenta'; break;
                                                    default: return null;
                                                }

                                                if (expiryDate) {
                                                    return `Gwarancja do: ${expiryDate.toLocaleDateString()}`;
                                                }
                                                return label;
                                            })()}
                                        </p>
                                    )}
                                </div>
                                <div className="ml-auto px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                                    Ilość: {item.Ilosc}
                                </div>
                                {item.requiresSerial && !isZkBlocked && (
                                    <button
                                        onClick={() => openMultiScanner(item.AsortymentId)}
                                        className="ml-2 p-1.5 text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg flex items-center gap-1 text-xs font-bold transition-colors md:hidden"
                                        title="Skanuj seryjnie (wypełnia puste pola po kolei)"
                                    >
                                        <ScanLine size={16} />
                                        Skanuj serię
                                    </button>
                                )}
                            </div>

                            {item.requiresSerial ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                    {serialsMap[item.AsortymentId]?.map((sn, index) => {
                                        const isExcess = index >= item.Ilosc; // If index is beyond required count
                                        const duplicateKey = `${item.AsortymentId}-${index}`;
                                        const dupInfo = duplicates[duplicateKey];
                                        const hasDuplicate = dupInfo?.isLocal || dupInfo?.isDb;

                                        return (
                                            <div key={index} className="relative pb-5">
                                                <input
                                                    id={`serial-${item.AsortymentId}-${index}`}
                                                    type="text"
                                                    disabled={isInputDisabled}
                                                    value={sn}
                                                    onChange={(e) => handleSerialChange(item.AsortymentId, index, e.target.value)}
                                                    onKeyDown={(e) => handleKeyDown(e, item, index)}
                                                    onBlur={(e) => handleBlur(item.AsortymentId, index, e.target.value)}
                                                    placeholder={isExcess ? "Nadmiarowy - usuń!" : `SN #${index + 1}`}
                                                    className={`serial-input ui-input w-full outline-none transition-all 
                                                 ${isInputDisabled
                                                            ? 'bg-gray-100 text-gray-500 border-gray-200 cursor-not-allowed'
                                                            : sn && sn.toLowerCase() === 'brak'
                                                                ? 'border-amber-500 bg-amber-50 text-amber-800 font-medium'
                                                                : hasDuplicate && !isExcess
                                                                    ? 'border-red-500 bg-red-50 ring-2 ring-red-200'
                                                                    : isExcess
                                                                        ? 'border-red-300 bg-red-50 text-red-700'
                                                                        : 'border-gray-200 ' + (sn ? 'border-indigo-300 bg-indigo-50/30' : '')
                                                        }`}
                                                />
                                                {sn && !isExcess && !hasDuplicate && (
                                                    <CheckCircle className="absolute right-3 top-3 text-green-500 pointer-events-none" size={16} />
                                                )}
                                                {hasDuplicate && !isExcess && (
                                                    <AlertCircle className="absolute right-3 top-3 text-red-500 pointer-events-none" size={16} />
                                                )}
                                                {isExcess && !isReadOnly && (
                                                    <button
                                                        onClick={() => handleSerialChange(item.AsortymentId, index, '')}
                                                        className="absolute right-2 top-2.5 text-red-500 hover:bg-red-100 p-1 rounded"
                                                        title="Wyczyść numer (Nadmiar)"
                                                    >
                                                        <X size={16} />
                                                    </button>
                                                )}
                                                {hasDuplicate && !isExcess && (
                                                    <div className="absolute -bottom-0 left-0 text-[10px] text-red-600 font-medium">
                                                        {dupInfo.isLocal && <span>⚠️ Duplikat lokalny</span>}
                                                        {dupInfo.isLocal && dupInfo.isDb && <span> • </span>}
                                                        {dupInfo.isDb && <span>⚠️ W bazie: {dupInfo.details}</span>}
                                                    </div>
                                                )}
                                                {isExcess && (
                                                    <span className="text-[10px] text-red-500 font-bold uppercase absolute -bottom-0 left-1">
                                                        Nadmiarowy
                                                    </span>
                                                )}

                                                {/* Camera Button */}
                                                {!isInputDisabled && (
                                                    <button
                                                        onClick={() => openSingleScanner(item.AsortymentId, index)}
                                                        className="absolute right-2 top-2 p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors md:hidden"
                                                        tabIndex={-1}
                                                        disabled={isExcess}
                                                        title="Skanuj kamerą"
                                                    >
                                                        <Camera size={18} />
                                                    </button>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="flex items-center gap-2 text-gray-400 text-sm italic py-2">
                                    <AlertCircle size={16} />
                                    Produkt nie wymaga numerów seryjnych.
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>

            {/* Mobile Sticky Actions */}
            <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-gray-200 bg-white/95 backdrop-blur md:hidden">
                <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-2">
                    <button
                        onClick={loadData}
                        className="ui-icon-btn shrink-0"
                        title="Odśwież dane z serwera"
                    >
                        <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
                    </button>

                    {(document.Symbol === 'WZ' || document.Symbol === 'PA') && document.IsComplete && (
                        <button
                            onClick={() => openWarrantyPreview(document)}
                            className="ui-btn ui-btn-soft shrink-0"
                            title="Pobierz Gwarancję"
                        >
                            <FileText size={16} />
                        </button>
                    )}

                    {totalSlots > 0 && !isZkBlocked && (
                        <button
                            onClick={handleSave}
                            disabled={isSaveDisabled}
                            className={`ui-btn flex-1 ${isReadOnly
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-70'
                                : 'ui-btn-primary'
                                }`}
                        >
                            {saving ? <RefreshCw className="animate-spin" size={18} /> : (isReadOnly ? <Lock size={18} /> : <Save size={18} />)}
                            {isReadOnly ? 'Tylko odczyt' : 'Zapisz'}
                        </button>
                    )}
                </div>
            </div>

            {/* Mobile Scanner Overlay */}
            {
                isScannerOpen && (
                    <MobileScanner
                        onScan={handleScanResult}
                        onClose={() => setIsScannerOpen(false)}
                        multiMode={scannerMode === 'multi'}
                        title={scannerMode === 'multi' ? "Skanowanie Seryjne" : "Skanuj Numer Seryjny"}
                        scannedCount={scannerMode === 'multi' ? (serialsMap[scanTarget.itemId]?.filter(s => s).length || 0) : 0}
                    />
                )
            }

            {/* Unsaved Changes Confirmation Dialog */}
            {showUnsavedDialog && (
                <UnsavedChangesDialog
                    onStay={() => {
                        setShowUnsavedDialog(false);
                        pendingBackAction.current = null;
                    }}
                    onLeave={() => {
                        setShowUnsavedDialog(false);
                        const action = pendingBackAction.current;
                        pendingBackAction.current = null;
                        if (action) action();
                    }}
                />
            )}
        </div >
    );
});

export default SerialEntry;
