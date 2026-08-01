# Dokumentacja techniczna aplikacji landing page

## 1. Cel dokumentu
Ten dokument jest aktualnym przewodnikiem utrzymaniowym projektu landing page "Partner Numery Seryjne".
Opisuje realny stan kodu po dodaniu aplikacji Android, kompletacji mobilnej, wielostronicowych dokumentow SEO i interaktywnego demo obu interfejsow.

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
- react-qr-code (kod QR jest generowany lokalnie, bez zewnetrznego generatora HTTP)
- @formkit/auto-animate

Pliki konfiguracyjne:
- `package.json`
- `vite.config.js`
- `tailwind.config.js`
- `postcss.config.js`
- `vercel.json`

## 4. Architektura wysokiego poziomu
Aplikacja korzysta z React Router po stronie klienta, ale build emituje osobne dokumenty HTML dla glownych tras, aby zapewnic poprawne metadane bez wykonywania JavaScriptu.

Wejscie:
- `src/main.jsx` -> `BrowserRouter` -> `App`

Routing:
- `src/App.jsx`
  - `/` -> `HomePage`
  - `/demo` -> `DemoPage` (lazy load przez `React.lazy` + `Suspense` z `DemoPageSkeleton`)
  - `/polityka-prywatnosci` -> `PrivacyPage` (lazy load)
  - pozostale sciezki -> `NotFoundPage` (lazy load, `noindex`)

Layout:
- `src/components/layout/Layout.jsx`
  - `LaserReveal` (startowa animacja skanera fullscreen)
  - globalne dekoracyjne tlo: gradienty, subtelna siatka i `SNTicker`
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
│   ├── siteContent.js
│   └── mobileDemoData.js
├── pages/
│   ├── HomePage.jsx
│   ├── DemoPage.jsx
│   └── PrivacyPage.jsx
├── features/
│   └── demo/
│       ├── DemoAppShell.jsx
│       ├── demo.css
│       ├── mobile/
│       │   └── MobilePickingDemo.jsx
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
│   ├── product/
│   │   ├── DesktopAppMockup.jsx
│   │   ├── MobileAppMockup.jsx
│   │   ├── PhoneFrame.jsx
│   │   └── ScannerSimulation.jsx
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
├── robots.txt
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

Wspolne, syntetyczne dane makiet Androida i kompletacji znajduja sie w:
- `src/content/mobileDemoData.js`

Pliki z `AplikacjaSN/Android_Foto` sa tylko materialem referencyjnym i nie sa publikowane ani importowane przez landing.

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
4. `WorkflowSection`
5. `MobileAppSection`
6. `ScannerSection`
7. `BenefitsGridSection`
8. `FeaturesSection`
9. `PricingSection` (lazy load)
10. `DeploymentSection`
11. `SecuritySection`
12. `PartnerNetTrustSection`
13. `FAQSection`
14. `FinalCTASection`

Aktualnie spacing strony glownej jest ustawiony w `HomePage.jsx` jako `space-y-12 md:space-y-16`.

## 8. Nawigacja i anchory
Anchory sekcji:
- `#problem`
- `#rozwiazanie`
- `#jak-dziala`
- `#aplikacja-mobilna`
- `#skanowanie`
- `#korzysci`
- `#funkcje`
- `#cena`
- `#kontakt`

`Navbar` obsluguje dwa konteksty:
- na `/` linkuje do `#anchor`
- poza `/` (np. `/demo`) linkuje do `/#anchor`

Dodatkowo navbar i footer maja link do `/demo`.

Aktualizacja UI navbaru:
- desktopowa nawigacja jest w formie zaokraglonego pill-navigation z jasnym tlem i delikatnym cieniem,
- CTA korzysta z `brand-blue`,
- logo ma zmniejszona wysokosc wzgledem poprzedniej wersji (`h-12`, `md:h-16`, `lg:h-[72px]`),
- mobile linki rowniez maja zaokraglone pill style.

## 9. Strona `/demo` (stan aktualny)
`src/pages/DemoPage.jsx` udostepnia dwa zachowujace stan srodowiska demonstracyjne:
- hero sprzedazowy + CTA,
- statystyki/argumenty biznesowe,
- panel webowy: `src/features/demo/DemoAppShell.jsx`,
- kompletacja Android: `src/features/demo/mobile/MobilePickingDemo.jsx`,
- lokalna symulacja skanera zsynchronizowana z postepem `0/2 -> 1/2 -> 2/2`.

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

### Globalny system wizualny landingu
`src/index.css` zawiera obecnie:
- globalne tlo strony: radialne poswiaty `brand-blue`/sky + jasny gradient,
- `text-rendering: optimizeLegibility` i `-webkit-font-smoothing: antialiased`,
- `.surface-panel`: szklany panel z jasnym gradientem, obramowaniem i cieniem,
- `.section-shell`: wspolny shell dla duzych sekcji z delikatnym glassmorphism.

`src/components/layout/Layout.jsx` dodaje:
- subtelna siatke w tle przez fixed overlay,
- `SNTicker` z obnizona wizualna dominanta (`opacity-70`),
- brak twardego gradientu Tailwind na wrapperze, bo tlo przejeto w `body`.

### System kart
- `src/components/ui/Card.jsx` ma teraz lzejzy cien, `bg-white/82`, `backdrop-blur-xl` i hover z akcentem sky.
- `src/components/magicui/magic-card.jsx` zostal uspokojony wizualnie: gradientowe biale tlo, mniejsza agresja cienia, hover z delikatnym podniesieniem.

## 14. SEO
`src/components/seo/SeoManager.jsx`:
- ustawia runtime SEO dla `/`, `/demo`, `/polityka-prywatnosci` i 404,
- aktualizuje `title`, `description`, canonical, robots, Open Graph i Twitter Cards,
- dodaje JSON-LD `SoftwareApplication`, `Organization` i `FAQPage` na stronie glownej,
- korzysta z `VITE_SITE_URL` albo aktualnego hosta.

Vite buduje takze `demo.html`, `polityka-prywatnosci.html` i `404.html`, dzieki czemu podstawowe metadane sa dostepne dla crawlerow bez JavaScriptu. `sitemap.xml` wymaga finalnej domeny produkcyjnej.

## 15. Strona polityki prywatnosci (`/polityka-prywatnosci`)
- `src/pages/PrivacyPage.jsx`: strona prywatnosci z 10 sekcjami, w tym publiczne demo i aplikacja mobilna.
- `src/content/siteContent.js` -> klucz `privacy`: pelna tresc polityki (administrator, dane, cel, podstawa prawna, cookies, prawa, retencja, kontakt, aktualizacje).
- W stopce dodano link `Polityka prywatnosci` przez `<Link to="/polityka-prywatnosci">`.
- CookieConsent opisuje tylko faktycznie uzywana pamiec lokalna.
- Analityka i marketing sa oznaczone jako niewykorzystywane.

## 16. Loading skeleton demo
- `src/components/ui/DemoPageSkeleton.jsx`: placeholder renderowany podczas lazy-load `DemoPage` w `Suspense`.
- Wizualnie imituje strukture: hero z placeholderami + demoshell z 5 kartami dokumentow.

## 17. PWA i favicon
- `public/manifest.json`: konfiguracja PWA z `theme_color: #00aeff` oraz ikonami PNG:
  - `/android-chrome-192x192.png`
  - `/android-chrome-512x512.png`
- `index.html`: favicony ustawione na zestaw produkcyjny (`favicon.ico`, `favicon-32x32.png`, `favicon-16x16.png`, `apple-touch-icon.png`),
  plus `manifest`, `theme-color`, `apple-mobile-web-app-*` i `robots`.
- Zewnetrzne Google Fonts zostaly usuniete; strona korzysta z lokalnych fallbackow systemowych.
- Dodatkowo w `public/` znajduje sie `site.webmanifest` dostarczony z paczki favicon.

## 18. CookieConsent - aktualizacja
- `src/components/ui/CookieConsent.jsx` zapisuje tylko ustawienia niezbedne.
- Nie laduje Google Analytics, Meta Pixel ani LinkedIn Insight Tag.
- Dialog obsluguje Escape, focus, przywracanie focusu i niskie ekrany.
- Dostep do localStorage ma bezpieczny fallback.

## 19. Vercel i odswiezanie tras SPA
`vercel.json` mapuje:
- `/demo` -> `/demo.html`,
- `/polityka-prywatnosci` -> `/polityka-prywatnosci.html`,
- nieznane sciezki -> `/404.html` ze statusem HTTP 404.

Kazdy dokument uruchamia ten sam React Router, ale ma wlasne statyczne metadane.

## 20. Hero strony glownej - grafika oparta o demo
`src/components/sections/HeroSection.jsx` nie uzywa juz `PlaceholderImage` w hero.

Aktualny prawy mockup laczy:
- `DesktopAppMockup` z lista dokumentow PZ/ZK/WZ,
- `MobileAppMockup` z czesciowa kompletacja na Androidzie,
- wylacznie syntetyczne dane z `mobileDemoData.js`.

Makieta telefonu w Hero jest statyczna (`inert`, `aria-hidden`), aby nie udostepniac martwych kontrolek. Interaktywne wersje znajduja sie w sekcji Androida i na `/demo`.

## 21. Animacja startowa skanera (`LaserReveal`)
`src/components/magicui/laser-reveal.jsx`:
- generuje realistyczny kod EAN-13 w runtime,
- renderuje barcode jako SVG,
- pokazuje fizyczny modul skanera z ramka i naroznikami kadru,
- skanuje od gory do dolu,
- uzywa polprzezroczystej maski z blurrem, ktora stopniowo odslania realna strone pod spodem,
- laser korzysta z niebieskiego/cyan akcentu zgodnego z brandingiem strony,
- timing oparty o stale `SCAN_DURATION` i `OVERLAY_DISMISS_MS`.

Wazne: animacja nadal jest montowana w `Layout.jsx` i pojawia sie globalnie po wejsciu w layout.

## 22. Co zmieniac i gdzie (mapa szybka)
### Teksty marketingowe
- `src/content/siteContent.js`

### Routing
- `src/App.jsx`

### Hero strony glownej
- `src/components/sections/HeroSection.jsx`

### Globalne tlo i shell sekcji
- `src/index.css`
- `src/components/layout/Layout.jsx`

### Navbar
- `src/components/layout/Navbar.jsx`

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

### Karty i shell UI
- `src/components/ui/Card.jsx`
- `src/components/magicui/magic-card.jsx`

### Podglady gwarancji
- `public/demo-pdfs/*`

### CookieConsent
- `src/components/ui/CookieConsent.jsx`

### Loading skeleton demo
- `src/components/ui/DemoPageSkeleton.jsx`

## 23. Checklist utrzymaniowy przed release
- `npm run build` przechodzi bez bledow
- `npm run lint` przechodzi bez bledow
- `/`, `/demo` i `/polityka-prywatnosci` dzialaja po bezposrednim odswiezeniu
- nieznana sciezka korzysta z `404.html` i statusu HTTP 404 na Vercel
- modal QR otwiera sie poprawnie (bez "bialego tla")
- wyszukiwarka demo przyjmuje input i filtruje poprawnie
- placeholder w wyszukiwarce demo nie nachodzi na ikone lupy
- symbole produktow sa 4-cyfrowe i wyszukiwalne
- brak kodu symulacji blokady licencji
- strona polityki prywatnosci dostepna i linkowana z footera/cookies
- CookieConsent opisuje tylko niezbedna pamiec lokalna i linkuje do polityki
- manifest.json obecny, PWA meta poprawne
- favicony (`.ico`, 16/32 png, apple touch, android 192/512) sa podlinkowane i widoczne
- DemoPage loading skeleton wyswietla sie podczas lazy-load
- animacja startowa skanera (LaserReveal) pokazuje kod EAN, skanuje od gory do dolu i odslania strone przez polprzezroczysta maske
- hero strony glownej pokazuje statyczne makiety web + Android z danymi DEMO
- interaktywna kompletacja mobilna zachowuje stan po zmianie zakladki demo
- w publicznych assetach nie ma plikow z `Android_Foto`
- navbar, karty i sekcje zachowuja spojny styl glass/surface

## 24. Najwazniejsze pliki do zapamietania (TOP 15)
1. `src/content/siteContent.js`
2. `src/pages/HomePage.jsx`
3. `src/components/sections/HeroSection.jsx`
4. `src/pages/DemoPage.jsx`
5. `src/pages/PrivacyPage.jsx`
6. `src/features/demo/DemoAppShell.jsx`
7. `src/features/demo/demo.css`
8. `src/features/demo/standalone/App.jsx`
9. `src/features/demo/standalone/api.js`
10. `src/features/demo/standalone/demoData.js`
11. `src/components/layout/Navbar.jsx`
12. `src/components/layout/Footer.jsx`
13. `src/components/ui/CookieConsent.jsx`
14. `src/components/seo/SeoManager.jsx`
15. `src/components/magicui/laser-reveal.jsx`

## 25. Ostatnie zmiany UI (2026-08-01)
- Odwiezone globalne tlo landingu: radialne poswiaty, jasny gradient, subtelna siatka i mniej dominujacy `SNTicker`.
- Dodano klasy `surface-panel` i `section-shell` w `src/index.css`.
- Navbar zostal przebudowany na pill-navigation z jasnym tlem, mniejszym logo i CTA w kolorze `brand-blue`.
- Karty `Card` i `MagicCard` maja lzejsze cienie, glassmorphism i spokojniejszy hover.
- `HeroSection` ma nowy prawy mockup oparty o realny UI demo (`DocumentList`, statusy PZ/ZK/WZ, progress SN, `SerialEntry`, barcode).
- `SolutionSection`, `PricingSection` i `FinalCTASection` zostaly dopasowane do nowego systemu paneli.
- `LaserReveal` zostal przebudowany na jasna animacje skanowania od gory do dolu z przenikaniem strony pod spodem.
- Dodano prezentacje aplikacji Android, kompletacji i dwoch trybow skanowania.
- Dodano lokalne mobilne demo ze scenariuszami poprawnego skanu, duplikatu, nieznanego kodu, braku i notatki.
- Cena 300 zl netto miesiecznie obejmuje panel webowy, aplikacje Android, numery SN i kompletacje; osobno wyceniane sa prace wdrozeniowe.
- Dodano route-specific HTML, poprawne 404, prywatnosc zgodna z kodem oraz lazy loading obnizajacy glowny bundle.

---
Dokument zaktualizowany: 2026-08-01 (CEST).
