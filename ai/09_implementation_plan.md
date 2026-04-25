# Plan implementacji strony React: Partner Numery Seryjne

Ten dokument opisuje praktyczny plan wdrożenia landing page małymi krokami. Zakłada osobną aplikację w `landing/`, brak zależności od obecnej aplikacji produkcyjnej oraz placeholderową podstronę `/demo`.

## 1. Zasady pracy
- implementować iteracyjnie, małymi krokami
- nie próbować budować wszystkiego w jednym etapie
- po każdym etapie sprawdzić spójność z briefem i architekturą
- nie korzystać z plików istniejącej aplikacji produkcyjnej
- nie wychodzić poza zakres marketingowego landing page

## 2. Etap 1: inicjalizacja aplikacji
Cel:
uruchomić czysty projekt w `landing/` i przygotować minimalne ramy aplikacji.

Zakres:
- utworzenie projektu Vite React w katalogu `landing/`
- instalacja `react-router-dom`, `tailwindcss`, `postcss`, `autoprefixer`, `lucide-react`
- konfiguracja Tailwind CSS
- konfiguracja podstawowego routingu
- utworzenie `App.jsx`, `main.jsx`, `HomePage.jsx`, `DemoPage.jsx`
- dodanie prostego `Layout`, `Navbar`, `Footer`

Definition of done:
- aplikacja uruchamia się lokalnie
- istnieją routy `/` i `/demo`
- strona główna i `/demo` renderują placeholderowy widok
- `npm run build` przechodzi bez błędów na tym etapie

## 3. Etap 2: warstwa contentu
Cel:
przenieść całe wymagane copy do jednego źródła danych.

Zakres:
- utworzenie `src/content/siteContent.js`
- wpisanie treści z briefu do jednej struktury danych
- wpisanie danych SEO
- wpisanie treści dla `/demo`
- wpisanie tekstów formularza i komunikatów sukcesu

Definition of done:
- wszystkie sekcje mają przygotowane dane wejściowe
- nie ma potrzeby wpisywania copy ręcznie bezpośrednio w sekcjach
- dane są czytelne i logicznie uporządkowane

## 4. Etap 3: komponenty UI
Cel:
zbudować podstawowy zestaw komponentów potrzebnych do składania strony.

Zakres:
- `Button`
- `Card`
- `SectionHeading`
- `Accordion`
- `PlaceholderImage`
- `ContactForm` w wersji bazowej

Definition of done:
- komponenty są gotowe do użycia przez sekcje
- komponenty mają prosty, spójny styl
- brak nadmiarowej abstrakcji

## 5. Etap 4: struktura strony głównej
Cel:
złożyć kompletny szkielet strony głównej ze wszystkich sekcji.

Zakres:
- utworzenie wszystkich sekcji z briefu
- renderowanie ich w `HomePage.jsx`
- podłączenie danych z `siteContent.js`
- dodanie anchorów dla nawigacji

Definition of done:
- strona główna renderuje pełną kolejność sekcji
- każda sekcja pobiera treść z warstwy danych
- nawigacja prowadzi do odpowiednich sekcji

## 6. Etap 5: stylowanie i hierarchia wizualna
Cel:
przekształcić surowy szkielet w profesjonalny landing page B2B.

Zakres:
- dopracowanie hero
- dopracowanie karty cenowej
- dopracowanie layoutu kart problemów, benefitów i feature'ów
- dopracowanie sekcji bezpieczeństwa, wdrożenia i zaufania
- dodanie spójnej siatki odstępów i typografii

Wymagania jakościowe:
- cena `300 zł netto / miesiąc` musi być bardzo dobrze widoczna
- CTA muszą być czytelne i powtarzalne
- placeholdery mają wyglądać estetycznie
- całość ma sprawiać wrażenie narzędzia B2B, nie generycznego szablonu

Definition of done:
- strona jest spójna wizualnie
- hierarchia treści jest czytelna
- główne sekcje są gotowe do dalszego refinementu

## 7. Etap 6: podstrona `/demo`
Cel:
wdrożyć estetyczną stronę placeholderową zapowiadającą przyszłe demo.

Zakres:
- nagłówek i opis
- 4-5 placeholderów przyszłych ekranów
- CTA powrotu na stronę główną lub do kontaktu
- spójny wygląd z resztą landing page

Definition of done:
- `/demo` istnieje jako pełna, czytelna podstrona
- nie udaje prawdziwego demo produktu
- wspiera sprzedażowy przepływ strony

## 8. Etap 7: formularz kontaktowy
Cel:
wdrożyć mockowany formularz gotowy do późniejszego podpięcia backendu.

Zakres:
- pola: imię i nazwisko, email, telefon, NIP firmy, wiadomość
- walidacja wymaganych pól
- walidacja formatu email
- podstawowa walidacja NIP
- stany: `idle`, `submitting`, `success`

Definition of done:
- formularz działa bez backendu
- użytkownik widzi błędy pól
- sukces jest komunikowany estetycznie
- implementacja pozwala łatwo podmienić mock na API

## 9. Etap 8: responsywność
Cel:
zapewnić wygodne działanie strony na mobile, tabletach i desktopie.

Punkty kontrolne:
- hero nie łamie układu na małych szerokościach
- przyciski CTA są wygodne na mobile
- karty układają się w jedną kolumnę na małych ekranach
- navbar działa na telefonach
- FAQ ma wygodny obszar klikalny
- formularz pozostaje czytelny na 320 px

Definition of done:
- strona jest czytelna od 320 px wzwyż
- nie ma sekcji psujących układ mobilny

## 10. Etap 9: SEO i finalne szlify
Cel:
domknąć stronę pod kątem publikacji i jakości końcowej.

Zakres:
- `title`
- `meta description`
- podstawowe Open Graph
- jeden `h1`
- poprawne `alt`
- usunięcie nieużywanych importów i kodu pomocniczego

Definition of done:
- podstawowe SEO jest wdrożone
- kod jest czysty
- produkcyjny build przechodzi poprawnie

## 11. Kryteria jakości
Implementacja jest poprawna tylko wtedy, gdy spełnia wszystkie warunki:
- nie używa zmyślonych testimoniali ani logotypów klientów
- nie używa słowa `certyfikowany`
- nie używa słowa `nakładka`
- nie obiecuje sztywnego czasu wdrożenia
- nie ukrywa ceny
- nie korzysta z obecnej aplikacji jako źródła gotowych komponentów

## 12. Checklist przed startem implementacji
- [ ] Potwierdzono, że source of truth stanowią wyłącznie `07`, `08` i `09`
- [ ] Potwierdzono lokalizację aplikacji: `landing/`
- [ ] Potwierdzono, że `/demo` jest placeholder page
- [ ] Potwierdzono, że formularz pozostaje mockowany
- [ ] Potwierdzono, że treści z briefu są finalnym copy dla pierwszej wersji

## 13. Checklist po zakończeniu implementacji
- [ ] `npm run build` działa poprawnie
- [ ] strona główna ma wszystkie wymagane sekcje
- [ ] `/demo` istnieje jako placeholder page
- [ ] formularz waliduje dane i pokazuje sukces
- [ ] cena jest wyeksponowana
- [ ] strona działa poprawnie na mobile i desktopie
- [ ] wszystkie treści pochodzą z warstwy danych
- [ ] kod jest gotowy do kolejnej iteracji lub refinementu

## 14. Zalecany sposób prowadzenia implementacji przez AI lub developera
Najlepszy tryb pracy:
1. wykonać tylko jeden etap naraz
2. po etapie podać listę zmienionych plików
3. sprawdzić build lub spójność techniczną
4. dopiero potem przejść do kolejnego etapu

Nie zaleca się:
- budowy całego landing page w jednym promptcie
- mieszania implementacji landing page z przyszłym demo
- jednoczesnego dopracowywania architektury, copy, UI i formularza w jednym kroku
