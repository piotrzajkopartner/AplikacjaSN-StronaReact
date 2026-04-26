import React, { useEffect, useState } from 'react';
import { FileText, Clock, RefreshCw, ChevronRight, AlertCircle, Search, X, Loader, Camera } from 'lucide-react';
import MobileScanner from './MobileScanner';
import useSWR, { mutate } from 'swr';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import api, { endpoints } from '../api';

// Fetcher for SWR using existing api instance
const fetcher = (url) => api.get(url).then(res => res.data);


const DocumentList = ({ onSelectDocument, listState, onUpdateListState }) => {
    const SEARCH_RESULTS_TTL_MS = 2 * 60 * 1000;
    const {
        page,
        tab,
        docType,
        searchQuery,
        searchResults
    } = listState;

    const [searching, setSearching] = useState(false);
    const [searchPage, setSearchPage] = useState(1);
    const [searchMeta, setSearchMeta] = useState(null);
    const [searchExpiresAt, setSearchExpiresAt] = useState(null);
    const [showSearchScanner, setShowSearchScanner] = useState(false);
    const [listRef] = useAutoAnimate(); // Smooth list animations

    const QUICK_LIMIT = 15; // Szybkie odświeżenie przy zmianie zakładki
    const FULL_LIMIT = 50;  // Pełna lista przy ręcznym odświeżeniu

    const [fetchLimit, setFetchLimit] = useState(QUICK_LIMIT);

    const updateState = (updates) => {
        onUpdateListState(updates);
    };

    // --- SWR IMPLEMENTATION ---
    const queryKey = `/documents?page=${page}&limit=${fetchLimit}&status=${tab}&docType=${docType}`;

    const { data: swrData, error, isValidating } = useSWR(queryKey, fetcher, {
        revalidateOnFocus: true,
        revalidateIfStale: true,
        keepPreviousData: true,
        dedupingInterval: 60 * 1000, // 60 sekund - nie odpytuje ponownie przez 1 minutę
        refreshInterval: 60 * 60 * 1000, // Auto-odświeżenie co 1 godzinę
        onSuccess: (data) => {
            // Update parent state for sync if needed, though SWR is source of truth now
            updateState({
                documents: data.data,
                totalPages: data.totalPages,
                page: data.page,
                lastUpdated: new Date()
            });
        }
    });

    // Derived state from SWR
    const documents = swrData?.data || listState.documents || [];
    const totalPages = swrData?.totalPages || listState.totalPages || 1;
    const loading = !swrData && !error && isValidating;

    const errorMsg = error ? (error.response?.data?.error || error.message) : null;
    const errorDetails = error ? (error.response?.data?.details || error.response?.data?.stack) : null;


    const forceRevalidate = () => {
        mutate(queryKey, undefined, { revalidate: true });
    };

    const handleTabChange = (newTab) => {
        if (newTab !== tab) {
            setFetchLimit(QUICK_LIMIT); // Reset do szybkiego trybu przy zmianie zakładki
            updateState({ tab: newTab, page: 1 });
            forceRevalidate();
        }
    };

    const handleDocTypeChange = (newType) => {
        if (newType !== docType) {
            setFetchLimit(QUICK_LIMIT); // Reset do szybkiego trybu przy zmianie typu
            updateState({ docType: newType, page: 1 });
            forceRevalidate();
        }
    };

    const handlePageChange = (newPage) => {
        if (newPage !== page) {
            updateState({ page: newPage });
        }
    };

    // Manual Refresh: pełna lista 50 dokumentów
    const handleRefresh = () => {
        setFetchLimit(FULL_LIMIT); // Przełącz na pełny tryb
        // SWR automatycznie pobierze dane dla nowego queryKey (limit=50)
        forceRevalidate();
    };




    const handleSearch = async (e, pageNum = 1) => {
        if (e && e.preventDefault) e.preventDefault();

        if (!searchQuery || !searchQuery.trim()) return;

        setSearching(true);
        setSearchPage(pageNum);

        try {
            const scopeParam = listState.searchScope || 'all';
            const encodedQuery = encodeURIComponent(searchQuery);
            const response = await api.get(`/serials/search?q=${encodedQuery}&scope=${scopeParam}&page=${pageNum}`);

            updateState({ searchResults: response.data.data });
            setSearchMeta(response.data.meta);
            setSearchExpiresAt(Date.now() + SEARCH_RESULTS_TTL_MS);
        } catch (error) {
            console.error(error);
            // Handled locally for search
        } finally {
            setSearching(false);
        }
    };

    const handleSearchChange = (val) => {
        updateState({ searchQuery: val });
    };

    const handleScopeChange = (val) => {
        updateState({ searchScope: val });
    };

    const clearSearch = () => {
        updateState({ searchQuery: '', searchResults: null });
        setSearchMeta(null);
        setSearchPage(1);
        setSearchExpiresAt(null);
    };

    const clearSearchResultsOnly = () => {
        updateState({ searchResults: null });
        setSearchMeta(null);
        setSearchPage(1);
        setSearchExpiresAt(null);
    };

    const openDocumentFromList = (doc) => {
        clearSearchResultsOnly();
        onSelectDocument(doc);
    };

    // Filter Logic
    const filteredDocuments = documents || [];

    const getAccentClass = (doc) => {
        if (doc.IsExcess) return 'bg-purple-500';
        if (doc.Symbol === 'ZK' && doc.IsComplete && doc.RealizedByWzId) return 'bg-gray-400';
        if (doc.IsComplete) return 'bg-green-500';
        if (doc.SavedItems === 0) return 'bg-red-500';
        return 'bg-orange-500';
    };

    const handleSearchScan = async (code) => {
        // Wpisz zeskanowany kod w wyszukiwarce
        updateState({ searchQuery: code });
        setShowSearchScanner(false);
        // Wyszukaj bezpośrednio z kodem — nie czekaj na re-render stanu
        setSearching(true);
        setSearchPage(1);
        try {
            const scopeParam = listState.searchScope || 'all';
            const response = await api.get(`/serials/search?q=${encodeURIComponent(code)}&scope=${scopeParam}&page=1`);
            updateState({ searchResults: response.data.data });
            setSearchMeta(response.data.meta);
            setSearchExpiresAt(Date.now() + SEARCH_RESULTS_TTL_MS);
        } catch (err) {
            console.error(err);
        } finally {
            setSearching(false);
        }
    };

    useEffect(() => {
        if (!searchResults) {
            setSearchExpiresAt(null);
            return undefined;
        }

        if (!searchExpiresAt) {
            setSearchExpiresAt(Date.now() + SEARCH_RESULTS_TTL_MS);
            return undefined;
        }

        const timeoutMs = Math.max(500, searchExpiresAt - Date.now());
        const timeoutId = setTimeout(() => {
            clearSearchResultsOnly();
        }, timeoutMs);

        return () => clearTimeout(timeoutId);
    }, [searchResults, searchExpiresAt]);

    return (
        <>
            {showSearchScanner && (
                <MobileScanner
                    title="Skanuj kod do wyszukiwarki"
                    onScan={handleSearchScan}
                    onClose={() => setShowSearchScanner(false)}
                    multiMode={false}
                />
            )}
            <div className="space-y-6">
                {errorMsg && (
                    <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex flex-col gap-2 ui-fade-in">
                        <div className="flex items-center gap-2">
                            <AlertCircle size={20} />
                            <span className="font-bold">{errorMsg}</span>
                            <button onClick={handleRefresh} className="ml-auto underline hover:text-red-800">Spróbuj ponownie</button>
                        </div>
                        {errorDetails && (
                            <pre className="text-xs bg-red-100 p-2 rounded overflow-auto max-h-40 whitespace-pre-wrap">
                                {errorDetails}
                            </pre>
                        )}
                    </div>
                )}

                {/* Search Bar */}
                <div className="ui-card p-4">
                    <form onSubmit={(e) => handleSearch(e, 1)} className="flex flex-col sm:flex-row gap-2">
                        <div className="relative flex-1 flex flex-col sm:flex-row gap-2">
                            {/* Scope Selector */}
                            <select
                                value={listState.searchScope || 'all'}
                                onChange={(e) => handleScopeChange(e.target.value)}
                                className="ui-select text-sm cursor-pointer w-full sm:w-auto"
                            >
                                <option value="all">Wszystko</option>
                                <option value="sn">Numer SN</option>
                                <option disabled>---</option>
                                <option value="PZ">Dokument PZ</option>
                                <option value="ZK">Dokument ZK</option>
                                <option value="WZ">Dokument WZ</option>
                                <option value="PA">Dokument PA</option>
                            </select>

                            <div className="relative flex-1 w-full sm:w-auto">
                                <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    placeholder={
                                        (listState.searchScope === 'sn') ? "Szukaj numeru seryjnego..." :
                                            (listState.searchScope === 'all') ? "Szukaj dokumentu lub SN..." :
                                                "Szukaj dokumentu..."
                                    }
                                    className="ui-input w-full pl-10 pr-10"
                                    value={searchQuery || ''}
                                    onChange={(e) => handleSearchChange(e.target.value)}
                                />
                                {searchQuery ? (
                                    <button type="button" onClick={clearSearch} className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600">
                                        <X size={20} />
                                    </button>
                                ) : (
                                    /* Przycisk skanera - widoczny tylko na mobile */
                                    <button
                                        type="button"
                                        onClick={() => setShowSearchScanner(true)}
                                        className="absolute right-3 top-2.5 text-gray-400 hover:text-indigo-600 transition-colors block sm:hidden"
                                        title="Skanuj kod"
                                    >
                                        <Camera size={20} />
                                    </button>
                                )}
                            </div>
                        </div>
                        <button type="submit" disabled={searching} className="ui-btn ui-btn-primary w-full sm:w-auto">
                            {searching ? <Loader className="animate-spin" size={20} /> : 'Szukaj'}
                        </button>
                    </form>

                    {searchResults && (
                        <div className="mt-4 border-t pt-4">
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="text-sm font-semibold text-gray-500">
                                    Wyniki wyszukiwania ({searchMeta ? (searchMeta.totalDocs + searchMeta.totalSerials) : searchResults.length}):
                                </h3>
                                    <button
                                        onClick={clearSearch}
                                        className="ui-btn text-xs text-gray-500 hover:text-red-500"
                                        title="Zamknij wyniki wyszukiwania"
                                    >
                                    <X size={16} />
                                    Zamknij wyniki
                                </button>
                            </div>
                            <p className="text-[11px] text-gray-400 mb-3">
                                Wyniki tymczasowe - znikną automatycznie po 2 minutach lub po wejściu w dokument.
                            </p>

                            {searchResults.length === 0 ? (
                                <p className="text-gray-400 italic">Nie znaleziono numeru.</p>
                            ) : (
                                <div className="space-y-2">
                                    {searchResults.map((res, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:border-indigo-300 transition-colors shadow-sm">
                                            <div className="flex items-center gap-3">
                                                <div className={`p-2 rounded ${res.type === 'document' ? 'bg-indigo-100 text-indigo-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                                    {res.type === 'document' ? <FileText size={16} /> : <Search size={16} />}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-800 flex items-center gap-2">
                                                        {res.title}
                                                        <span className={`text-[10px] px-2 py-0.5 rounded-full border ${res.type === 'document' ? 'bg-indigo-50 text-indigo-700 border-indigo-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
                                                            {res.type === 'document' ? 'DOKUMENT' : 'NUMER SN'}
                                                        </span>
                                                    </p>
                                                    <p className="text-xs text-gray-600">
                                                        {res.subtitle}
                                                    </p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={async () => {
                                                    const targetDocId = res.type === 'document' ? res.id : res.actionDocumentId;

                                                    // Zawsze pobierz świeże dane — nie używaj stale'owego cache listy
                                                    try {
                                                        const response = await endpoints.getDocument(targetDocId);
                                                        clearSearchResultsOnly();
                                                        onSelectDocument(response.data);
                                                    } catch (err) {
                                                        alert('Nie udało się pobrać szczegółów dokumentu. ' + err.message);
                                                    }
                                                }}
                                                className="ui-btn ui-btn-soft text-xs"
                                            >
                                                Idź do dokumentu
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Search Pagination */}
                            {searchMeta && (searchMeta.hasMore || searchPage > 1) && (
                                <div className="flex justify-center items-center gap-4 mt-4 pt-2 border-t border-dashed border-gray-100">
                                    <button
                                        onClick={() => handleSearch(null, Math.max(1, searchPage - 1))}
                                        disabled={searchPage === 1 || searching}
                                        className="ui-btn ui-btn-soft text-xs"
                                    >
                                        Poprzednia
                                    </button>
                                    <span className="text-xs font-medium text-gray-500">
                                        Strona {searchPage}
                                    </span>
                                    <button
                                        onClick={() => handleSearch(null, searchPage + 1)}
                                        // Disable next if we know we don't have more, but searchMeta.hasMore is reliable?
                                        // If hasMore is true, we can go next.
                                        disabled={!searchMeta.hasMore || searching}
                                        className="ui-btn ui-btn-soft text-xs"
                                    >
                                        Następna
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Header / Tabs */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                            Dokumenty {docType}
                            {isValidating && (
                                <Loader className="animate-spin text-indigo-400" size={18} title="Aktualizowanie w tle..." />
                            )}
                        </h2>
                        <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                            <Clock size={16} />
                            Ostatnia aktualizacja: {listState.lastUpdated ? new Date(listState.lastUpdated).toLocaleTimeString() : '...'}
                        </p>
                    </div>

                    {/* Document Type Selector */}
                    <div className="ui-card-muted p-1 flex items-center gap-2">
                        {['PZ', 'ZK', 'WZ'].map(type => (
                            <button
                                key={type}
                                onClick={() => handleDocTypeChange(type)}
                                className={`ui-tab ${docType === type
                                    ? 'ui-tab-active-strong'
                                    : ''
                                    }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>

                    {/* Status Tabs */}
                    <div className="ui-card-muted p-1 flex">
                        <button
                            onClick={() => handleTabChange('pending')}
                            className={`ui-tab ${tab === 'pending'
                                ? 'ui-tab-active'
                                : ''
                                }`}
                        >
                            Do uzupełnienia
                        </button>
                        <button
                            onClick={() => handleTabChange('completed')}
                            className={`ui-tab ${tab === 'completed'
                                ? 'ui-tab-active'
                                : ''
                                }`}
                        >
                            Uzupełnione
                        </button>
                    </div>

                    <div className="hidden sm:block">
                        <button
                            onClick={handleRefresh}
                            className="ui-icon-btn"
                            title="Odśwież teraz"
                        >
                            <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
                        </button>
                    </div>
                </div>

                {/* Document Grid */}
                {loading && (!documents || documents.length === 0) && (
                    <div className="grid grid-cols-1 gap-2">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="ui-card p-2 animate-pulse">
                                <div className="h-3 bg-gray-200 rounded w-3/4 mb-2" />
                                <div className="h-2 bg-gray-200 rounded w-1/2" />
                            </div>
                        ))}
                    </div>
                )}

                <div className="grid grid-cols-1 gap-2 max-w-4xl mx-auto" ref={listRef}>
                    {filteredDocuments.map((doc) => {
                        const percent = doc.TotalItems ? Math.round((doc.SavedItems / doc.TotalItems) * 100) : 0;
                        const gradientId = `grad-${doc.Id}`;
                        let gradColors = ['var(--primary)', '#60a5fa'];
                        if (percent > 80) gradColors = ['#16a34a', '#34d399']; // green
                        else if (percent > 50) gradColors = ['#f59e0b', '#f97316']; // amber
                        else gradColors = ['#ef4444', '#fb7185']; // red

                        // Styles logic (przywrócone po rollbacku Etapu 3)
                        let iconColorClass = 'text-indigo-600';
                        let bgClass = 'bg-white';
                        let iconBgClass = 'bg-indigo-50 group-hover:bg-indigo-100';
                        let borderColorClass = 'border-gray-100 hover:border-indigo-200';

                        if (doc.IsExcess) {
                            iconColorClass = 'text-purple-600';
                            iconBgClass = 'bg-purple-50 group-hover:bg-purple-100';
                            borderColorClass = 'border-purple-200 hover:border-purple-400 ring-1 ring-purple-100';
                            bgClass = 'bg-purple-50/30';
                        } else if (doc.Symbol === 'ZK' && doc.IsComplete && doc.RealizedByWzId) {
                            iconColorClass = 'text-gray-400';
                            iconBgClass = 'bg-gray-100';
                            borderColorClass = 'border-gray-200';
                            bgClass = 'bg-gray-50/50 grayscale-[0.5] opacity-80';
                        } else if (doc.IsComplete) {
                            iconColorClass = 'text-green-600';
                            iconBgClass = 'bg-green-50';
                        } else if (doc.SavedItems === 0) {
                            iconColorClass = 'text-red-500';
                            iconBgClass = 'bg-red-50 group-hover:bg-red-100';
                            borderColorClass = 'border-red-100 hover:border-red-300';
                            bgClass = 'bg-red-50/10';
                        } else {
                            iconColorClass = 'text-orange-500';
                            iconBgClass = 'bg-orange-50 group-hover:bg-orange-100';
                            borderColorClass = 'border-orange-100 hover:border-orange-300';
                            bgClass = 'bg-orange-50/10';
                        }

                        const accentClass = getAccentClass(doc);

                        return (
                            <div
                                key={doc.Id}
                                onClick={() => openDocumentFromList(doc)}
                                className={`${bgClass} p-2 rounded-lg card-shadow border ${borderColorClass} transform transition-fast hover:-translate-y-1 hover:scale-[1.01] cursor-pointer group relative overflow-hidden`}
                                role="button"
                                aria-label={`Dokument ${doc.NumerWewnetrzny_PelnaSygnatura} status ${doc.IsExcess ? 'Nadmiar' : (doc.IsComplete ? 'Gotowe' : 'Do uzupełnienia')}`}
                            >
                                <div className={`absolute left-0 top-0 bottom-0 w-1 ${accentClass}`} />
                                {!!doc.IsExcess && (
                                    <div className="absolute top-0 right-0 bg-purple-600 text-white text-xs px-2 py-0.5 rounded-bl-md font-bold uppercase tracking-wider shadow-sm z-10">
                                        NADMIAR!
                                    </div>
                                )}
                                {!!doc.IsComplete && !doc.IsExcess && doc.Symbol === 'ZK' && doc.RealizedByWzId && (
                                    <div className="absolute top-0 right-0 bg-gray-500 text-white text-xs px-1.5 py-0.5 rounded-bl-md font-bold flex items-center gap-2">
                                        Zrealizowano
                                        {doc.RealizedByWzId && (
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onSelectDocument({ Id: doc.RealizedByWzId, Symbol: 'WZ', NumerWewnetrzny_PelnaSygnatura: doc.RealizedByWzSymbol });
                                                }}
                                                className="bg-white text-gray-700 px-2 py-0.5 rounded text-[10px] hover:bg-gray-100 transition-colors shadow-sm"
                                            >
                                                Przejdź do WZ
                                            </button>
                                        )}
                                    </div>
                                )}
                                {!!doc.IsComplete && !doc.IsExcess && doc.Symbol !== 'ZK' && (
                                    <div className="absolute top-0 right-0 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded-bl-md font-bold uppercase tracking-wider">
                                        Gotowe
                                    </div>
                                )}
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-3 pl-2">
                                        <div className={`p-2 rounded-md transition-colors ${iconBgClass}`}>
                                            {doc.IsExcess ? (
                                                <AlertCircle className={iconColorClass} size={20} />
                                            ) : doc.IsComplete ? (
                                                <FileText className={iconColorClass} size={20} />
                                            ) : doc.SavedItems === 0 ? (
                                                <AlertCircle className={iconColorClass} size={20} />
                                            ) : (
                                                <div className="small-progress" title={`Zapisane: ${percent}%`}>
                                                    <svg viewBox="0 0 36 36">
                                                        <defs>
                                                            <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
                                                                <stop offset="0%" stopColor={gradColors[0]} />
                                                                <stop offset="100%" stopColor={gradColors[1]} />
                                                            </linearGradient>
                                                        </defs>
                                                        <path
                                                            className="progress-bg"
                                                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                                            fill="none" stroke="#e6e6e6" strokeWidth="3.5" />
                                                        <path
                                                            className="progress-bar"
                                                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                                            fill="none" stroke={`url(#${gradientId})`} strokeWidth="3.5"
                                                            strokeDasharray={`${percent},100`} strokeLinecap="round" />
                                                        <text x="18" y="20.35" className="progress-text" textAnchor="middle">{percent}%</text>
                                                    </svg>
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <h3 className={`text-sm font-semibold text-gray-800 group-hover:text-indigo-700 transition-colors leading-tight`}>
                                                {doc.NumerWewnetrzny_PelnaSygnatura}
                                            </h3>
                                            {(doc.ZrodlowePA || doc.ZrodloweZK) && (
                                                <div className="text-[11px] font-medium text-gray-500 mt-0.5 flex flex-col gap-0.5">
                                                    {doc.ZrodlowePA && <span className="text-gray-700">PA: {doc.ZrodlowePA}</span>}
                                                    {doc.ZrodloweZK && <span className="text-indigo-500">ZK: {doc.ZrodloweZK}</span>}
                                                </div>
                                            )}
                                            {doc.KlientNazwa && (
                                                <div className={`text-xs text-indigo-600 font-medium truncate max-w-[420px]`} title={doc.KlientNazwa}>
                                                    {doc.KlientNazwa} <span className="text-gray-400 font-normal">({doc.KlientNIP || 'Brak NIP'})</span>
                                                </div>
                                            )}
                                            <div className="flex items-center gap-3 mt-1">
                                                <p className="text-xs text-gray-500">
                                                    Sym: <span className="font-medium text-gray-700">{doc.Symbol}</span>
                                                </p>
                                                <span className="text-gray-300 text-xs">|</span>
                                                <p className="text-[10px] text-gray-400">
                                                    {new Date(doc.DataWprowadzenia).toLocaleDateString()}
                                                </p>
                                                <span className="text-gray-300 text-xs">|</span>
                                                <div className="flex items-center gap-1 text-[10px] font-medium">
                                                    <span className={doc.IsExcess ? 'text-purple-700 font-bold' : (doc.IsComplete ? 'text-green-600' : (doc.SavedItems === 0 ? 'text-red-500' : 'text-orange-500'))}>
                                                        {doc.SavedItems} / {doc.TotalItems}
                                                    </span>
                                                    <span className="text-gray-400">SN</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <ChevronRight className="text-gray-300 group-hover:text-indigo-400" size={16} />
                                </div>
                            </div>
                        )
                    })}
                </div>

                {filteredDocuments.length === 0 && !loading && (
                    <div className="text-center py-12 text-gray-400 border-2 border-dashed border-gray-100 rounded-xl">
                        {tab === 'pending' ? 'Wszystkie dokumenty na tej stronie uzupełnione! 🎉' : 'Brak uzupełnionych dokumentów na tej stronie.'}
                    </div>
                )}

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-4 py-4 pt-6 border-t border-gray-100">
                        <button
                            onClick={() => handlePageChange(Math.max(1, page - 1))}
                            disabled={page === 1 || loading}
                            className="ui-btn ui-btn-soft"
                        >
                            Poprzednia
                        </button>
                        <span className="text-sm font-medium text-gray-600">
                            Strona {page} z {totalPages}
                        </span>
                        <button
                            onClick={() => handlePageChange(Math.min(totalPages, page + 1))}
                            disabled={page === totalPages || loading}
                            className="ui-btn ui-btn-soft"
                        >
                            Następna
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default DocumentList;
