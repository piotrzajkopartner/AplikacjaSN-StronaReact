# Plan aktualizacji strony o aplikacje mobilna i kompletacje

Data: 2026-08-01  
Status: zrealizowany etapami; pozostają wyłącznie zależności zewnętrzne
Zakres: aktualizacja strony marketingowej po zmianach w `AplikacjaSN`

## Rejestr realizacji

### Etap 1 - baseline i dane demonstracyjne

Status: zrealizowany 2026-08-01

- utworzono centralne, bezpieczne źródło danych `src/content/mobileDemoData.js`,
- zastosowano wyłącznie oznaczenia `DEMO`, fikcyjne nazwy i zamaskowany NIP,
- żadne zdjęcie z `AplikacjaSN/Android_Foto` nie zostało skopiowane do `public/` ani `src/`,
- dane są przygotowane do współdzielenia przez makiety landing page i interaktywne demo,
- nie rozszerzono deklaracji ceny na urządzenia Android, ponieważ zakres licencji mobilnej wymaga potwierdzenia.

Weryfikacja etapu:

- `npx eslint src/content/mobileDemoData.js` - bez błędów,
- `npm run build` - zakończony poprawnie,
- `git diff --check` - bez błędów formatowania,
- pełny `npm run lint` jest obecnie blokowany przez zastany, niezależny błąd konfiguracji `DEMO/eslint.config.js`,
- `npx eslint src` ujawnia zastane błędy w komponentach Magic UI, cookies i starym demo; nie pochodzą z danych dodanych w tym etapie.

### Etap 2 - makiety Androida i symulacja skanera

Status: zrealizowany 2026-08-01

- dodano `src/components/product/PhoneFrame.jsx`,
- dodano `src/components/product/MobileAppMockup.jsx` z widokami listy dokumentów, numerów SN i kompletacji,
- dodano `src/components/product/ScannerSimulation.jsx`,
- symulacja obsługuje tryb pojedynczy i seryjny oraz wąski celownik i pełny kadr,
- postęp działa deterministycznie `0/2 -> 1/2 -> 2/2`, bez kamery i zewnętrznych usług,
- oba celowniki potwierdzają odczyt zmianą koloru na zielony,
- komponenty korzystają wyłącznie z `mobileDemoData.js`,
- dodano obsługę klawiatury, widoczne focusy, `aria-live` i warianty `motion-reduce`,
- nie dodano żadnych screenshotów ani danych operacyjnych do publicznych assetów.

Weryfikacja etapu:

- ESLint nowych komponentów i danych - bez błędów,
- `npm run build` - zakończony poprawnie,
- `git diff --check` - bez błędów formatowania,
- ręcznie potwierdzono brak wywołań kamery, zewnętrznych assetów i prawdziwych danych,
- ręcznie potwierdzono zielone potwierdzenie odczytu dla obu typów celownika.

### Etap 3 - przebudowa landing page

Status: zrealizowany 2026-08-01

- Hero komunikuje panel webowy i aplikację Android oraz pokazuje kompletację częściową na telefonie,
- usunięto z Hero stare fikcyjne firmy i zastąpiono je centralnymi danymi `DEMO`,
- dodano pięcioetapowy proces w `WorkflowSection.jsx`,
- dodano interaktywny showcase Androida w `MobileAppSection.jsx`,
- dodano sekcję dwóch trybów skanowania w `ScannerSection.jsx`,
- rozbudowano korzyści do sześciu kart związanych z SN i kompletacją,
- funkcje pogrupowano w cztery spójne obszary zamiast niespójnej płaskiej siatki,
- zaktualizowano nawigację i kolejność sekcji strony,
- komunikację dokumentów ograniczono do faktycznego UI PZ/ZK/WZ oraz powiązań sprzedażowych FS/PA,
- nie dodano deklaracji o offline, iOS, rolach ani bezpośrednim zapisie kompletacji do Nexo,
- nie rozszerzono bezlimitowej licencji na niepotwierdzoną liczbę urządzeń Android.

Weryfikacja etapu:

- ESLint wszystkich plików zmienionych w Etapie 3 - bez błędów,
- `npm run build` - zakończony poprawnie, 2223 moduły,
- `git diff --check` - bez błędów; zgłoszono jedynie informacyjne ostrzeżenia LF/CRLF,
- ręcznie usunięto z procesu sugestię osobnej listy PA, której aktualne UI nie posiada,
- ręcznie potwierdzono, że Hero korzysta z ekranu kompletacji i wyłącznie z danych demonstracyjnych.

### Etap 4 - mobilne demo kompletacji

Status: zrealizowany 2026-08-01

- `/demo` otrzymało dostępny przełącznik `Panel webowy / Kompletacja mobilna`,
- dodano lokalny scenariusz `MobilePickingDemo.jsx`,
- makieta telefonu i skaner współdzielą stan `0/2 -> 1/2 -> 2/2`,
- dodano scenariusze poprawnego skanu, duplikatu, nieznanego kodu, braku i notatki,
- symulacja nie używa kamery, backendu ani danych rzeczywistej aplikacji,
- `ScannerSimulation` obsługuje teraz także opcjonalny stan kontrolowany,
- usunięto wywołanie zewnętrznego `api.qrserver.com`,
- kod QR jest generowany lokalnie i prowadzi do aktualnego absolutnego adresu `/demo`,
- modal QR otrzymał podstawową semantykę dialogu i dostępne etykiety,
- treść strony demo rozróżnia panel webowy i lokalną symulację Androida.

Weryfikacja etapu:

- ESLint wszystkich plików zmienionych w Etapie 4 - bez błędów,
- `npm run build` - zakończony poprawnie, 2238 modułów,
- `git diff --check` - bez błędów; jedynie ostrzeżenia LF/CRLF,
- wyszukiwanie `api.qrserver.com` i numeru telefonu jako wartości QR - brak wyników,
- ręcznie potwierdzono wspólny, kontrolowany stan skanera i makiety telefonu.

### Etap 5 - oferta, wdrożenie, bezpieczeństwo i FAQ

Status: zrealizowany 2026-08-01

- potwierdzono, że 300 zł netto miesięcznie pozostaje ceną za całe rozwiązanie,
- abonament obejmuje panel webowy, aplikację Android, numery SN i kompletację,
- osobno wyceniane pozostają wdrożenie, konfiguracja i ewentualne dopasowania,
- usunięto sugestię osobnej opłaty modułowej za Android lub kompletację,
- dodano pięcioetapowy opis wdrożenia serwera i urządzeń Android,
- sekcja bezpieczeństwa opisuje lokalne dane operacyjne, połączenie Androida z serwerem, kamerę, blokady i tryb tylko do odczytu,
- FAQ rozszerzono o wymagania Android 7+, APK, LAN/Wi-Fi, brak pełnego offline, skaner i kompletację,
- usunięto sugestię kont, ról i bezpośredniego zapisu kompletacji do dokumentu Nexo,
- kontakt i stopka uwzględniają aplikację Android i kompletację,
- formularz nadal nie udaje realnej wysyłki: ma widoczną informację o braku endpointu oraz dostępne komunikaty walidacji,
- nie dodano nowych pól kwalifikacyjnych do czasu podłączenia rzeczywistej obsługi formularza.

Weryfikacja etapu:

- ESLint wszystkich plików zmienionych w Etapie 5 - bez błędów,
- `npm run build` - zakończony poprawnie, 2238 modułów,
- `git diff --check` - bez błędów; jedynie ostrzeżenia LF/CRLF,
- kontrola treści potwierdziła spójne `300 zł netto miesięcznie` dla panelu webowego, Androida, SN i kompletacji,
- ręcznie rozdzielono cenę abonamentu od osobno wycenianych prac wdrożeniowych.

### Etap 6 - SEO i prywatność

Status: zrealizowany 2026-08-01

- dodano osobne metadane dla strony głównej, demo, polityki prywatności i 404,
- dodano canonical, `og:url`, Open Graph i Twitter Cards,
- adres bazowy korzysta z `VITE_SITE_URL` lub bieżącego hosta bez zgadywania domeny,
- dodano JSON-LD `SoftwareApplication`, `Organization` i `FAQPage` na stronie głównej,
- dodano dostępną trasę 404 z `noindex, nofollow`,
- usunięto zewnętrzne Google Fonts,
- dodano `public/robots.txt`,
- zaktualizowano manifest tak, aby opisywał stronę produktu, a nie APK,
- polityka prywatności opisuje faktyczny formularz demonstracyjny, localStorage i syntetyczne demo,
- banner ustawień nie oferuje fikcyjnej analityki ani narzędzi marketingowych,
- dodano semantykę dialogu, Escape i respektowanie ograniczenia ruchu,
- `sitemap.xml` pozostaje zablokowana do czasu podania finalnej domeny produkcyjnej,
- obraz OG korzysta tymczasowo z bezpiecznego logo Partner-Net; docelowa grafika 1200x630 pozostaje zadaniem po ustaleniu domeny i finalnego assetu.

Weryfikacja etapu:

- ESLint wszystkich plików zmienionych w Etapie 6 - bez błędów,
- `npm run build` - zakończony poprawnie, 2239 modułów,
- `git diff --check` - bez błędów; jedynie ostrzeżenia LF/CRLF,
- brak aktywnych odwołań do zewnętrznego QR, Google Fonts, Analytics i pikseli marketingowych,
- jedyne wystąpienia nazw narzędzi analitycznych są negatywnym ujawnieniem w polityce prywatności,
- build zgłasza ostrzeżenie o głównym chunku 502,78 kB; optymalizacja została przeniesiona do końcowego Etapu 7.

### Etap 7 - audyt końcowy i stabilizacja

Status: zrealizowany 2026-08-01

- wykonano niezależny przegląd wszystkich zmian i usunięto wykryte regresje,
- statyczna makieta w Hero nie udostępnia martwych kontrolek,
- lista dokumentów otwiera wyłącznie spójny scenariusz `ZK DEMO`,
- widok numerów SN korzysta z tego samego postępu co kompletacja mobilna,
- stany `Brak` i `Notatka` są widoczne oraz resetowalne w demo,
- paski postępu otrzymały semantykę `progressbar`,
- przełączanie panelu webowego i mobilnego nie zeruje stanu demo,
- zabezpieczono dostęp do localStorage i dodano fallback pamięciowy,
- poprawiono walidację telefonu oraz sumy kontrolnej NIP,
- dialog cookies i QR otrzymały Escape, początkowy focus, przywracanie focusu i przewijanie na niskich ekranach,
- uzupełniono publiczne dane administratora na podstawie oficjalnej strony Partner-Net,
- dodano działający numer telefonu obok demonstracyjnego formularza,
- usunięto wszystkie błędy i ostrzeżenia ESLint w aktywnym `src`,
- skonfigurowano lint tak, aby pomijał niezależne archiwa `AplikacjaSN`, `DEMO` i `partnerStrona`,
- podzielono kod przez lazy loading; główny chunk spadł poniżej 500 kB,
- dodano osobne dokumenty HTML dla `/demo`, `/polityka-prywatnosci` i 404,
- Vercel serwuje właściwe statyczne metadane tras i zwraca status 404 dla nieznanych adresów,
- ścieżki z końcowym ukośnikiem są normalizowane przez `SeoManager`.

Końcowa weryfikacja obejmuje pełny `npm run lint`, produkcyjny `npm run build`, `git diff --check`, test dokumentów wynikowych, test tras przez serwer preview i kontrolę braku danych z `Android_Foto` w publicznych źródłach.

Wynik końcowej weryfikacji:

- `npm run lint` - zakończony poprawnie dla całego aktywnego projektu,
- `npm run build` - zakończony poprawnie, 2242 moduły,
- wszystkie chunki JavaScript są poniżej 500 kB,
- główny chunk ma 191,05 kB po minifikacji i 60,47 kB gzip,
- build emituje `index.html`, `demo.html`, `polityka-prywatnosci.html` i `404.html`,
- serwer preview zwrócił wszystkie cztery dokumenty z właściwymi tytułami,
- konfiguracje `package.json`, `manifest.json` i `vercel.json` przeszły walidację JSON,
- kontrola publicznych źródeł nie znalazła nazw plików Signal, rzeczywistego dokumentu `ZK 1598`, symbolu `7521`, zewnętrznego generatora QR, starego placeholdera OG ani Google Fonts,
- `git diff --check` po usunięciu końcowej spacji - bez błędów.

### Zależności zewnętrzne po realizacji

- `sitemap.xml` wymaga finalnej domeny produkcyjnej,
- canonical i absolutne adresy OG w produkcji wymagają ustawienia `VITE_SITE_URL`,
- dedykowany obraz OG 1200x630 wymaga zatwierdzonego finalnego assetu bez danych klientów,
- formularz pozostaje jawnie demonstracyjny do czasu podłączenia endpointu; bezpośredni kontakt telefoniczny działa,
- treść polityki prywatności powinna przejść formalną weryfikację prawną przed publikacją,
- rzeczywisty skaner Android powinien zostać przetestowany na docelowych modelach telefonów niezależnie od strony marketingowej.

### Korekta wizualna po porównaniu z aktualną aplikacją

Status: zrealizowana 2026-08-01

- ponownie porównano landing z `AplikacjaSN/client/src` i czterema zrzutami `AplikacjaSN/Android_Foto`,
- Hero pokazuje wyłącznie samodzielny panel webowy; usunięto nakładającą się makietę telefonu,
- webowy mockup odtwarza aktualny header, wyszukiwarkę, PZ/ZK/WZ, statusy oraz gęste karty dokumentów,
- usunięto nieistniejący sidebar i fikcyjną nawigację modułową,
- nazwa zakładki demo została zmieniona z `Kompletacja mobilna` na `Aplikacja mobilna`,
- mobilne demo zaczyna się od listy dokumentów, a nie od kompletacji,
- wszystkie syntetyczne karty PZ/ZK/WZ można otworzyć,
- filtry typu, statusu i lokalne wyszukiwanie działają w makiecie,
- ekran dokumentu odwzorowuje biały header, powrót, numer dokumentu, klienta, NIP, datę i postęp,
- tryb SN zawiera wyszukiwarkę produktu, filtr, pola SN, aparaty, skan seryjny oraz dolny zapis,
- kompletacja zawiera podsumowanie, filtry, metryki, ilość, kompletne/brak/reset/notatkę i skanery,
- dodano pełnoekranową symulację rzeczywistego skanera wewnątrz telefonu,
- usunięto abstrakcyjną sekcję `Wybierz odpowiedź skanera`,
- mockupy korzystają z typografii produktu opartej na Segoe UI i poprawnych polskich znakach,
- usunięto deklarację niezaładowanego fontu `Inter` i ujednolicono stos fontów strony,
- nagłówki kart aplikacji mobilnej używają `Segoe UI Bold` zamiast ciężkiego `Segoe UI Black`, którego ogonki `ą` i `ę` wyglądały niespójnie,
- dane każdego otwieranego dokumentu są synchronizowane z widokiem SN i kompletacji,
- wszystkie NIP-y są zamaskowane, a numery dokumentów i SN zawierają oznaczenie `DEMO`.

Weryfikacja przeglądarkowa:

- Hero sprawdzony na 1440 px i 390 px bez nakładania i bez poziomego przepełnienia,
- aplikacja mobilna sprawdzona w przepływie lista -> dokument -> skan seryjny -> kompletacja,
- skaner przyjął demonstracyjny odczyt i zaktualizował licznik SN,
- przełącznik `Numery SN / Kompletacja` zachował postęp,
- konsola przeglądarki bez błędów React.

## 1. Cel

Zaktualizowac strone promujaca Partner Numery Seryjne tak, aby przedstawiala aktualny zakres produktu:

- panel webowy do obslugi dokumentow i numerow seryjnych,
- dedykowana aplikacje Android,
- mobilna kompletacje towaru,
- skanowanie pojedyncze i seryjne,
- kontrolowanie osobno postepu kompletacji oraz numerow SN,
- obsluge brakow, notatek i czesciowo zebranych pozycji,
- powiazania dokumentow i automatyzacje kart gwarancyjnych.

Strona powinna zachowac obecny techniczny charakter, motyw numerow seryjnych i skanowania oraz jasna identyfikacje B2B. Aktualizacja nie powinna wygladac jak osobny, doklejony modul. Panel webowy i aplikacja Android maja zostac pokazane jako dwa interfejsy jednego procesu.

## 2. Glowny przekaz produktu

Rekomendowane pozycjonowanie:

> Panel webowy i aplikacja Android do obslugi numerow seryjnych oraz kompletacji towaru dla Subiekt nexo PRO.

Rekomendowane glowne haslo:

> Numery seryjne i kompletacja towaru w jednym procesie

Rekomendowany opis:

> Obsluguj dokumenty w panelu webowym, a na magazynie korzystaj z aplikacji Android. Skanuj numery seryjne, potwierdzaj kolejne zebrane sztuki, oznaczaj braki i kontroluj postep dokumentu.

Najwazniejsze nowe korzysci:

- jedno urzadzenie do pracy z dokumentem, numerami SN i kompletacja,
- mniej powrotow magazyniera do stanowiska komputerowego,
- automatyczne zwiekszenie liczby zebranych sztuk po poprawnym skanie,
- osobna informacja o liczbie zebranych sztuk i liczbie uzupelnionych SN,
- natychmiastowe pokazanie statusu pozycji,
- mozliwosc oznaczenia braku i dodania notatki,
- zapisany postep dostepny po ponownym otwarciu dokumentu,
- mniejsze ryzyko przypadkowego odczytania sasiedniego kodu,
- szybsza praca dzieki skanowaniu seryjnemu.

## 3. Zasady ochrony danych

Materialy z `AplikacjaSN/Android_Foto` zawieraja dane operacyjne i nie moga zostac opublikowane bezposrednio.

Obowiazujace zasady:

- oryginalne screenshoty sa tylko wzorcem interfejsu,
- oryginalne pliki nie trafiaja do `public/`, kodu strony ani publicznego buildu,
- nie publikujemy prawdziwych nazw firm, NIP-ow, produktow, dokumentow, dat ani numerow seryjnych,
- nie opieramy anonimizacji wylacznie na rozmyciu,
- publiczne widoki odtwarzamy z fikcyjnym zestawem danych,
- przed publikacja sprawdzamy wszystkie obrazy i dane demonstracyjne,
- wygenerowane assety pozbawiamy zbednych metadanych.

Rekomendowany zestaw danych demonstracyjnych:

- firma: `Firma demonstracyjna`,
- dokument: `ZK DEMO/08/2026`,
- dokument wydania: `WZ DEMO/08/2026`,
- faktura: `FS DEMO/08/2026`,
- produkt: `Router przemyslowy DEMO`,
- symbol produktu: `NET-DEMO-01`,
- numer seryjny: `SN-DEMO-2026-000123`,
- NIP: pominiety albo `XXX-XXX-XX-XX`.

Nie nalezy generowac losowego poprawnego NIP-u, poniewaz moze nalezec do istniejacego podmiotu.

## 4. Jak komunikowac skaner

Technicznie aplikacja ma jeden wspoldzielony mechanizm skanowania uzywany w kilku kontekstach. Nie nalezy przedstawawiac go jako dwoch niezaleznych silnikow.

Rekomendowany komunikat:

> Dwa tryby skanowania: pojedynczy i seryjny, z waskim celownikiem lub pelnym kadrem.

### Tryb pojedynczy

- kamera zatrzymuje sie po wykryciu kodu,
- uzytkownik widzi odczytana wartosc,
- kod mozna zatwierdzic albo zeskanowac ponownie,
- tryb nadaje sie do uzupelnienia konkretnego pola SN lub wskazanej pozycji.

### Tryb seryjny

- kolejne poprawne kody sa przyjmowane bez zatwierdzania kazdego odczytu,
- numery trafiaja do kolejnych wolnych pol,
- aplikacja kontroluje lokalne duplikaty i wymagana liczbe,
- skanowanie trwa do zakonczenia serii.

### Waski celownik

- jest przeznaczony przede wszystkim do kodow liniowych,
- ulatwia wskazanie jednego kodu sposrod kilku sasiednich etykiet,
- po stabilnym odczycie zmienia stan na potwierdzony.

### Pelny kadr

- jest przeznaczony do wiekszych kodow i QR,
- wybiera kod znajdujacy sie najblizej srodka celu,
- po rozpoznaniu pokazuje wizualne potwierdzenie.

Bezpiecznie mozna komunikowac obsluge aparatu oraz formatow Code 128, Code 39, EAN, UPC i QR. Nie nalezy okreslac rozwiazania jako natywny skaner ML Kit, poniewaz aktualna implementacja korzysta z `BarcodeDetector` w Android WebView.

## 5. Jak komunikowac kompletacje

Potwierdzone zachowanie aplikacji:

- kompletacja jest osobnym trybem dostepnym w aplikacji Android,
- kazda pozycja pokazuje wymagana i zebrana liczbe sztuk,
- aplikacja pokazuje osobno liczbe numerow SN,
- poprawny skan moze zwiekszyc liczbe zebranych sztuk o jeden,
- status przechodzi przez `Do zebrania`, `Czesciowo` i `Zebrane`,
- przekroczenie wymaganej liczby jest blokowane,
- uzytkownik moze oznaczyc pozycje jako kompletna albo brakujaca,
- uzytkownik moze zwiekszyc, zmniejszyc lub zresetowac ilosc,
- do pozycji mozna dodac notatke,
- postep jest zapisywany w bazie aplikacji.

Rekomendowany komunikat:

> Po rozpoznaniu towaru lub numeru seryjnego aplikacja automatycznie zwieksza liczbe zebranych sztuk i zapisuje postep kompletacji.

Nie nalezy komunikowac, ze skan automatycznie kompletuje dokument w Subiekt nexo. Postep kompletacji jest przechowywany przez aplikacje i nie zapisuje bezposrednio zmian do dokumentu Nexo.

## 6. Proponowany przebieg strony

### 6.1. Hero

Cel: natychmiast pokazac, ze produkt obejmuje panel webowy i aplikacje Android.

Zmiany:

- badge `Panel webowy + aplikacja Android`,
- nowe haslo laczace SN i kompletacje,
- opis roli panelu oraz telefonu,
- zachowanie informacji o Subiekt nexo PRO, instalacji on-premise, cenie i okresie testowym,
- po prawej kompozycja panelu desktopowego i telefonu,
- ekran telefonu powinien pokazywac kompletacje z fikcyjnymi danymi,
- obecny motyw siatki, skanera i numerow SN powinien zostac zachowany.

Proponowane haslo:

> Numery seryjne i kompletacja towaru w jednym procesie

### 6.2. Problem operacyjny

Sekcja powinna objac:

- brak biezacej informacji, co zostalo fizycznie zebrane,
- pomijanie pozycji lub sztuk podczas kompletacji,
- reczne przepisywanie numerow seryjnych,
- trudnosc w odroznieniu kompletacji od uzupelnienia SN,
- powroty pracownika do komputera,
- niejasna obsluge brakow i czesciowej realizacji.

Nie nalezy stosowac niepotwierdzonych procentow oszczednosci ani obietnic `100% poprawnosci`.

### 6.3. Jak dziala system

Nowa sekcja procesowa powinna pokazac piec krokow:

1. Wybor dokumentu PZ, ZK lub WZ.
2. Otwarcie dokumentu w panelu albo aplikacji Android.
3. Skanowanie numerow SN lub pozycji kompletacji.
4. Automatyczna aktualizacja licznikow i statusu.
5. Zapis postepu, brakow i notatek.

Sekcja ma wyjasnic relacje pomiedzy panelem, telefonem, baza aplikacji i Subiekt nexo PRO bez sugerowania nieistniejacego zapisu kompletacji do ERP.

### 6.4. Showcase aplikacji Android

Dodac nowa sekcje bezposrednio po przedstawieniu rozwiazania.

Rekomendowany zestaw ekranow:

1. Lista dokumentow `Do uzupelnienia`.
2. Dokument w trybie `Numery SN`.
3. Ten sam dokument w trybie `Kompletacja`.

Na desktopie najlepiej pokazac jeden duzy telefon oraz dwa mniejsze detale. Na mobile zastosowac przelaczane zakladki albo pozioma karuzele. Nie pokazywac czterech pelnych, wysokich ekranow obok siebie.

Proponowane haslo:

> Magazyn pod kontrola, bez wracania do komputera

### 6.5. Kompletacja krok po kroku

Pokazac interaktywna, deterministyczna symulacje:

1. Poczatkowy stan `Zebrano 0 / 2 szt.`.
2. Pierwszy skan zmienia licznik na `1 / 2`.
3. Status zmienia sie na `Czesciowo`.
4. Drugi skan zmienia licznik na `2 / 2`.
5. Status zmienia sie na `Zebrane`.

Obok ekranu nalezy pokazac callouty:

- postep kompletacji,
- osobny licznik numerow SN,
- status pozycji,
- akcje `Brak`, `Notatka`, `Reset`,
- skaner calego dokumentu i skaner konkretnej pozycji.

Proponowane haslo:

> Jeden skan, natychmiast zaktualizowany postep

### 6.6. Prezentacja skanera

Poniewaz nie ma gotowych screenshotow aktywnego skanera, nalezy przygotowac zgodna z implementacja symulacje.

Symulacja moze pokazac:

- neutralne opakowanie z fikcyjnym kodem,
- waski czerwony celownik przed odczytem,
- zielony celownik po stabilnym rozpoznaniu,
- pelny niebiesko-fioletowy kadr,
- wykryty numer demonstracyjny,
- tryb pojedynczy z przyciskami zatwierdzenia i ponownego skanu,
- tryb seryjny z licznikiem zeskanowanych sztuk,
- komunikat o duplikacie,
- komunikat o osiagnieciu wymaganej liczby.

Na stronie glownej nie trzeba prosic uzytkownika o dostep do prawdziwej kamery. Wystarczy wiarygodna animacja lub interaktywna demonstracja sterowana przyciskiem.

Proponowane haslo:

> Pojedynczo, seryjnie i dokladnie tam, gdzie celujesz

### 6.7. Korzysci

Przepisac karty korzysci tak, aby objely:

- mniej recznego przepisywania,
- szybsza prace magazyniera,
- mniej pominietych pozycji,
- szybsze wykrywanie brakow,
- osobna kontrole kompletacji i SN,
- latwiejsze wyszukiwanie dokumentu po numerze SN,
- bezpieczniejsza prace na wspoldzielonych dokumentach,
- automatyzacje kart gwarancyjnych.

### 6.8. Funkcje

Obecna plaska lista funkcji powinna zostac pogrupowana:

1. Aplikacja Android i kompletacja.
2. Skanowanie i numery seryjne.
3. Dokumenty oraz powiazania ZK-WZ-FS/PA.
4. Wyszukiwanie i obsluga korekt.
5. Karty gwarancyjne PDF.
6. Blokady i bezpieczenstwo operacyjne.

Nalezy przebudowac obecna siatke, poniewaz jej uklad zostal zaprojektowany dla mniejszej liczby kart i obecnie pozostawia niespojna ostatnia pozycje.

### 6.9. Demo

Rozszerzyc `/demo` o osobny scenariusz mobilny.

Rekomendowane wejscia:

- `Zobacz panel webowy`,
- `Zobacz kompletacje mobilna`.

Scenariusz mobilny powinien pozwalac:

- wybrac dokument,
- przelaczyc `Numery SN / Kompletacja`,
- uruchomic symulowany skan,
- zobaczyc `0/2`, `1/2` i `2/2`,
- zobaczyc status czesciowy i zakonczony,
- zasymulowac duplikat oraz nieznany kod,
- oznaczyc brak i dodac demonstracyjna notatke.

Symulacja moze zapisywac stan tylko lokalnie w pamieci przegladarki. Nie powinna laczyc sie z rzeczywistym backendem ani uzywac prawdziwych danych.

Nalezy poprawic obecny QR opisany jako otwierajacy demo na telefonie. Aktualnie koduje numer telefonu zamiast adresu strony.

### 6.10. Cena

Przed publikacja trzeba potwierdzic:

- czy aplikacja Android jest zawarta w abonamencie 300 zl netto,
- czy kompletacja jest funkcja podstawowej licencji,
- czy brak limitow stanowisk obejmuje urzadzenia mobilne,
- czy istnieje limit telefonow lub instalacji,
- czy konfiguracja mobilna jest czescia osobno wycenianego wdrozenia.

Do czasu potwierdzenia nie nalezy automatycznie rozszerzac hasla `bez limitu stanowisk` na dowolna liczbe urzadzen Android.

### 6.11. Wdrozenie

Sekcja powinna wyjasnic:

- instalacje serwera aplikacji w srodowisku klienta,
- instalacje APK na urzadzeniach Android,
- wymagany dostep do firmowej sieci lokalnej,
- uprawnienie aplikacji do kamery,
- konfiguracje adresu serwera,
- sposob dystrybucji aktualizacji,
- szkolenie pracownikow korzystajacych z kompletacji.

Nie nalezy deklarowac pelnego offline. Aktualna aplikacja wymaga komunikacji z serwerem i nie posiada kolejki operacji offline.

### 6.12. Bezpieczenstwo

Bezpiecznie mozna komunikowac:

- instalacje w srodowisku klienta,
- licencje przypisana do serwera,
- blokade rownoczesnej edycji dokumentu,
- tryb tylko do odczytu po utracie blokady,
- ochrone niezapisanych zmian przy wyjsciu z aplikacji,
- wykorzystywanie kamery do rozpoznawania kodow.

Nie nalezy komunikowac:

- kont i rol uzytkownikow,
- indywidualnego audytu pracownikow,
- pelnego szyfrowania komunikacji mobilnej,
- dzialania poza firmowa siecia,
- pelnego offline,
- absolutnie zerowego zapisu do bazy Nexo.

### 6.13. FAQ

Dodac lub zaktualizowac pytania:

- Czy aplikacja mobilna dziala na Androidzie?
- Czy aplikacja mobilna jest zawarta w cenie?
- Czy telefon musi byc polaczony z firmowa siecia?
- Czy aplikacja dziala bez internetu lub Wi-Fi?
- Jak instalowana i aktualizowana jest aplikacja Android?
- Jakie kody obsluguje skaner?
- Czym rozni sie skanowanie pojedyncze od seryjnego?
- Co dzieje sie po zeskanowaniu towaru podczas kompletacji?
- Czy mozna oznaczyc brakujacy towar?
- Czy kompletacja zmienia dokument bezposrednio w Subiekt nexo?
- Czy kilku pracownikow moze jednoczesnie edytowac ten sam dokument?

Odpowiedzi musza pozostac zgodne z faktyczna implementacja i potwierdzonym modelem licencji.

### 6.14. Kontakt

Formularz mozna rozszerzyc o opcjonalne informacje kwalifikujace wdrozenie:

- liczba pracownikow magazynu,
- liczba urzadzen Android,
- rodzaje uzywanych kodow,
- obecny sposob kompletacji,
- zasieg sieci w magazynie.

Przed rozszerzeniem nalezy najpierw zastapic obecne symulowane wysylanie formularza rzeczywistym mechanizmem obslugi leadow.

## 7. Materialy wizualne

### 7.1. Strategia

Najlepszym rozwiazaniem jest odtworzenie ekranow jako kontrolowanych komponentow React, a nie publikowanie screenshotow.

Korzysci:

- brak ryzyka ujawnienia danych,
- wysoka ostrosc na kazdej rozdzielczosci,
- mozliwosc animowania postepu,
- spojnosc z landingiem,
- latwa wymiana danych demonstracyjnych,
- latwiejsza aktualizacja po kolejnych zmianach aplikacji,
- poprawne zachowanie na desktopie i mobile.

### 7.2. Ekrany do odtworzenia

1. Lista dokumentow `Do uzupelnienia`.
2. Szczegoly dokumentu w trybie `Numery SN`.
3. Szczegoly dokumentu w trybie `Kompletacja`.
4. Kompletacja czesciowa `1 / 2`.
5. Kompletacja zakonczona `2 / 2`.
6. Skaner z waskim celownikiem.
7. Skaner z pelnym kadrem.
8. Tryb seryjny z licznikiem.
9. Komunikat o duplikacie.
10. Lista dokumentow zakonczonych.

### 7.3. Storyboard animacji

1. Uzytkownik wybiera dokument `0 / 2 SN`.
2. Otwiera tryb numerow seryjnych.
3. Naciska `Skanuj serie`.
4. Celownik wykrywa `SN-DEMO-2026-000123`.
5. Pierwsze pole zostaje uzupelnione.
6. Drugi skan uzupelnia kolejne pole.
7. Uzytkownik przechodzi do kompletacji.
8. Poprawny skan zwieksza `Zebrano 0 / 2` do `1 / 2`.
9. Status zmienia sie na `Czesciowo`.
10. Drugi skan zmienia licznik na `2 / 2` i status na `Zebrane`.

Animacja powinna miec wariant statyczny dla `prefers-reduced-motion`.

## 8. SEO i metadane

Zaktualizowac:

- tytul i opis strony glownej,
- Open Graph,
- obraz OG,
- dane dla `/demo`,
- dane dla `/polityka-prywatnosci`,
- canonical,
- `og:url`,
- Twitter Cards,
- `robots.txt`,
- `sitemap.xml`,
- dane strukturalne `SoftwareApplication`, `Product`, `FAQPage` i `Organization` po zweryfikowaniu finalnego copy.

Potencjalne klastry tematyczne:

- aplikacja do kompletacji dla Subiekt nexo PRO,
- aplikacja Android dla magazynu,
- skanowanie numerow seryjnych,
- kompletacja towaru telefonem,
- kontrola wydan i numerow SN.

Nalezy przygotowac nowy obraz OG bez danych klientow. Obecny wpis wskazuje na nieistniejacy placeholder.

## 9. Prywatnosc i cookies

Przed aktualizacja polityki nalezy wykonac faktyczna inwentaryzacje danych i uslug.

Uwzglednic:

- uprawnienie aparatu w aplikacji Android,
- komunikacje aplikacji z lokalnym serwerem,
- identyfikator instalacji lub klienta uzywany przez blokady,
- dane licencyjne wysylane do serwera licencji,
- brak zdjec zapisywanych przez skaner, jesli zostanie to potwierdzone w finalnej wersji,
- sposob przechowywania ustawien na urzadzeniu,
- zasady aktualizacji APK.

Usunac lub poprawic obecne deklaracje o Google Analytics, Meta Pixel i LinkedIn Insight Tag, jezeli nadal nie sa faktycznie ladowane. Poprawic opis SWR, ktory nie jest analitycznym plikiem cookie.

## 10. Ograniczenia komunikacji marketingowej

Nie publikowac deklaracji o:

- pelnym dzialaniu offline,
- aplikacji iOS,
- natywnym ML Kit,
- OCR, AI, NFC lub RFID,
- rozpoznawaniu produktu po wygladzie,
- skanowaniu wielu roznych kodow jednoczesnie,
- automatycznym tworzeniu dokumentow w Nexo,
- zapisie kompletacji bezposrednio do Nexo,
- rolach i kontach pracownikow,
- audycie `kto wykonal zmiane`,
- pelnej edycji FS jako osobnego dokumentu,
- osobnej zakladce PA w aktualnym interfejsie,
- raportach kompletacji, CSV, XLSX lub KPI,
- gwarantowanej poprawnosci albo konkretnym procencie oszczednosci.

Bezpieczne okreslenie zakresu dokumentow:

> Obsluga PZ, ZK i WZ oraz powiazan z dokumentami sprzedazowymi FS/PA.

## 11. Ryzyka do sprawdzenia przed publikacja

Przed szerokim promowaniem automatyzacji nalezy zweryfikowac w `AplikacjaSN`:

- skaner na kilku fizycznych telefonach i wersjach Android WebView,
- zachowanie po utracie Wi-Fi,
- zgodnosc skanowanych kodow z towarem,
- skaner konkretnej pozycji, ktory obecnie akceptuje dowolny niepusty kod,
- synchronizacje SN z kompletacja po usunieciu ostatniego numeru,
- zachowanie notatki przy automatycznej synchronizacji,
- traktowanie wartosci `brak` jako uzupelnionego pola,
- bledy zapisu kompletacji, ktore obecnie moga zostac tylko zapisane w konsoli,
- czy aplikacja mobilna i kompletacja sa zawarte w cenie,
- limit urzadzen mobilnych,
- finalny sposob instalacji i aktualizacji APK.

Po weryfikacji nalezy albo poprawic aplikacje, albo odpowiednio ograniczyc komunikaty na stronie.

## 12. Mapa najwazniejszych plikow strony

Priorytet krytyczny:

- `src/content/siteContent.js`,
- `src/pages/HomePage.jsx`,
- `src/components/sections/HeroSection.jsx`,
- `src/components/layout/Navbar.jsx`,
- `src/pages/DemoPage.jsx`,
- `src/features/demo/standalone/App.jsx`,
- `src/features/demo/standalone/components/DocumentList.jsx`,
- `src/features/demo/standalone/components/SerialEntry.jsx`,
- `src/features/demo/standalone/components/MobileScanner.jsx`,
- `src/features/demo/standalone/demoData.js`,
- `src/features/demo/standalone/api.js`.

Priorytet sprzedazowy:

- `src/components/sections/ProblemSection.jsx`,
- `src/components/sections/SolutionSection.jsx`,
- `src/components/sections/BenefitsGridSection.jsx`,
- `src/components/sections/FeaturesSection.jsx`,
- `src/components/sections/PricingSection.jsx`,
- `src/components/sections/DeploymentSection.jsx`,
- `src/components/sections/SecuritySection.jsx`,
- `src/components/sections/FAQSection.jsx`,
- `src/components/sections/FinalCTASection.jsx`,
- `src/components/ui/ContactForm.jsx`,
- `src/components/layout/Footer.jsx`.

Priorytet SEO i prawny:

- `src/components/seo/SeoManager.jsx`,
- `src/pages/PrivacyPage.jsx`,
- `src/components/ui/CookieConsent.jsx`,
- `index.html`,
- `public/manifest.json`,
- `public/site.webmanifest`.

Nowe sekcje powinny nadal korzystac z `src/components/ui/SectionHeading.jsx`, aby zachowac hierarchie naglowkow i spojnosc istniejacej strony.

## 13. Etapy realizacji

### Etap 1. Potwierdzenie produktu

- potwierdzic model cenowy aplikacji mobilnej,
- potwierdzic limit urzadzen,
- przetestowac skaner na fizycznych telefonach,
- zdecydowac, ktore ryzyka aplikacji zostana poprawione przed publikacja.

### Etap 2. Dane demonstracyjne

- przygotowac jeden spojny dokument demonstracyjny,
- przygotowac fikcyjnego kontrahenta i towary,
- przygotowac demonstracyjne numery SN,
- sprawdzic, czy zaden element nie pochodzi z realnego wdrozenia.

### Etap 3. System makiet

- odtworzyc liste dokumentow,
- odtworzyc widok numerow SN,
- odtworzyc kompletacje,
- przygotowac ramke telefonu,
- przygotowac symulacje obu trybow skanowania,
- dodac statyczny wariant reduced motion.

### Etap 4. Strona glowna

- zaktualizowac Hero,
- dodac `Jak dziala`,
- dodac showcase Androida,
- dodac kompletacje krok po kroku,
- dodac prezentacje skanera,
- przebudowac korzysci i funkcje,
- zaktualizowac nawigacje i stopke.

### Etap 5. Demo

- dodac wybor panel/mobilna kompletacja,
- przygotowac lokalny stan demonstracyjny,
- zasymulowac skany i statusy,
- dodac obsluge brakow i notatek,
- poprawic QR,
- nie laczyc demo z produkcyjnym backendem.

### Etap 6. Tresci sprzedazowe

- zaktualizowac cene po potwierdzeniu zakresu licencji,
- zaktualizowac wdrozenie,
- zaktualizowac bezpieczenstwo,
- zaktualizowac FAQ,
- zaktualizowac formularz kontaktowy,
- usunac deklaracje wykraczajace poza implementacje.

### Etap 7. SEO i prywatnosc

- przygotowac nowe metadane,
- wygenerowac bezpieczny obraz OG,
- dodac canonical, robots i sitemap,
- zaktualizowac polityke prywatnosci,
- zinwentaryzowac zewnetrzne uslugi i cookies.

### Etap 8. Weryfikacja

- sprawdzic strone na desktopie, tablecie i telefonie,
- sprawdzic wszystkie publiczne dane i assety,
- sprawdzic dostepnosc klawiatura,
- sprawdzic kontrast,
- sprawdzic `prefers-reduced-motion`,
- sprawdzic wydajnosc animacji,
- sprawdzic SEO i link preview,
- sprawdzic produkcyjny build,
- porownac finalne copy z faktycznym kodem aplikacji.

## 14. Kryteria zakonczenia

Aktualizacja jest zakonczona, gdy:

- Hero jasno przedstawia panel webowy i aplikacje Android,
- kompletacja jest pokazana jako rzeczywisty proces, a nie ogolna obietnica,
- uzytkownik rozumie roznice miedzy kompletacja i rejestracja SN,
- dwa tryby skanowania sa pokazane zgodnie z implementacja,
- demo pozwala zasymulowac skan i zakonczenie kompletacji,
- na stronie nie ma zadnych prawdziwych danych klientow,
- publiczne obrazy wykorzystuja wylacznie dane demonstracyjne,
- cena i zakres aplikacji mobilnej sa jednoznaczne,
- FAQ odpowiada na wymagania Androida, sieci i kamery,
- copy nie obiecuje offline, rol ani funkcji nieobecnych w aplikacji,
- SEO obejmuje aplikacje mobilna i kompletacje,
- strona dziala poprawnie na desktopie i mobile,
- animacje respektuja ograniczenie ruchu,
- produkcyjny build przechodzi bez bledow.
