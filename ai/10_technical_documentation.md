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
  - `/demo` -> `DemoPage` (lazy load przez `React.lazy` + `Suspense` z `DemoPageSkeleton`)
  - `/polityka-prywatnosci` -> `PrivacyPage`

Layout:
- `src/components/layout/Layout.jsx`
  - `LaserReveal` (startowa animacja skanera fullscreen)
  - `SNTicker` (dekoracyjne tlo z numerami seryjnymi)
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
│   ├── DemoPage.jsx
│   └── PrivacyPage.jsx
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
│   ├── magicui/
│   ├── seo/
│   ├── sections/
│   └── ui/
│       ├── Accordion.jsx
│       ├── Button.jsx
│       ├── Card.jsx
│       ├── ContactForm.jsx
│       ├── CookieConsent.jsx
│       ├── DemoPageSkeleton.jsx
│       ├── PlaceholderImage.jsx
│       └── SectionHeading.jsx
public/
├── android-chrome-192x192.png
├── android-chrome-512x512.png
├── apple-touch-icon.png
├── favicon-16x16.png
├── favicon-32x32.png
├── favicon.ico
├── manifest.json
├── site.webmanifest
├── partner-assets/
│   └── 400dpiLogo.jpg
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
- `privacy`

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

Aktualizacja UI:
- Pole wyszukiwania ma dedykowana klase `ui-search-input` i zwiekszony lewy/prawy padding,
  aby placeholder nie nachodzil na ikone lupy i przycisk po prawej stronie.

## 13. Stylowanie
- Globalne style strony: `src/index.css`
- Stylowanie osadzonego demo (scoped): `src/features/demo/demo.css`

Scoping przez wrapper `.sn-demo` ogranicza wyciek klas demo do reszty landingu.

## 14. SEO
`src/components/seo/SeoManager.jsx`:
- ustawia runtime SEO dla `/`, `/demo` i `/polityka-prywatnosci`,
- aktualizuje `title`, `description`, `og:*`.

## 15. Strona polityki prywatnosci (`/polityka-prywatnosci`)
- `src/pages/PrivacyPage.jsx`: strona RODO z 9 sekcjami, kazda z ikona z lucide-react.
- `src/content/siteContent.js` -> klucz `privacy`: pelna tresc polityki (administrator, dane, cel, podstawa prawna, cookies, prawa, retencja, kontakt, aktualizacje).
- W stopce dodano link `Polityka prywatnosci` przez `<Link to="/polityka-prywatnosci">`.
- CookieConsent zawiera link do polityki oraz dodatkowy przycisk "Tylko niezbędne".
- Switche cookies zmienione na natywne `<input type="checkbox" role="switch">`.

## 16. Loading skeleton demo
- `src/components/ui/DemoPageSkeleton.jsx`: placeholder renderowany podczas lazy-load `DemoPage` w `Suspense`.
- Wizualnie imituje strukture: hero z placeholderami + demoshell z 5 kartami dokumentow.

## 17. PWA i favicon
- `public/manifest.json`: konfiguracja PWA z `theme_color: #00aeff` oraz ikonami PNG:
  - `/android-chrome-192x192.png`
  - `/android-chrome-512x512.png`
- `index.html`: favicony ustawione na zestaw produkcyjny (`favicon.ico`, `favicon-32x32.png`, `favicon-16x16.png`, `apple-touch-icon.png`),
  plus `manifest`, `theme-color`, `apple-mobile-web-app-*`, `robots`, font preload.
- Dodatkowo w `public/` znajduje sie `site.webmanifest` dostarczony z paczki favicon.

## 18. CookieConsent - aktualizacja
- `src/components/ui/CookieConsent.jsx`:
  - Dodany przycisk "Tylko niezbędne" (obok "Akceptuj wszystkie" i "Ustawienia").
  - Link do `/polityka-prywatnosci` w obu widokach (główny i ustawienia).
  - Rozszerzone opisy kategorii cookies (konkretne narzędzia: GA, Meta Pixel, LinkedIn).
  - Switche zmienione z customowego `<button>` na natywny `<input type="checkbox" role="switch">`.

## 19. Vercel i odswiezanie tras SPA
Aby `/demo` i `/polityka-prywatnosci` nie zwracaly 404 po odswiezeniu, dodano:
- `vercel.json` z fallbackiem tras do `/index.html` (po `handle: filesystem`).

To jest wymagane dla poprawnego dzialania React Router na hostingu Vercel.

## 20. Co zmieniac i gdzie (mapa szybka)
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

### Strona polityki prywatnosci
- `src/pages/PrivacyPage.jsx`
- `src/content/siteContent.js` -> klucz `privacy`

### Sekcja "O dostawcy" (Partner-net.pl)
- `src/components/sections/PartnerNetTrustSection.jsx`
- `src/content/siteContent.js` -> klucz `trust`
- `public/partner-assets/400dpiLogo.jpg`

### Animacja startowa skanera
- `src/components/magicui/laser-reveal.jsx`
- `src/components/layout/Layout.jsx`

### Stylowanie demo
- `src/features/demo/demo.css`

### Podglady gwarancji
- `public/demo-pdfs/*`

### CookieConsent
- `src/components/ui/CookieConsent.jsx`

### Loading skeleton demo
- `src/components/ui/DemoPageSkeleton.jsx`

## 21. Checklist utrzymaniowy przed release
- `npm run build` przechodzi bez bledow
- `/`, `/demo` i `/polityka-prywatnosci` dzialaja po bezposrednim odswiezeniu (Vercel rewrite aktywny)
- modal QR otwiera sie poprawnie (bez "bialego tla")
- wyszukiwarka demo przyjmuje input i filtruje poprawnie
- placeholder w wyszukiwarce demo nie nachodzi na ikone lupy
- symbole produktow sa 4-cyfrowe i wyszukiwalne
- brak kodu symulacji blokady licencji
- strona polityki prywatnosci dostepna i linkowana z footera/cookies
- CookieConsent obsluguje wszystkie 3 opcje i linkuje do polityki
- manifest.json obecny, PWA meta poprawne
- favicony (`.ico`, 16/32 png, apple touch, android 192/512) sa podlinkowane i widoczne
- DemoPage loading skeleton wyswietla sie podczas lazy-load
- animacja startowa skanera (LaserReveal) pokazuje kod EAN i znika wraz z przejsciem lasera

## 22. Najwazniejsze pliki do zapamietania (TOP 15)
1. `src/content/siteContent.js`
2. `src/pages/HomePage.jsx`
3. `src/pages/DemoPage.jsx`
4. `src/pages/PrivacyPage.jsx`
5. `src/features/demo/DemoAppShell.jsx`
6. `src/features/demo/demo.css`
7. `src/features/demo/standalone/App.jsx`
8. `src/features/demo/standalone/api.js`
9. `src/features/demo/standalone/demoData.js`
10. `src/components/layout/Navbar.jsx`
11. `src/components/layout/Footer.jsx`
12. `src/components/ui/CookieConsent.jsx`
13. `src/components/seo/SeoManager.jsx`
14. `src/App.jsx`
15. `vercel.json`

## 23. Ostatnie zmiany UI (2026-04-26)
- Sekcja problemow (`ProblemSection`) przeszla redesign: usunieto numerki `01/02/03`,
  dodano etykiety obszarow, akcenty kolorystyczne i linie "Wplyw" pod trescia kart.
- Sekcja "O dostawcy" uzywa realnego logo Partner-net.pl (klikany blok z linkiem do strony).
- `LaserReveal` renderuje kod kreskowy EAN-13 i wygasza go zgodnie z ruchem lasera.

---
Dokument zaktualizowany: 2026-04-26 21:05 (CEST).
