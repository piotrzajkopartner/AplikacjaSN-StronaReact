# Analiza techniczna aplikacji: Partner Numery Seryjne

## 1. Wstęp – Czym jest aplikacja?
Na podstawie kodu źródłowego, aplikacja "Partner Numery Seryjne" to dedykowany system webowy (klient-serwer) działający jako dodatek (rozszerzenie funkcjonalności) do systemu ERP **Subiekt nexo PRO**. Jej głównym celem jest zaawansowane zarządzanie numerami seryjnymi (SN) produktów na różnych etapach procesów magazynowych i sprzedażowych (np. przyjmowanie, wydawanie, kompletacja zamówień), a także automatyczne generowanie kart gwarancyjnych w formacie PDF. 

System opiera się na architekturze "Strictly Read-Only" względem bazy głównej Nexo, zapisując własne dane (np. przypisane numery SN) w niezależnej bazie SQL, by nie ingerować w standardowe mechanizmy ERP (z jednym wyjątkiem opisanym poniżej).

## 2. Architektura i Moduły

Aplikacja składa się z dwóch głównych modułów oraz warstwy integracyjnej:

### Frontend (Klient)
- **Technologia:** React.js + Vite, Tailwind CSS, SWR (do pobierania danych i cache'owania).
- **Lokalizacja:** `/client/`
- **Kluczowe biblioteki:** `axios` (zapytania API), `lucide-react` (ikony), `react-qr-code` i `html5-qrcode` (obsługa skanera i kodów QR), `@formkit/auto-animate` (animacje UI).
- **Zadanie:** Dostarczenie interfejsu SPA (Single Page Application) dla pracowników magazynu i biura. Działa responsywnie (wsparcie dla urządzeń mobilnych ze skanerem aparatu).

### Backend (Serwer)
- **Technologia:** Node.js + Express.js.
- **Lokalizacja:** `/server/`
- **Kluczowe biblioteki:** `mssql` (połączenie z Nexo), `sequelize` (własna baza danych SN), `node-cron` (zadania w tle), `pdfmake` i `bwip-js` (generowanie dokumentów PDF i kodów kreskowych), zabezpieczenia sprzętowe i licencjonowanie (bytenode, weryfikacja HWID, szyfrowanie AES).
- **Zadanie:** Zapewnienie logiki biznesowej, integracji z bazą Subiekt Nexo, walidacji danych, zarządzania blokadami dokumentów i zadaniami w tle (cron).

### Bazy Danych i Integracje
- **Subiekt nexo PRO (MSSQL):** Źródło prawdy o dokumentach (PZ, WZ, PA, ZK) oraz asortymencie. Backend pobiera z niej dane poprzez optymalizowane zapytania i CTE (Common Table Expressions). Baza traktowana jako "tylko do odczytu".
- **Baza `NumerySN` (MSSQL + Sequelize):** Dedykowana baza aplikacji przechowująca:
  - `SerialNumber`: przypisania numerów seryjnych do pozycji dokumentów.
  - `PdfLog`: historia wygenerowanych dokumentów PDF.
  - `DocumentLock`: system pesymistycznego blokowania dokumentów przed równoczesną edycją.
  - `AppConfig`: konfiguracja i zaszyfrowane dane licencyjne.
  - `DocumentCache` / `SyncQueue`: tabele wspierające optymalizację wydajności (cache'owanie statystyk dokumentów) oraz kolejkę synchronizacji.

## 3. Struktura Katalogów

```text
AplikacjaSN/
├── /client/                  # Aplikacja frontendowa (React + Vite)
│   ├── /src/                 # Kod źródłowy UI
│   │   ├── /components/      # Komponenty: DocumentList, SerialEntry, Toast, LicenseOverlay
│   │   ├── api.js            # Konfiguracja zapytań Axios
│   │   └── App.jsx           # Punkt wejścia UI, routing stanu
│   ├── .env                  # Zmienne środowiskowe frontendu (np. VITE_API_PROXY_TARGET)
│   └── package.json          # Zależności NPM frontendu
├── /server/                  # Serwer backendowy (Node.js)
│   ├── /config/              # Pliki konfiguracyjne (np. pdfConfig.js dla kart gwarancyjnych)
│   ├── /utils/               # Helpery logiczne (pdfGenerator.js, serialHelpers.js, licencje)
│   ├── /certs/               # Certyfikaty SSL (generowane automatycznie na start)
│   ├── /daemon/              # Skrypty usług systemowych (np. node-windows)
│   ├── /generated_pdfs/      # Folder docelowy dla wygenerowanych kart gwarancyjnych
│   ├── index.jsc / indexXXXX.js # Główny skrypt serwera (Skompilowany bytenode / kod źródłowy)
│   ├── .env                  # Krytyczne dane: DB_NEXO, DB_SN, ustawienia PDF, klucze
│   └── package.json          # Zależności NPM backendu
├── /plans/                   # Plany refaktoryzacji, manuale
├── start_app.bat             # Skrypt startowy Windows
├── reset_app.bat             # Skrypt restartujący środowisko
├── PROJECT_MAP.md            # Architektura high-level
└── TECHNICAL_DOCUMENTATION.md # Dokumentacja techniczna systemu
```

## 4. Modele Danych

1. **Główna baza Nexo (`ModelDanychContainer`)**
   - Odpytywane tabele: `Dokumenty`, `PozycjeDokumentu`, `Asortymenty`, `Podmioty`, `DokumentDokument`, `Asortymenty_PolaWlasneAsortyment_Adv2` (sprawdzanie flagi `I2 = 100012` dla towarów z wymaganymi numerami SN).
2. **Modele w bazie NumerySN (Sequelize)**
   - `SerialNumber`: `documentId`, `itemId`, `serialNumber`, `symbol`. Kluczowy index `IX_SerialNumbers_Unique` pilnuje unikalności (nie pozwala na duplikaty tego samego numeru SN poza placeholderem "brak").
   - `PdfLog`: Logika sprawdzania, czy dokument miał już wystawioną kartę.
   - `DocumentLock`: `DocumentId`, `ClientId`, `ExpiresAt` (zarządzanie blokadami dostępu).
   - `DocumentCache`: Tabela pamięci podręcznej (odciążenie zapytań do Nexo) – przechowuje obliczone statystyki dokumentów (`TotalItems`, `SavedItems`, flagi statusów).

## 5. Funkcjonalności Aplikacji i Procesy Biznesowe

### Zarządzanie Numerami Seryjnymi (Magazyn, Serwis, Sprzedaż)
- Wprowadzanie i weryfikacja numerów seryjnych dla przyjęć (PZ), wydań (WZ), paragonów (PA) oraz zamówień klientów (ZK).
- **Auto-Cleanup (Czyszczenie sierot):** System sam aktualizuje przypisane SN w przypadku zmian na dokumencie w Subiekcie (np. gdy ktoś zmniejszy ilość sztuk na pozycji).
- **Dziedziczenie (Migracja ZK → WZ/PA):** Jeśli użytkownik utworzył dokument WZ realizujący ZK (na którym podano już numery SN), system automatycznie przenosi/kopiuje te przypisania do nowego dokumentu.
- Obsługa specjalnego statusu `brak` dla towarów, które wyjątkowo nie posiadają w danej chwili identyfikatora, ale pozwalają procesowi przejść dalej.

### Automatyzacje i Walidacje
- **Ochrona przed duplikatami:** Endpointy i baza danych aktywnie weryfikują `IX_SerialNumbers_Unique`, zapewniając, że ten sam fizyczny sprzęt nie zostanie wydany dwa razy.
- **Pessimistic Locking (Blokowanie Dokumentów):** System zapobiega kolizjom, gdy dwóch pracowników próbuje jednocześnie wpisać numery do tego samego dokumentu. Blokada wygasa po 30 sekundach bez aktywności, posiada mechanizm "heartbeat" i podgląd w trybie Read-Only.
- **Ghost Mode i Auto-Heal:** Automatyczne wychwytywanie dokumentów, które w Nexo zmieniły status na "Anulowane" (Status 8) lub zostały skasowane. System sam czyści listę oczekujących ("Do uzupełnienia"), korygując pamięć podręczną (`DocumentCache`).
- **SyncWorker:** Zadanie działające w tle (co 3 sekundy), które analizuje drzewo relacji dokumentów (Ancestors) i przelicza na nowo w tle wymagane ilości, eliminując konieczność blokowania interfejsu podczas ciężkich zapytań.
- **Night Watchman:** Nocny harmonogram dbający o poprawność stanów i odświeżanie cache'a.

### Karty Gwarancyjnie i PDF
- Automatyczne powiązywanie WZ z fakturami sprzedaży (FS) i paragonami (PA) poprzez relację `Dokument_DokumentPowiazany_Id` i wyciąganie finalnego numeru dokumentu sprzedaży do prawego górnego rogu PDF.
- Mapowanie okresów gwarancyjnych w oparciu o pola własne (np. `I0 = 100001` z Nexo mapuje się z `WARRANTY_100001` z `.env` aplikacji, wyliczając datę końca gwarancji).
- **Zadanie CRON:** Co godzinę aplikacja sprawdza zrealizowane dokumenty i sama generuje pliki PDF z kodami kreskowymi.
- **Jedyny zapis w Nexo:** Cron wykonuje komendę `MERGE` do pola niestandardowego `I0 = 100014` na dokumencie, powiadamiając Subiekta, że karta została pomyślnie utworzona. Zabezpieczono to zmienną `ENABLE_AUTO_PDF_CRON`.

### Walidacje Sprzętowe i Bezpieczeństwo
- Zabezpieczenie na poziomie kompilacji kodu (pliki bajtowe `.jsc`).
- Generowanie identyfikatora maszynowego (HWID). 
- Moduł `licenseWorker` komunikuje się z serwerem dostawcy, pobierając zaszyfrowaną licencję (AES-256-GCM), zapobiegając nielegalnemu przenoszeniu systemu pomiędzy serwerami oraz chroniąc przed cofaniem zegara systemowego maszyny.

## 6. Widoki i Interakcje Użytkownika (Frontend)

1. **DocumentList (Lista dokumentów)**
   - Obsługuje zakładki: "Do uzupełnienia" (pending) oraz "Uzupełnione" (completed).
   - Różne typy wyświetlanych list: PZ, ZK, WZ, PA.
   - Globalna wyszukiwarka – po numerze SN, sygnaturze, kliencie.
   - Kolorowanie elementów (np. fioletowy dla nadmiaru przypisanych numerów względem zapotrzebowania, zielony dla kompletnych dokumentów).
   - Integracja z mobilnym skanerem kodów kreskowych za pomocą kamery (ikona QR).

2. **SerialEntry (Formularz edycji dokumentu)**
   - Wylistowanie wszystkich pozycji towarowych dokumentu wymagających nadania numeru seryjnego (`I2 = 100012`).
   - Dynamiczne pola tekstowe dostosowujące się do `Ilosc` na dokumencie w Nexo.
   - Nadmiarowe SN wylistowane na czerwono (wymagają usunięcia).
   - Dynamiczny przycisk pobierania "Karty Gwarancyjnej" (pojedynczy wydruk na życzenie).
   - Mechanizm autozapisu (debounce) lub ręcznego zatwierdzania.

3. **LicenseOverlay**
   - Nakładka blokująca dostęp, pojawiająca się, gdy wygaśnie licencja, zmieni się serwer (HWID mitchmatch) lub wykryta zostanie próba modyfikacji licencji. Pozwala skopiować nowy identyfikator sprzętowy i przesłać go w celu odnowienia.

## 7. Jak aplikacja działa – krok po kroku (Na przykładzie wydania towaru)

1. Pracownik wystawia w Subiekt nexo PRO dokument (np. Wydanie Zewnętrzne - WZ). Dokument posiada towary oznaczone flagą `I2 = 100012` (Wymaga numeru SN).
2. Dokument pojawia się błyskawicznie na liście "Do uzupełnienia" w Aplikacji webowej SN dzięki automatycznemu przeliczaniu w pamięci podręcznej (`DocumentCache`).
3. Pracownik z magazynu używa tabletu/komputera – klika w dokument. Endpoint `/api/documents/:id/lock` przydziela mu blokadę na edycję (inni widzą w tym czasie podgląd "Read-Only").
4. Aplikacja pobiera z bazy przypisania: Endpoint `/api/documents/:id/items`. Jeśli dokument WZ był realizowany na podstawie ZK, aplikacja automatycznie podpowiada numery zeskanowane już na etapie zamówienia (Migracja ZK → WZ).
5. Użytkownik ręcznie skanuje braki i zapisuje. Walidacja `/api/serials/check-duplicate` upewnia się, że nie skanuje sprzętu przypisanego do innej WZ-tki. Zapis modyfikuje bazę `NumerySN` (tabelę `SerialNumber`).
6. Po zapisaniu wymaganej liczby urządzeń, dokument zmienia status i przeskakuje do zakładki "Uzupełnione".
7. Skrypt w tle (SyncWorker) aktualizuje połączone z WZ dokumenty (np. Zamówienie od Klienta), zamykając ich status braku SN w cache.
8. Uruchamia się zadanie (Cron - `checkAndGeneratePdfs`). Rozpoznaje gotową WZ, odnajduje podpiętą do niej Fakturę w Nexo i generuje plik PDF Karty Gwarancyjnej. Następnie Cron zapisuje w samym Nexo do dokumentu informacje o wygenerowaniu pliku (pole I0=100014) aby zablokować ponowne automatyczne generowanie.

## 8. Zależności API (Najważniejsze Endpointy)

- `GET /api/documents`: Lista dokumentów (podział, filtracja).
- `GET /api/documents/:id`: Pobranie metadanych dokumentu.
- `GET /api/documents/:id/items`: Odpytywanie pozycji i auto-czyszczenie sierot.
- `POST /api/serials`: Zapis numerów SN.
- `GET /api/serials/search`: Wyszukiwanie asortymentu w całym systemie po numerze SN.
- `GET /api/serials/check-duplicate`: Detekcja zduplikowanych SN.
- `GET /api/documents/:id/pdf`: Endpoint generujący na żądanie kartę gwarancyjną.
- `POST /api/documents/:id/lock` (oraz unlock): Mechanizm blokad na zasobach (Pessimistic locking).
- `GET /api/license/status`: Endpoint weryfikujący stan ochrony prawnej.
- `POST /api/documents/refresh-all`: Ręczne, masowe przeliczenie pamięci cache systemu (Admin tool).

## Podsumowanie

Aplikacja jest wysoce zoptymalizowanym, zaawansowanym rozwiązaniem PWA, które za pomocą rozbudowanych operacji SQL (`WITH Ancestors`, `RecursiveKFS`) realizuje skomplikowaną architekturę systemu zarządzania SN dla Subiekt Nexo, obchodząc w większości ograniczenia wydajnościowe samego ERP. Oparto ją o system niezawodnych blokad (pessimistic locking), inteligentnej propagacji powiązań dokumentów i warstwy cache'ującej, tworząc system stabilny i przeznaczony do zastosowań biznesowych "heavy-duty".
