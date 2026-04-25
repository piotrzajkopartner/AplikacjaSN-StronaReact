# Architektura projektu React: Partner Numery Seryjne

Ten dokument opisuje docelową strukturę osobnej aplikacji landing page w katalogu `landing/`. Architektura ma być możliwie prosta, wdrażalna od razu i zgodna z briefem `07_website_build_brief.md`.

## 1. Założenia architektoniczne
- aplikacja powstaje jako osobny frontend w katalogu `landing/`
- technologia: React + Vite + React Router + Tailwind CSS
- treści są statyczne i trzymane lokalnie w kodzie
- cała warstwa contentowa ma pochodzić z jednego pliku danych, aby uprościć pierwszą implementację
- `/demo` istnieje jako placeholder page, nie jako prawdziwe demo produktu
- nie należy tworzyć nadmiarowej liczby warstw abstrakcji na starcie

## 2. Struktura katalogów

```text
/landing
├── /public
│   ├── /images
│   │   ├── /demo
│   │   └── /placeholders
│   └── favicon.ico
├── /src
│   ├── /components
│   │   ├── /layout
│   │   │   ├── Layout.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── Footer.jsx
│   │   ├── /sections
│   │   │   ├── HeroSection.jsx
│   │   │   ├── ProblemSection.jsx
│   │   │   ├── SolutionSection.jsx
│   │   │   ├── DemoPreviewSection.jsx
│   │   │   ├── BenefitsGridSection.jsx
│   │   │   ├── FeaturesSection.jsx
│   │   │   ├── PricingSection.jsx
│   │   │   ├── DeploymentSection.jsx
│   │   │   ├── SecuritySection.jsx
│   │   │   ├── PartnerNetTrustSection.jsx
│   │   │   ├── FAQSection.jsx
│   │   │   └── FinalCTASection.jsx
│   │   └── /ui
│   │       ├── Button.jsx
│   │       ├── Card.jsx
│   │       ├── SectionHeading.jsx
│   │       ├── Accordion.jsx
│   │       ├── ContactForm.jsx
│   │       └── PlaceholderImage.jsx
│   ├── /content
│   │   └── siteContent.js
│   ├── /pages
│   │   ├── HomePage.jsx
│   │   └── DemoPage.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

## 3. Uzasadnienie uproszczenia
W pierwszej wersji nie rozbijamy treści na wiele plików typu `faq.js`, `pricing.js`, `contact.js`, ponieważ:
- zwiększa to liczbę plików bez realnej potrzeby biznesowej na starcie
- utrudnia szybkie wdrożenie i przegląd całości copy
- dla landing page w pierwszym etapie jeden plik `siteContent.js` jest wystarczający i bardziej praktyczny

Jeżeli w przyszłości pojawi się potrzeba rozbudowy strony lub tłumaczeń językowych, plik można podzielić.

## 4. Komponenty layoutu
- `Layout`
  - główny wrapper aplikacji
  - renderuje `Navbar`, zawartość strony i `Footer`

- `Navbar`
  - sticky navbar
  - logo lub placeholder logo
  - linki do sekcji strony głównej
  - CTA prowadzące do sekcji kontaktowej
  - wersja mobilna z prostym menu

- `Footer`
  - nazwa Partner-Net
  - podstawowy opis
  - linki pomocnicze lub anchor links
  - miejsce na dane kontaktowe, jeśli zostaną później uzupełnione

## 5. Komponenty UI
- `Button`
  - warianty minimum: `primary`, `secondary`, `ghost`
  - obsługa `to`, `href` albo `onClick` według potrzeby implementacyjnej

- `Card`
  - uniwersalna karta dla problemów, benefitów, feature'ów i bloków informacyjnych

- `SectionHeading`
  - wspólny komponent nagłówkowy dla sekcji
  - propsy: `eyebrow`, `title`, `description`, opcjonalnie `align`

- `Accordion`
  - prosty komponent FAQ
  - kontrola otwartej pozycji

- `ContactForm`
  - formularz mockowany
  - obsługuje walidację i stany wysyłki

- `PlaceholderImage`
  - estetyczny blok zastępujący brakujące assety
  - używany w hero, preview demo i na `/demo`

## 6. Komponenty sekcyjne
Na stronie głównej mają istnieć dokładnie następujące sekcje:
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

Każda z nich powinna pobierać dane z `siteContent.js`, a nie zawierać twardo wpisanego copy w JSX.

## 7. Struktura widoków

### `HomePage.jsx`
Składa stronę główną z sekcji w kolejności z briefu.

### `DemoPage.jsx`
Ma być prostą stroną placeholderową zawierającą:
- nagłówek
- krótki opis przyszłego demo
- listę placeholderów ekranów
- CTA powrotu lub kontaktu

## 8. Struktura danych `siteContent.js`
Plik powinien zawierać spójną, czytelną strukturę danych dla całej strony.

Minimalny kształt:

```js
export const siteContent = {
  seo: {},
  navigation: {},
  hero: {},
  problems: {},
  solution: {},
  demoPreview: {},
  benefits: {},
  features: {},
  pricing: {},
  deployment: {},
  security: {},
  trust: {},
  faq: {},
  contact: {},
  demoPage: {},
  footer: {},
};
```

Wewnątrz powinny znaleźć się:
- teksty sekcji
- listy kart i bulletów
- etykiety przycisków
- dane dla placeholderów
- komunikaty formularza
- dane SEO

## 9. Routing
Wymagane ścieżki:
- `/` -> `HomePage`
- `/demo` -> `DemoPage`

W tej wersji projektu nie przewiduje się dodatkowych podstron.

## 10. Zasady implementacyjne
- nie dodawać nadmiarowych bibliotek bez uzasadnienia
- nie rozbudowywać architektury ponad potrzeby pierwszej wersji
- nie używać obecnego `client/` jako źródła layoutu, komponentów ani routingu
- unikać hardcode'owania copy bezpośrednio w sekcjach
- preferować małe, czytelne komponenty zamiast zbyt ogólnego systemu designowego

## 11. Gotowość architektury
Architektura jest poprawna, jeśli:
- pozwala zbudować całą stronę z jednego źródła contentu
- jest czytelna dla kolejnych iteracji
- nie wymaga przepisywania przy dodaniu prawdziwego demo w osobnej aplikacji
- oddziela landing marketingowy od właściwego produktu
