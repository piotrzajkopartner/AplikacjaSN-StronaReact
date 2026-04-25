# Dokumentacja techniczna aplikacji landing page

## 1. Cel dokumentu
Ten dokument jest praktycznym przewodnikiem utrzymaniowym projektu landing page "Partner Numery Seryjne".
Ma pozwolić szybko odtworzyc w pamieci:
- jak aplikacja jest zbudowana,
- gdzie znajduja sie poszczegolne elementy,
- jak dziala routing, formularz i warstwa contentu,
- co i gdzie zmieniac przy kolejnych iteracjach.

## 2. Szybki start

### Wymagania
- Node.js (zalecane aktualne LTS)
- npm

### Komendy
- instalacja zaleznosci:

```bash
npm install
```

- tryb developerski:

```bash
npm run dev
```

- build produkcyjny:

```bash
npm run build
```

- podglad buildu:

```bash
npm run preview
```

## 3. Stack technologiczny
- React 19
- Vite 8
- React Router DOM 7
- Tailwind CSS 3 + PostCSS + Autoprefixer
- lucide-react (zainstalowane; obecnie brak aktywnego uzycia)

Pliki konfiguracyjne:
- `package.json`
- `vite.config.js`
- `tailwind.config.js`
- `postcss.config.js`
- `src/index.css`

## 4. Architektura wysokiego poziomu
Aplikacja jest jedną aplikacją frontendową SPA opartą o routing po stronie klienta.

Wejscie aplikacji:
- `src/main.jsx`:
  - podpiecie `BrowserRouter`
  - render `App`

Routing:
- `src/App.jsx`
  - `/` -> `HomePage`
  - `/demo` -> `DemoPage`
  - oba widoki osadzone w `Layout`

Szkielet strony:
- `src/components/layout/Layout.jsx`
  - `Navbar`
  - `Outlet` (wstrzykiwany widok strony)
  - `Footer`

## 5. Struktura katalogów (aktualna)

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
├── components/
│   ├── layout/
│   │   ├── Layout.jsx
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   ├── sections/
│   │   ├── HeroSection.jsx
│   │   ├── ProblemSection.jsx
│   │   ├── SolutionSection.jsx
│   │   ├── DemoPreviewSection.jsx
│   │   ├── BenefitsGridSection.jsx
│   │   ├── FeaturesSection.jsx
│   │   ├── PricingSection.jsx
│   │   ├── DeploymentSection.jsx
│   │   ├── SecuritySection.jsx
│   │   ├── PartnerNetTrustSection.jsx
│   │   ├── FAQSection.jsx
│   │   └── FinalCTASection.jsx
│   └── ui/
│       ├── Button.jsx
│       ├── Card.jsx
│       ├── SectionHeading.jsx
│       ├── Accordion.jsx
│       ├── PlaceholderImage.jsx
│       └── ContactForm.jsx
```

## 6. Warstwa danych (najwazniejszy punkt utrzymaniowy)

### Jedno zrodlo prawdy
Wszystkie tresci strony sa trzymane w:
- `src/content/siteContent.js`

To obejmuje:
- copy sekcji strony glownej,
- tresci strony `/demo`,
- konfiguracje nawigacji i stopki,
- dane formularza kontaktowego,
- komunikaty walidacyjne i success,
- dane SEO i Open Graph.

### Aktualny ksztalt obiektu
Główne klucze:
- `seo`
- `navigation`
- `hero`
- `problems`
- `solution`
- `demoPreview`
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

### Zasada
Zmiany tresci marketingowych wykonuj najpierw w `siteContent.js`, a dopiero potem ewentualnie w strukturze komponentow.

## 7. Strona glowna (`/`) - skladanie sekcji
`src/pages/HomePage.jsx` składa sekcje dokładnie w tej kolejnosci:
1. `HeroSection`
2. `ProblemSection`
3. `SolutionSection`
4. `DemoPreviewSection`
5. `BenefitsGridSection`
6. `FeaturesSection`
7. `PricingSection`
8. `DeploymentSection`
9. `SecuritySection`
10. `PartnerNetTrustSection`
11. `FAQSection`
12. `FinalCTASection`

Kazda sekcja dostaje dane przez prop `content` z `siteContent`.

## 8. Anchory i nawigacja

### Anchory sekcji (id)
- Problem: `#problem`
- Rozwiazanie: `#rozwiazanie`
- Korzysci: `#korzysci`
- Funkcje: `#funkcje`
- Cena: `#cena`
- Kontakt: `#kontakt`

### Gdzie to jest ustawione
- konfiguracja linkow: `siteContent.navigation.links`
- render i obsluga linkow: `src/components/layout/Navbar.jsx`

Navbar ma logikę dla dwóch kontekstów:
- gdy jestes na `/`: linkuje bezposrednio do `#anchor`
- gdy jestes na innej stronie (np. `/demo`): linkuje do `/#anchor`

## 9. Strona `/demo`
`src/pages/DemoPage.jsx` jest placeholderem (nie realnym demo).

Co zawiera:
- hero placeholder z opisem,
- wyjasnienie zakresu przyszlego demo,
- CTA: powrot na glowna + przejscie do kontaktu,
- siatke placeholderow ekranow opartych o `siteContent.demoPage.placeholders`.

Dane tej strony sa pobierane z:
- `siteContent.demoPage`

## 10. Komponenty UI - odpowiedzialnosci

### `Button.jsx`
- wspiera trzy tryby:
  - `to` -> React Router `<Link>`
  - `href` -> `<a>`
  - brak powyzszych -> `<button>`
- warianty: `primary`, `secondary`, `ghost`
- obsluguje `disabled`

### `Card.jsx`
- uniwersalny kontener kart
- parametr `as` pozwala zmienic znacznik wrappera (`article`, `div`, itp.)

### `SectionHeading.jsx`
- standaryzuje naglowki sekcji
- propsy: `eyebrow`, `title`, `description`, `align`, `className`

### `Accordion.jsx`
- wykorzystywany w FAQ
- jeden aktywny element naraz
- opcjonalne zapadanie aktywnego elementu (`allowCollapse`)

### `PlaceholderImage.jsx`
- estetyczny placeholder assetow
- ARIA: `role="img"`, `aria-label`
- mozliwa kontrola proporcji przez `ratio`

### `ContactForm.jsx`
- mockowany formularz kontaktowy
- walidacje i stany formularza
- gotowosc pod podmiane mocka na API

## 11. Formularz kontaktowy - logika i stany
Plik:
- `src/components/ui/ContactForm.jsx`

### Pola
- `fullName`
- `email`
- `phone`
- `taxId`
- `message`

### Walidacja
- wymagane pola wg `content.fields[*].required`
- email: regex `emailRegex`
- NIP: regex `^\d{10}$`
- NIP jest normalizowany do samych cyfr (`normalizeTaxId`)

### Kiedy walidacja jest uruchamiana
- na `blur` pojedynczego pola
- na submit calego formularza

### Stany formularza
- `idle`
- `submitting`
- `success`

Źrodlo nazw stanów:
- `content.states` (z fallbackiem na literalne wartosci)

### Mock submit
- lokalna funkcja `mockSubmit()` (timeout 900 ms)
- miejsce do podmiany na realny request API

### Co dzieje sie po sukcesie
- renderowany jest blok success + przycisk resetu
- reset przywraca formularz do stanu `idle`

## 12. Stylowanie i design system (lekki)
- Tailwind utility classes bez rozbudowanego design-systemu tokenowego
- globalne style bazowe: `src/index.css`
- kierunek wizualny:
  - profesjonalny B2B
  - granat / niebieski jako baza
  - zielony akcent dla "success/value"
  - jasne tla i czytelna hierarchia sekcji

## 13. Co zmienic i gdzie (mapa szybkich zmian)

### Zmiana tresci marketingowych
- `src/content/siteContent.js`

### Zmiana kolejnosci sekcji na homepage
- `src/pages/HomePage.jsx`

### Dodanie nowej sekcji
1. dodaj komponent w `src/components/sections/`
2. dodaj dane do `siteContent.js`
3. podlacz sekcje w `HomePage.jsx`
4. opcjonalnie dodaj anchor do navbara (`siteContent.navigation.links` + `id` sekcji)

### Zmiana stylu przyciskow globalnie
- `src/components/ui/Button.jsx`

### Zmiana wygladu kart globalnie
- `src/components/ui/Card.jsx`

### Zmiana placeholderow grafik
- `src/components/ui/PlaceholderImage.jsx`
- tresci placeholderow: `siteContent.js`

### Zmiana logiki formularza
- `src/components/ui/ContactForm.jsx`

### Zmiana tras
- `src/App.jsx`

## 14. Jak podpiac prawdziwe API formularza (plan techniczny)
W `ContactForm.jsx`:
1. zastap `mockSubmit()` wywolaniem `fetch/axios`.
2. przenies mapowanie payloadu do osobnej funkcji (np. `buildContactPayload(values)`).
3. obsluz bledy API (stan `error` jako rozszerzenie obecnego modelu).
4. dodaj retry + timeout + komunikat techniczny.
5. opcjonalnie wydziel logike do hooka `useContactForm`.

Minimalny punkt podmiany jest juz przygotowany:
- funkcja `mockSubmit` w `handleSubmit`.

## 15. SEO - aktualny stan
Dane SEO sa przygotowane w `siteContent.seo` (`title`, `description`, `og`).
Obecnie dane istnieja jako warstwa danych i stanowia gotowy punkt pod dalsze wdrozenie meta tagow runtime/build-time.

## 16. Znane ograniczenia i uwagi
- aplikacja jest SPA; anchory dzialaja przez klasyczne `href`.
- brak backendu formularza (celowo; tryb mock).
- `lucide-react` jest zainstalowane, ale na teraz nieuzywane.
- nie wszystkie elementy mobile navbara maja pełne menu sekcyjne (intencjonalne uproszczenie obecnego etapu).

## 17. Checklist utrzymaniowy przed release
- `npm run build` przechodzi bez bledow
- cena `300 zł netto / miesiąc` jest wyraznie widoczna
- `/demo` pozostaje placeholderem (bez fake interaktywnosci produktu)
- formularz dziala w trybie mock i waliduje wejscie
- tresci pochodza z `siteContent.js`
- brak tresci zabronionych (zmyslone logotypy klientów, fałszywe testimoniale, itp.)

## 18. Najwazniejsze pliki do zapamietania (TOP 10)
1. `src/content/siteContent.js` - wszystkie tresci i konfiguracja
2. `src/pages/HomePage.jsx` - skladanie calego landing page
3. `src/pages/DemoPage.jsx` - placeholder `/demo`
4. `src/components/ui/ContactForm.jsx` - logika formularza
5. `src/components/layout/Navbar.jsx` - nawigacja i anchory
6. `src/components/sections/PricingSection.jsx` - ekspozycja ceny
7. `src/components/sections/HeroSection.jsx` - główny przekaz i CTA
8. `src/App.jsx` - routing
9. `src/main.jsx` - bootstrap aplikacji
10. `src/index.css` - globalne style bazowe

---
Dokument odzwierciedla aktualny stan implementacji i jest przeznaczony jako szybka mapa orientacyjna dla kolejnych iteracji rozwoju projektu.
