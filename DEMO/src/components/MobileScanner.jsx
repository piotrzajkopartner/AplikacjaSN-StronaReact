import React, { useEffect, useRef, useState } from 'react';
import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode';
import { X, Check, Camera, RefreshCw } from 'lucide-react';

const MobileScanner = ({ onScan, onClose, title = "Skanuj kod", multiMode = false, scannedCount = 0 }) => {
    const [scannedCode, setScannedCode] = useState(null);
    const [isScanning, setIsScanning] = useState(true);
    const [cameraError, setCameraError] = useState(null);
    const scannerRef = useRef(null);
    const regionId = "html5qr-code-full-region";

    // Play beep sound
    const playBeep = () => {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.type = "sine";
        oscillator.frequency.value = 1500;
        gainNode.gain.value = 0.1;

        oscillator.start();
        setTimeout(() => {
            oscillator.stop();
            audioContext.close();
        }, 100);
    };

    useEffect(() => {
        const scanner = new Html5Qrcode(regionId);
        scannerRef.current = scanner;

        const config = {
            fps: 10,
            qrbox: { width: 250, height: 250 },
            aspectRatio: 1.0,
            formatsToSupport: [
                Html5QrcodeSupportedFormats.CODE_128,
                Html5QrcodeSupportedFormats.CODE_39,
                Html5QrcodeSupportedFormats.EAN_13,
                Html5QrcodeSupportedFormats.QR_CODE
            ]
        };

        const startScanning = async () => {
            try {
                await scanner.start(
                    { facingMode: "environment" },
                    config,
                    (decodedText) => {
                        // Success callback
                        if (!scannedCode) {
                            playBeep();
                            setScannedCode(decodedText);
                            setIsScanning(false);
                            scanner.pause(true); // Pause scanning to freeze frame/stop processing
                        }
                    },
                    (errorMessage) => {
                        // parse error, ignore it.
                    }
                );
            } catch (err) {
                console.error("Error starting scanner:", err);
                setCameraError("Nie można uzyskać dostępu do kamery. Sprawdź uprawnienia i czy używasz HTTPS/Localhost.");
            }
        };

        startScanning();

        return () => {
            if (scanner.isScanning) {
                scanner.stop().then(() => scanner.clear());
            } else {
                scanner.clear();
            }
        };
    }, []); // Run once on mount

    // Rescan handler
    const handleRescan = () => {
        setScannedCode(null);
        setIsScanning(true);
        if (scannerRef.current) {
            scannerRef.current.resume();
        }
    };

    // Confirm handler
    const handleConfirm = () => {
        if (scannedCode) {
            onScan(scannedCode);
            if (multiMode) {
                // If multi-mode, reset for next scan
                handleRescan();
            } else {
                // If single mode, close scanner
                onClose();
            }
        }
    };

    // Volume Button Listener (Experimental)
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (scannedCode && (e.key === 'AudioVolumeUp' || e.key === 'AudioVolumeDown' || e.key === 'ArrowUp' || e.key === 'ArrowDown')) {
                e.preventDefault();
                handleConfirm();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [scannedCode, multiMode, onScan, onClose]); // Dependencies for closure

    return (
        <div className="fixed inset-0 z-50 bg-black text-white flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center p-4 bg-black/50 absolute top-0 left-0 right-0 z-10 backdrop-blur-sm">
                <div className="flex flex-col">
                    <h2 className="text-lg font-bold">{title}</h2>
                    {multiMode && <span className="text-xs text-gray-300">Tryb seryjny: Zeskanowano {scannedCount}</span>}
                </div>
                <button onClick={onClose} className="p-2 bg-white/10 rounded-full hover:bg-white/20">
                    <X size={24} />
                </button>
            </div>

            {/* Camera Area */}
            <div className="flex-1 relative bg-black flex items-center justify-center overflow-hidden">
                <div id={regionId} className="w-full h-full object-cover"></div>

                {/* Overlay UI when scanning */}
                {isScanning && !cameraError && (
                    <div className="absolute inset-0 border-2 border-white/30 pointer-events-none flex items-center justify-center">
                        <div className="w-64 h-64 border-2 border-indigo-500 rounded-lg relative">
                            <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-indigo-500 -mt-1 -ml-1"></div>
                            <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-indigo-500 -mt-1 -mr-1"></div>
                            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-indigo-500 -mb-1 -ml-1"></div>
                            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-indigo-500 -mb-1 -mr-1"></div>
                        </div>
                        <p className="absolute bottom-20 text-center text-white/80 text-sm font-medium bg-black/40 px-3 py-1 rounded-full">
                            Nakieruj na kod kreskowy
                        </p>
                    </div>
                )}

                {/* Error Message */}
                {cameraError && (
                    <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
                        <div className="bg-red-900/80 p-6 rounded-xl border border-red-500">
                            <Camera size={48} className="mx-auto mb-4 text-red-300" />
                            <p className="text-red-100 mb-4">{cameraError}</p>
                            <button onClick={onClose} className="px-6 py-2 bg-white text-red-900 font-bold rounded-lg">
                                Zamknij
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Bottom Controls - Verification Panel */}
            <div className={`p-6 pb-12 bg-gray-900 transition-transform duration-300 ease-out transform ${scannedCode ? 'translate-y-0' : 'translate-y-full'}`}>
                {scannedCode && (
                    <div className="flex flex-col gap-4">
                        <div className="text-center mb-2">
                            <span className="text-gray-400 text-sm uppercase tracking-wider">Wykryto kod</span>
                            <div className="text-3xl font-mono font-bold text-white break-all mt-1">
                                {scannedCode}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={handleRescan}
                                className="flex items-center justify-center gap-2 py-4 bg-gray-700 active:bg-gray-600 rounded-xl font-bold text-lg"
                            >
                                <RefreshCw size={24} />
                                Ponów
                            </button>
                            <button
                                onClick={handleConfirm}
                                className="flex items-center justify-center gap-2 py-4 bg-green-600 active:bg-green-700 rounded-xl font-bold text-lg shadow-lg shadow-green-900/50"
                            >
                                <Check size={28} />
                                ZATWIERDŹ
                            </button>
                        </div>
                        <p className="text-xs text-center text-gray-500 mt-2">
                            Możesz też użyć przycisków głośności, aby zatwierdzić (jeśli obsługiwane).
                        </p>
                    </div>
                )}
            </div>

            {/* Placeholder for bottom panel height when scanning to keep camera centered nicely */}
            {!scannedCode && <div className="h-24 bg-black"></div>}
        </div>
    );
};

export default MobileScanner;
