# Brief budowy strony: Partner Numery Seryjne

## 1. Cel projektu
Stworzenie profesjonalnego, nowoczesnego i wiarygodnego landing page'a B2B dla modułu "Partner Numery Seryjne". Strona ma komunikować wartość biznesową rozwiązania dla firm pracujących na Subiekt nexo PRO i kierować użytkownika do kontaktu w sprawie prezentacji oraz wdrożenia.

Ten dokument jest nadrzędnym źródłem prawdy dla implementacji landing page. Jeśli późniejsze dokumenty zawierają uproszczenia lub przykłady, należy interpretować je zgodnie z tym briefem.

## 2. Zakres projektu
Zakres bieżącego etapu obejmuje wyłącznie marketingowy landing page jako osobną aplikację frontendową.

W zakresie:
- osobna aplikacja React w katalogu `landing/`
- strona główna `/`
- tymczasowa podstrona `/demo` jako placeholder przyszłego interaktywnego demo
- statyczne treści i statyczne dane
- formularz kontaktowy działający w trybie mockowanym
- placeholdery assetów tam, gdzie nie ma jeszcze finalnych materiałów

Poza zakresem:
- integracja z obecną aplikacją produkcyjną
- analiza lub wykorzystanie kodu istniejącego `client/`
- budowa właściwego interaktywnego demo produktu
- backend formularza kontaktowego
- integracja z CRM, systemem ticketowym, Resend, Formspree lub innym API

## 3. Decyzje architektoniczne
- Landing page powstaje jako osobna aplikacja React w katalogu `landing/`.
- Implementacja ma opierać się wyłącznie na plikach `07_website_build_brief.md`, `08_react_project_structure.md` i `09_implementation_plan.md`.
- Nie należy analizować ani wykorzystywać plików istniejącej aplikacji produkcyjnej.
- Podstrona `/demo` ma istnieć już teraz, ale tylko jako estetyczna strona zapowiadająca przyszłe demo.
- Przyszłe demo będzie osobną aplikacją, z osobnym zakresem i ze sztywno wpisanymi danymi, których użytkownik nie zmienia.
- Wszystkie treści landing page mają być statyczne i utrzymywane lokalnie w kodzie aplikacji.
- Formularz kontaktowy ma być przygotowany pod późniejsze podpięcie API, ale obecnie działa jako mock.

## 4. Grupa docelowa
- właściciele firm dystrybucyjnych B2B i B2C
- dyrektorzy logistyki i kierownicy magazynów
- szefowie serwisów oraz działów reklamacji RMA
- firmy korzystające z Subiekt nexo PRO i pracujące na towarach z numerami seryjnymi, np. IT, elektronika, sprzęt sieciowy, urządzenia specjalistyczne

## 5. Technologia
- framework: React + Vite
- routing: React Router
- style: Tailwind CSS
- podejście: mobile-first
- architektura: komponentowa, z wydzieloną warstwą danych do pliku konfiguracyjnego
- hosting i deploy nie są częścią tego etapu, ale kod ma być gotowy do produkcyjnego builda

## 6. Struktura strony
Landing page ma zawierać:
- stronę główną `/`
- placeholder page `/demo`

Strona główna ma prowadzić użytkownika przez logiczny ciąg:
1. problem
2. rozwiązanie
3. korzyści
4. funkcje
5. cena i model współpracy
6. bezpieczeństwo i wdrożenie
7. kontakt

## 7. Sekcje strony głównej
Strona główna ma składać się z następujących sekcji, w tej kolejności:
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

## 8. Finalne treści do implementacji
Poniższe treści są docelowym copy dla pierwszej wersji landing page i mają zostać osadzone w aplikacji. Jeśli w implementacji zajdzie potrzeba technicznego skrócenia tekstu w pojedynczym miejscu, sens i ton wypowiedzi muszą zostać zachowane.

### 8.1 HeroSection
- badge: `Moduł B2B dla Subiekt nexo PRO`
- headline: `Zlikwiduj błędy w kompletacji i zablokuj straty na numerach seryjnych.`
- body: `Uzbrój swój magazyn w mechanizm Poka-Yoke dla Subiekt nexo PRO. Ogranicz pomyłki kompletacyjne, przyspiesz weryfikację historii urządzeń i zautomatyzuj przygotowanie kart gwarancyjnych.`
- pricing note: `Stały abonament 300 zł netto miesięcznie. Brak limitów stanowisk po stronie licencji.`
- primary CTA: `Umów prezentację`
- secondary CTA: `Zobacz demo`
- supporting note: `Instalacja on-premise. Wdrożenie po stronie Partner-Net. 14 dni testów.`

### 8.2 ProblemSection
- subheadline: `Ukryte koszty błędu`
- headline: `Skanujesz towar, czy nadal tracisz czas na ręczne procedury?`
- intro: `Błędy przy pracy z numerami seryjnymi przekładają się na realne koszty operacyjne. Landing page ma jasno pokazać, że problem dotyczy logistyki, serwisu i pracy biura jednocześnie.`
- cards:
  - `Nieuzasadnione reklamacje` - `Zespół traci czas na ręczne sprawdzanie historii urządzenia i ryzykuje obsługę sprzętu spoza własnej dystrybucji.`
  - `Błędy kompletacyjne` - `Przy dużym tempie pracy łatwo wydać niewłaściwy egzemplarz, zdublować sprzęt albo wysłać inną rewizję produktu.`
  - `Ręczna obsługa dokumentów` - `Handlowcy i pracownicy biura tracą czas na wyszukiwanie numerów seryjnych i przygotowywanie dokumentów gwarancyjnych.`

### 8.3 SolutionSection
- subheadline: `Cyfrowy asystent logistyki`
- headline: `Skanujesz i wiesz. Reszta robi się sama.`
- body: `System działa przez przeglądarkę i wspiera pracę na komputerze, tablecie lub telefonie. Pomaga ograniczać błędy przy kompletacji, porządkuje historię numerów seryjnych i wspiera pracę zespołów magazynowych, handlowych oraz serwisowych.`

### 8.4 DemoPreviewSection
- subheadline: `Podgląd działania`
- headline: `Zobacz, jak wygląda praca z systemem w praktyce.`
- body: `W tej wersji strony sekcja demo ma pokazywać kierunek rozwiązania i zapowiadać przyszłą, osobną aplikację demo. Na tym etapie stosujemy placeholdery dla widoków i materiałów.`
- CTA: `Przejdź do podglądu demo`

### 8.5 BenefitsGridSection
- subheadline: `Zwrot z inwestycji`
- headline: `Korzyści, które widać w codziennej pracy operacyjnej.`
- cards:
  - `Mniej pomyłek przy wydaniu` - `System pomaga ograniczać ryzyko błędnych wydań i duplikatów numerów seryjnych.`
  - `Szybsza weryfikacja reklamacji` - `Historia urządzenia jest łatwiej dostępna, co usprawnia pracę działu serwisu i reklamacji.`
  - `Mniej pracy ręcznej` - `Zespół nie musi ręcznie przygotowywać całego obiegu informacji wokół numerów seryjnych i dokumentów.`
  - `Większa przejrzystość procesu` - `Firma szybciej widzi status operacji i łatwiej porządkuje odpowiedzialność za proces.`

### 8.6 FeaturesSection
- subheadline: `Najważniejsze możliwości`
- headline: `Funkcje, które wspierają kontrolę procesu.`
- items:
  - `Kontrola duplikatów numerów seryjnych`
  - `Mechanizm blokowania równoczesnej edycji dokumentu`
  - `Wyszukiwanie historii urządzenia`
  - `Obsługa kart gwarancyjnych i dokumentów powiązanych z procesem`
  - `Podejście on-premise i odseparowanie od warstwy operacyjnej ERP`

### 8.7 PricingSection
- subheadline: `Prosty model licencyjny`
- headline: `300 zł netto miesięcznie. Bez limitów po stronie licencji.`
- body: `Model cenowy ma być pokazany jasno i bez ukrywania podstawowej ceny. Koszt wdrożenia jest ustalany osobno po krótkiej analizie środowiska klienta.`
- bullets:
  - `Brak limitów użytkowników i stanowisk po stronie licencji`
  - `Brak limitów liczby procesowanych dokumentów`
  - `Brak limitów liczby zapisywanych numerów seryjnych`
  - `14-dniowa licencja testowa`
- note: `Koszt i zakres wdrożenia ustalany są osobno po krótkiej analizie środowiska.`

### 8.8 DeploymentSection
- subheadline: `Wdrożenie`
- headline: `Bezkolizyjne uruchomienie w środowisku klienta.`
- body 1: `Aplikacja jest wdrażana po stronie Partner-Net i uruchamiana tak, aby nie mieszać warstwy marketingowej z obecną aplikacją operacyjną klienta.`
- body 2: `Na stronie nie należy obiecywać sztywnego czasu wdrożenia. Komunikat ma podkreślać bezpieczeństwo procesu, dopasowanie do środowiska i krótkie szkolenie użytkowników.`

### 8.9 SecuritySection
- subheadline: `Bezpieczeństwo`
- headline: `Działa obok Subiekta. Dane pozostają w środowisku klienta.`
- body 1: `Komunikacja bezpieczeństwa ma być zrozumiała dla biznesu. Strona ma wyjaśniać, że rozwiązanie nie ma ingerować w księgowość ani operacje magazynowe klienta.`
- body 2: `Landing page ma podkreślać on-premise, odseparowanie danych i ostrożne podejście do integracji.`

### 8.10 PartnerNetTrustSection
- subheadline: `O dostawcy`
- headline: `Za rozwiązaniem stoi Partner-Net.`
- body 1: `Sekcja ma budować zaufanie do dostawcy znającego środowisko B2B, logistykę, pracę z numerami seryjnymi i wdrożenia w firmach korzystających z Subiekt nexo PRO.`
- body 2: `Nie należy dodawać zmyślonych klientów, opinii ani logotypów. Jeśli nie ma finalnego logo, należy użyć estetycznego placeholdera.`

### 8.11 FAQSection
- subheadline: `Najczęstsze pytania`
- headline: `Konkretne odpowiedzi na najważniejsze wątpliwości.`
- items:
  - pytanie: `Ile kosztuje system?`
    odpowiedź: `Abonament wynosi 300 zł netto miesięcznie. Koszt i zakres wdrożenia ustalany są osobno po krótkiej analizie środowiska.`
  - pytanie: `Czy są limity użytkowników lub stanowisk?`
    odpowiedź: `Nie. Po stronie licencji nie przewidziano limitów użytkowników ani stanowisk.`
  - pytanie: `Gdzie instalowana jest aplikacja?`
    odpowiedź: `Rozwiązanie jest wdrażane on-premise, w środowisku klienta.`
  - pytanie: `Czy muszę instalować coś na każdym komputerze?`
    odpowiedź: `Nie. Interfejs jest dostępny przez przeglądarkę.`
  - pytanie: `Czy mogę zobaczyć demo?`
    odpowiedź: `Tak. W tej wersji landing page podstrona demo jest placeholderem zapowiadającym przyszłe, osobne demo produktu.`
  - pytanie: `Czy mogę przetestować system?`
    odpowiedź: `Tak. Dostępna jest 14-dniowa licencja testowa.`

### 8.12 FinalCTASection
- subheadline: `Kontakt`
- headline: `Umów prezentację i zobacz, jak uporządkować proces pracy z numerami seryjnymi.`
- body: `Formularz ma zachęcać do zostawienia danych kontaktowych i rozpoczęcia rozmowy handlowo-wdrożeniowej.`
- form fields:
  - `Imię i nazwisko`
  - `E-mail`
  - `Telefon`
  - `NIP firmy`
  - `Wiadomość` (opcjonalnie)
- button: `Umów prezentację systemu`
- success message: `Dziękujemy za wiadomość. Skontaktujemy się w sprawie prezentacji.`

## 9. Podstrona `/demo`
Podstrona `/demo` ma być wdrożona już teraz jako placeholder page.

Cel:
- potwierdzić istnienie przyszłego demo
- pokazać kierunek produktu bez symulowania realnej aplikacji
- utrzymać spójność z głównym landing page

Zawartość:
- nagłówek informujący, że pełne demo pojawi się później jako osobna aplikacja
- 4-5 placeholderów dla przyszłych ekranów
- krótki opis przyszłego zakresu demo
- CTA prowadzące do formularza kontaktowego lub powrotu na stronę główną

## 10. Formularz kontaktowy
- formularz jest statyczny i mockowany
- ma posiadać stany `idle`, `submitting`, `success`
- walidacja po stronie klienta obejmuje wymagane pola, poprawny email i podstawową walidację NIP
- kod ma być przygotowany tak, aby później łatwo podmienić mock na prawdziwe API

## 11. UI/UX
Wymagania wizualne:
- styl: profesjonalny B2B SaaS
- charakter: nowoczesny, spokojny, czytelny, bez przesadnie agresywnego marketingu
- kolorystyka:
  - główny motyw: granat lub głęboki niebieski
  - akcent sukcesu: zielony
  - akcent ostrzegawczy: czerwony
  - tła: jasne, z dużą ilością przestrzeni
- typografia: bezszeryfowa, preferowany `Inter`

Wymagania UX:
- sticky navbar
- czytelne CTA w hero i final CTA
- widoczna karta cenowa
- placeholdery assetów muszą wyglądać estetycznie, a nie jak surowe techniczne boksy
- responsywność od 320 px szerokości

## 12. SEO
Do wdrożenia:
- `title`: `Zarządzanie Numerami Seryjnymi | Moduł B2B dla Subiekt nexo PRO`
- `meta description`: `Uporządkuj proces pracy z numerami seryjnymi, usprawnij weryfikację urządzeń i pokaż zespołowi przejrzyste narzędzie dla Subiekt nexo PRO.`
- tylko jeden `h1` na stronie głównej
- poprawne `alt` dla obrazów i placeholderów
- podstawowe Open Graph

## 13. Assety i placeholdery
Na etapie pierwszej implementacji dopuszczalne są placeholdery dla:
- głównej grafiki hero
- widoków demo
- logo Partner-Net

Placeholdery muszą:
- być spójne wizualnie ze stroną
- zawierać zwięzły opis brakującego materiału
- mieć poprawne proporcje na mobile i desktopie

## 14. Zakazy i ograniczenia
1. Nie dodawać zmyślonych logotypów klientów.
2. Nie dodawać fałszywych opinii ani case studies.
3. Nie używać słowa `certyfikowany` przy opisie modułu.
4. Nie używać słowa `nakładka`.
5. Nie ukrywać ceny `300 zł netto / miesiąc`.
6. Nie obiecywać sztywnego czasu wdrożenia.
7. Nie używać potocznych określeń obniżających profesjonalizm komunikacji.
8. Nie korzystać z kodu obecnej aplikacji produkcyjnej jako źródła do budowy landing page.

## 15. Definition of Done
- projekt w `landing/` buduje się poprawnie przez `npm run build`
- strona główna renderuje wszystkie wymagane sekcje
- istnieje podstrona `/demo` jako placeholder
- cena `300 zł netto / miesiąc` jest wyraźnie widoczna
- wszystkie treści z tego briefu zostały osadzone w kodzie
- formularz działa w trybie mockowanym i waliduje dane wejściowe
- layout jest czytelny na mobile i desktopie
- nie ma sprzeczności z listą zakazów i ograniczeń

## 16. Checklist dla developera
- [ ] Zbudować osobną aplikację w `landing/`
- [ ] Nie korzystać z kodu istniejącego `client/`
- [ ] Skonfigurować React + Vite + Tailwind + React Router
- [ ] Przygotować strukturę komponentów i danych zgodną z architekturą
- [ ] Osadzić finalne copy z tego dokumentu
- [ ] Przygotować placeholder page `/demo`
- [ ] Dodać mockowany formularz kontaktowy
- [ ] Dodać meta tagi i podstawowe SEO
- [ ] Sprawdzić responsywność
- [ ] Zakończyć etap poprawnym buildem produkcyjnym
