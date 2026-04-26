# Dokumentacja Techniczna DEMO - Partner Numery Seryjne

Ta wersja (`DEMO/`) jest pokazowa i działa **bez bazy danych** oraz bez backendu produkcyjnego.
Celem jest wierne odwzorowanie UI/flow aplikacji oryginalnej z fikcyjnymi danymi i trybem **read-only**.

## 1. Cel i założenia

- 1:1 doświadczenie użytkownika względem głównej aplikacji (lista dokumentów, wyszukiwarka, detale, locki, licencja, podgląd gwarancji).
- Brak trwałych zapisów (wszystkie akcje zapisu są zablokowane).
- Brak połączeń do MSSQL/Nexo.
- Możliwość szybkiego podmieniania danych i podglądów PDF pod demo handlowe.

## 2. Struktura projektu DEMO

```text
DEMO/
├── package.json
├── vite.config.js
├── public/
│   ├── favicon.png
│   └── demo-pdfs/
│       ├── warranty-wz.svg
│       ├── warranty-pa.svg
│       └── warranty-default.svg
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── api.js                # Mock API (in-memory)
    ├── demoData.js           # Fikcyjne dane i scenariusze
    ├── assets/
    │   └── logo300x300.png
    └── components/
        ├── DocumentList.jsx
        ├── SerialEntry.jsx
        ├── LicenseOverlay.jsx
        ├── LicenseStatus.jsx
        ├── MobileScanner.jsx
        ├── Toast.jsx
        └── UnsavedChangesDialog.jsx
```

## 3. Jak działa DEMO (architektura)

### 3.1 UI i routing lokalny
- Główny ekran i przełączanie listy/detali są w `DEMO/src/App.jsx`.
- Nie ma React Routera; nawigacja to stan `selectedDocument`.
- Badge `TRYB DEMO (READ-ONLY)` i przycisk symulacji blokady licencji są w nagłówku.
- Front korzysta z ujednoliconych tokenów i klas UI (`ui-btn`, `ui-input`, `ui-card`, `ui-tab`, `ui-icon-btn`) zdefiniowanych w `DEMO/src/index.css` i spiętych z rozszerzonym theme w `DEMO/tailwind.config.js`.

### 3.2 Warstwa API mock
- `DEMO/src/api.js` zastępuje axios backendowy lokalnym adapterem in-memory.
- Zachowane są te same kontrakty endpointów, których używa UI (`/documents`, `/documents/:id`, `/documents/:id/items`, `/serials/search`, `/serials/check-duplicate`, `/license/status`, lock/unlock).
- Mock zwraca obiekty jak axios (`{ data: ... }`) i błędy z `error.response.status`.

### 3.2.1 UX wyszukiwarki (lista dokumentów)
- Wyniki wyszukiwania SN/dokumentów w `DEMO/src/components/DocumentList.jsx` są tymczasowe i wygaszane automatycznie po 2 minutach (`SEARCH_RESULTS_TTL_MS`).
- Wyniki są czyszczone także po przejściu do dokumentu oraz ręcznie przyciskiem `X` / "Zamknij wyniki".
- Celem jest uniknięcie zalegających wyników po powrocie z widoku dokumentu.

### 3.3 Dane scenariuszy
- `DEMO/src/demoData.js` generuje dokumenty, pozycje i numery seryjne.
- Pokryte scenariusze:
  - PZ/WZ/ZK,
  - pending/completed,
  - nadmiary (`IsExcess`),
  - częściowo uzupełnione,
  - placeholder `brak`,
  - realizacja ZK -> WZ,
  - dokumenty oznaczone jako `[ANULOWANY]` i `[USUNIETY]`.

### 3.4 Read-only
- Zapis (`POST /serials`) zwraca błąd `423 DEMO_READ_ONLY`.
- Lock jest symulowany jako zajęty przez innego operatora (`DEMO_LOCK`), więc formularz pozostaje w praktyce tylko do podglądu.
- W demo nie ma trwałych mutacji danych między odświeżeniami strony.

### 3.4.1 Blokady i stabilność odświeżania widoku
- W `DEMO/src/components/SerialEntry.jsx` inicjalizacja blokady i heartbeat działają w oddzielnych efektach.
- `unlock` wykonywany jest przy opuszczeniu dokumentu, co ogranicza przypadkowe lock/unlock churn i efekt "mignięcia" UI.

### 3.5 PDF w DEMO
- Przycisk "Pobierz Gwarancję" nie generuje PDF.
- Otwiera statyczny podgląd SVG przez `openWarrantyPreview()` w `DEMO/src/api.js`.
- Mapowanie:
  - `WZ` -> `DEMO/public/demo-pdfs/warranty-wz.svg`
  - `PA` -> `DEMO/public/demo-pdfs/warranty-pa.svg`
  - fallback -> `DEMO/public/demo-pdfs/warranty-default.svg`

## 4. Symulacja licencji

- Kliknięcie "Symuluj blokadę licencji" ustawia `localStorage.demo_license_error=1` i przeładowuje stronę.
- Mock API dla endpointów nie-licencyjnych zwraca wtedy `403 LICENSE_EXPIRED` i emituje event `license-error`.
- `LicenseOverlay` reaguje na event i blokuje UI.
- "Ponów sprawdzenie" wywołuje `POST /license/refresh` (mock), który usuwa flagę i odblokowuje aplikację.

## 5. Uruchamianie

W katalogu `DEMO`:

```bash
npm install
npm run dev
```

Build produkcyjny:

```bash
npm run build
npm run preview
```

## 6. Co zmieniać, gdy chcesz modyfikować demo

### 6.1 Chcesz zmienić dane/scenariusze
- Edytuj `DEMO/src/demoData.js`.
- Najważniejsze pola dokumentu:
  - `Symbol`, `IsComplete`, `IsExcess`, `TotalItems`, `SavedItems`,
  - `ZrodloweZK`, `ZrodlowePA`, `RealizedByWzId`, `RealizedByWzSymbol`,
  - `NumerWewnetrzny_PelnaSygnatura`.

### 6.2 Chcesz dodać nowy endpoint pod UI
- Dodaj handler w `DEMO/src/api.js` w metodzie `get()` lub `post()`.
- Zachowaj format odpowiedzi/błędu jak w axios (`{ data }` lub `throw httpError(...)`).

### 6.3 Chcesz podmienić podgląd PDF
- Podmień pliki w `DEMO/public/demo-pdfs/`.
- Jeśli nazwy się zmienią, zaktualizuj `getPdfPreviewPath()` w `DEMO/src/api.js`.

### 6.4 Chcesz zmienić branding
- Logo: `DEMO/src/assets/logo300x300.png`
- Favicon: `DEMO/public/favicon.png`

## 7. Znane ograniczenia DEMO

- Brak połączenia z realną bazą i brak realnych locków wieloużytkownikowych.
- Brak trwałego zapisu SN.
- Podgląd PDF to statyczny obraz, nie generator PDF.
- Dane są deterministyczne i lokalne (brak synchronizacji sieciowej).

## 8. Szybka checklista przed pokazem handlowym

- `npm run build` przechodzi bez błędów.
- W `DocumentList` widoczne są dokumenty dla PZ/WZ/ZK, w tym nadmiary i częściowe uzupełnienie.
- W `SerialEntry` działa tryb read-only i komunikaty lock.
- "Pobierz Gwarancję" otwiera podgląd SVG.
- Symulacja blokady licencji działa i overlay się pokazuje.
- Podmienione finalne obrazy PDF klienta znajdują się w `DEMO/public/demo-pdfs/`.

## 9. Gdzie szukać czego (szybka mapa)

- Wejście aplikacji: `DEMO/src/main.jsx`
- Layout + przełączanie widoków: `DEMO/src/App.jsx`
- Mock API i zachowanie read-only: `DEMO/src/api.js`
- Dane i scenariusze: `DEMO/src/demoData.js`
- Lista dokumentów i wyszukiwanie: `DEMO/src/components/DocumentList.jsx`
- Widok dokumentu i akcje SN/PDF: `DEMO/src/components/SerialEntry.jsx`
- Overlay licencji: `DEMO/src/components/LicenseOverlay.jsx`
- Status licencji: `DEMO/src/components/LicenseStatus.jsx`

## 10. Pliki zmienione w odświeżeniu DEMO UI/UX

- `DEMO/src/App.jsx`
- `DEMO/src/components/DocumentList.jsx`
- `DEMO/src/components/SerialEntry.jsx`
- `DEMO/src/index.css`
- `DEMO/tailwind.config.js`
