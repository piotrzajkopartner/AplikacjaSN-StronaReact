# Dokumentacja techniczna aplikacji landing page

## 1. Cel dokumentu
Ten dokument jest aktualnym przewodnikiem utrzymaniowym projektu landing page "Partner Numery Seryjne".
Opisuje realny stan kodu po integracji interaktywnego demo w ramach tej samej aplikacji SPA.

## 2. Szybki start

### Wymagania
- Node.js (zalecane aktualne LTS)
- npm

### Komendy
```bash
npm install
npm run dev
npm run build
npm run preview
```

## 3. Stack technologiczny
- React 19
- Vite 8
- React Router DOM 7
- Tailwind CSS 3 + PostCSS + Autoprefixer
- framer-motion
- clsx + tailwind-merge
- lucide-react
- swr
- html5-qrcode
- react-qr-code (pozostaje w zaleznosciach; modal QR korzysta obecnie z obrazu generatora HTTP)
- @formkit/auto-animate

Pliki konfiguracyjne:
- `package.json`
- `vite.config.js`
- `tailwind.config.js`
- `postcss.config.js`
- `vercel.json`

## 4. Architektura wysokiego poziomu
Aplikacja jest SPA oparta o routing po stronie klienta.

Wejscie:
- `src/main.jsx` -> `BrowserRouter` -> `App`

Routing:
- `src/App.jsx`
  - `/` -> `HomePage`
  - `/demo` -> `DemoPage` (lazy load przez `React.lazy` + `Suspense`)

Layout:
- `src/components/layout/Layout.jsx`
  - `Navbar`
  - `Outlet`
  - `Footer`

## 5. Struktura katalogow (aktualna)
```text
src/
├── App.jsx
├── main.jsx
├── index.css
├── content/
│   └── siteContent.js
├── pages/
│   ├── HomePage.jsx
│   └── DemoPage.jsx
├── features/
│   └── demo/
│       ├── DemoAppShell.jsx
│       ├── demo.css
│       └── standalone/
│           ├── App.jsx
│           ├── api.js
│           ├── demoData.js
│           ├── assets/
│           │   └── logo300x300.png
│           └── components/
│               ├── DocumentList.jsx
│               ├── SerialEntry.jsx
│               ├── MobileScanner.jsx
│               ├── Toast.jsx
│               ├── LicenseStatus.jsx
│               └── UnsavedChangesDialog.jsx
├── components/
│   ├── layout/
│   ├── seo/
│   ├── sections/
│   └── ui/
public/
└── demo-pdfs/
    ├── warranty-default.svg
    ├── warranty-pa.svg
    └── warranty-wz.svg
```

## 6. Warstwa danych (single source of truth)
Glowne tresci marketingowe i dane stron trzymane sa w:
- `src/content/siteContent.js`

Najwazniejsze klucze obiektu `siteContent`:
- `seo`
- `navigation`
- `hero`
- `problems`
- `solution`
- `benefits`
- `features`
- `pricing`
- `deployment`
- `security`
- `trust`
- `faq`
- `contact`
- `demoPage`
- `footer`

Uwaga: dawne `demoPreview` zostalo usuniete z homepage.

## 7. Strona glowna (`/`) - skladanie sekcji
`src/pages/HomePage.jsx` sklada sekcje w kolejnosci:
1. `HeroSection`
2. `ProblemSection`
3. `SolutionSection`
4. `BenefitsGridSection`
5. `FeaturesSection`
6. `PricingSection`
7. `DeploymentSection`
8. `SecuritySection`
9. `PartnerNetTrustSection`
10. `FAQSection`
11. `FinalCTASection`

## 8. Nawigacja i anchory
Anchory sekcji:
- `#problem`
- `#rozwiazanie`
- `#korzysci`
- `#funkcje`
- `#cena`
- `#kontakt`

`Navbar` obsluguje dwa konteksty:
- na `/` linkuje do `#anchor`
- poza `/` (np. `/demo`) linkuje do `/#anchor`

Dodatkowo navbar i footer maja link do `/demo`.

## 9. Strona `/demo` (stan aktualny)
`src/pages/DemoPage.jsx` nie jest juz placeholderem.
To pelna strona osadzajaca interaktywna mini-aplikacje demo:
- hero sprzedazowy + CTA,
- statystyki/argumenty biznesowe,
- osadzony shell: `src/features/demo/DemoAppShell.jsx`,
- runtime demo z `src/features/demo/standalone/App.jsx`.

## 10. Demo standalone - logika
### Gdzie jest logika
- `src/features/demo/standalone/api.js` -> mock API in-memory
- `src/features/demo/standalone/demoData.js` -> generator danych demo
- `src/features/demo/standalone/components/*` -> UI listy, dokumentu, skanera, toastow

### Kluczowe zachowania
- Tryb read-only (zapis SN blokowany, lock symulowany).
- Wyszukiwanie dokumentow/SN oraz przejscie do dokumentu.
- Podglad gwarancji przez SVG (`public/demo-pdfs/*`).
- Modal QR do szybkiego otwarcia `/demo` na telefonie.

### Wazna aktualizacja
- Symulacja blokady licencji zostala usunieta.
- `LicenseOverlay` zostal usuniety z kodu.
- Pozostaje tylko informacyjny `LicenseStatus`.

## 11. Dane demo - symbole produktow
W `src/features/demo/standalone/demoData.js` symbole produktow sa obecnie 4-cyfrowe:
- `1001`, `1002`, `1003`, `1004`, `1005`, `1006`

Wyszukiwanie po symbolu dziala nadal, bo komponenty filtruja po `item.Symbol`.

## 12. Wyszukiwarka demo - zakresy
W `DocumentList` dostepne sa zakresy:
- `Wszystko`
- `Numer SN`
- `Dokument PZ`
- `Dokument ZK`
- `Dokument WZ`
- `Dokument PA`

Dodatkowo zapytanie jest kodowane (`encodeURIComponent`) przed wyslaniem do mock API.

## 13. Stylowanie
- Globalne style strony: `src/index.css`
- Stylowanie osadzonego demo (scoped): `src/features/demo/demo.css`

Scoping przez wrapper `.sn-demo` ogranicza wyciek klas demo do reszty landingu.

## 14. SEO
`src/components/seo/SeoManager.jsx`:
- ustawia runtime SEO dla `/` i `/demo`,
- aktualizuje `title`, `description`, `og:*`.

## 15. Vercel i odswiezanie tras SPA
Aby `/demo` nie zwracalo 404 po odswiezeniu, dodano:
- `vercel.json` z fallbackiem tras do `/index.html` (po `handle: filesystem`).

To jest wymagane dla poprawnego dzialania React Router na hostingu Vercel.

## 16. Co zmieniac i gdzie (mapa szybka)
### Teksty marketingowe
- `src/content/siteContent.js`

### Routing
- `src/App.jsx`

### Hero strony `/demo`
- `src/pages/DemoPage.jsx`

### Logika aplikacji demo
- `src/features/demo/standalone/App.jsx`
- `src/features/demo/standalone/components/*`
- `src/features/demo/standalone/api.js`
- `src/features/demo/standalone/demoData.js`

### Stylowanie demo
- `src/features/demo/demo.css`

### Podglady gwarancji
- `public/demo-pdfs/*`

## 17. Checklist utrzymaniowy przed release
- `npm run build` przechodzi bez bledow
- `/` i `/demo` dzialaja po bezposrednim odswiezeniu (Vercel rewrite aktywny)
- modal QR otwiera sie poprawnie (bez "bialego tla")
- wyszukiwarka demo przyjmuje input i filtruje poprawnie
- symbole produktow sa 4-cyfrowe i wyszukiwalne
- brak kodu symulacji blokady licencji

## 18. Najwazniejsze pliki do zapamietania (TOP 12)
1. `src/content/siteContent.js`
2. `src/pages/HomePage.jsx`
3. `src/pages/DemoPage.jsx`
4. `src/features/demo/DemoAppShell.jsx`
5. `src/features/demo/demo.css`
6. `src/features/demo/standalone/App.jsx`
7. `src/features/demo/standalone/api.js`
8. `src/features/demo/standalone/demoData.js`
9. `src/components/layout/Navbar.jsx`
10. `src/components/seo/SeoManager.jsx`
11. `src/App.jsx`
12. `vercel.json`

---
Dokument zaktualizowany: 2026-04-26 15:56 (CEST).
