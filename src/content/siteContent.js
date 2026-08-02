export const siteContent = {
  seo: {
    image: '/partner-assets/400dpiLogo.jpg',
    routes: {
      home: {
        path: '/',
        title: 'Partner Numery Seryjne | Kontrola SN dla Subiekt nexo PRO',
        description:
          'Panel webowy i aplikacja Android do obsługi numerów seryjnych oraz kompletacji w firmach pracujących na Subiekt nexo PRO.',
        robots: 'index, follow',
        type: 'website',
      },
      demo: {
        path: '/demo',
        title: 'Demo Partner Numery Seryjne | Panel webowy i Android',
        description:
          'Publiczne demo z syntetycznymi danymi pokazuje obsługę dokumentów, numerów seryjnych i lokalną symulację kompletacji mobilnej.',
        robots: 'index, follow',
        type: 'website',
      },
      privacy: {
        path: '/polityka-prywatnosci',
        title: 'Polityka prywatności | Partner Numery Seryjne',
        description:
          'Informacje o formularzu kontaktowym, pamięci lokalnej przeglądarki i prywatności na stronie Partner Numery Seryjne.',
        robots: 'index, follow',
        type: 'website',
      },
      notFound: {
        title: 'Nie znaleziono strony | Partner Numery Seryjne',
        description: 'Podany adres nie prowadzi do dostępnej strony serwisu Partner Numery Seryjne.',
        robots: 'noindex, nofollow',
        type: 'website',
      },
    },
  },
  navigation: {
    brand: 'Partner Numery Seryjne',
    links: [
      { label: 'Jak działa', href: '#jak-dziala' },
      { label: 'Aplikacja Android', href: '#aplikacja-mobilna' },
      { label: 'Korzyści', href: '#korzysci' },
      { label: 'Funkcje', href: '#funkcje' },
      { label: 'Cena', href: '#cena' },
      { label: 'Kontakt', href: '#kontakt' },
    ],
    cta: {
      label: 'Umów prezentację',
      href: '#kontakt',
    },
  },
  hero: {
    badge: 'Panel webowy + aplikacja Android',
    headline: 'Numery seryjne i kompletacja pod kontrolą, od dokumentu po skan.',
    body: 'Partner Numery Seryjne łączy panel webowy dla biura z aplikacją Android dla magazynu. Zespół wybiera dokument, skanuje SN lub kompletowany towar i od razu widzi postęp, braki oraz status pozycji.',
    pricingNote: '300 zł netto miesięcznie. Wdrożenie i konfiguracja są wyceniane osobno.',
    primaryCta: {
      label: 'Umów prezentację',
      href: '#kontakt',
    },
    secondaryCta: {
      label: 'Zobacz demo',
      href: '/demo',
    },
    supportingNote: 'Obsługa PZ, ZK i WZ oraz powiązań sprzedażowych FS/PA w środowisku Subiekt nexo PRO.',
    imagePlaceholder: {
      title: 'Podgląd aplikacji Partner Numery Seryjne',
      alt: 'Widok aplikacji do obsługi numerów seryjnych w Subiekt nexo PRO',
    },
  },
  problems: {
    subheadline: 'Codzienna praca',
    headline: 'Ręczne przepisywanie SN rozdziela dokument, towar i postęp kompletacji.',
    intro: 'Gdy biuro pracuje na dokumentach, a magazyn na osobnych listach, łatwiej o pominięty numer, podwójny odczyt lub niejasny stan realizacji.',
    cards: [
      {
        title: 'Trudna weryfikacja reklamacji',
        description:
          'Bez szybkiego dostępu do historii numeru seryjnego zespół traci czas na sprawdzanie dokumentów i może obsługiwać sprzęt spoza własnej sprzedaży.',
      },
      {
        title: 'Pomyłki przy kompletacji',
        description:
          'Przy dużej liczbie wydań łatwo zeskanować niewłaściwy egzemplarz, pominąć wymagany numer albo wpisać ten sam SN w kilku miejscach.',
      },
      {
        title: 'Zbyt dużo pracy ręcznej',
        description:
          'Pracownicy magazynu, biura i serwisu muszą ręcznie szukać numerów, przepisywać je między dokumentami i przygotowywać dokumenty gwarancyjne.',
      },
    ],
  },
  solution: {
    subheadline: 'Rozwiązanie',
    headline: 'Jeden proces dla biura i magazynu, dwa dopasowane interfejsy.',
    body: 'Panel webowy porządkuje dokumenty, numery seryjne, statusy i historię. Aplikacja Android prowadzi magazyniera przez skanowanie SN oraz kompletację pozycji, pozwalając zapisać postęp, brak i notatkę. Mechanizmy kontroli wykrywają duplikaty, pilnują ilości i zabezpieczają dokument przed równoczesną edycją.',
  },
  benefits: {
    subheadline: 'Korzyści operacyjne',
    headline: 'Mniej ręcznych kroków i czytelny stan pracy na każdym dokumencie.',
    cards: [
      {
        title: 'Mniej ręcznego przepisywania',
        description: 'Numery SN mogą zostać automatycznie przeniesione z zamówienia na powiązane WZ lub PA, z uwzględnieniem finalnych ilości.',
      },
      {
        title: 'Widoczny postęp dokumentu',
        description: 'Status i licznik pokazują, ile numerów lub sztuk już zebrano i czego nadal brakuje do zakończenia pozycji.',
      },
      {
        title: 'Kompletacja przy towarze',
        description: 'Aplikacja Android pozwala skanować pozycje i numery SN tam, gdzie faktycznie odbywa się zbieranie zamówienia.',
      },
      {
        title: 'Kontrola duplikatów i ilości',
        description: 'Aplikacja sygnalizuje powtórzone numery, braki i nadmiary, zanim zespół uzna dokument za uzupełniony.',
      },
      {
        title: 'Szybsze sprawdzanie historii',
        description: 'Wyszukiwanie po numerze SN pomaga odnaleźć jego historię i powiązane dokumenty bez ręcznego przeglądania list.',
      },
      {
        title: 'Łatwiejsze przekazanie pracy',
        description: 'Zapisany postęp, oznaczone braki i notatki pozostawiają kolejnej osobie czytelną informację o stanie kompletacji.',
      },
    ],
  },
  features: {
    subheadline: 'Najważniejsze funkcje',
    headline: 'Cztery obszary, które spinają dokument, SN i pracę magazynu.',
    groups: [
      {
        title: 'Dokumenty i powiązania',
        description: 'Praca na PZ, ZK i WZ oraz obsługa powiązań sprzedażowych FS/PA w jednym procesie.',
        items: [
          'Przenoszenie numerów SN z ZK na powiązane WZ lub PA',
          'Kontrola finalnych ilości po zmianach dokumentu',
        ],
      },
      {
        title: 'Android i skanowanie',
        description: 'Mobilny widok dokumentów, numerów SN i kompletacji dostosowany do pracy dotykowej.',
        items: [
          'Tryb pojedynczy i seryjny skanera',
          'Wąski celownik lub odczyt w pełnym kadrze',
        ],
      },
      {
        title: 'Kontrola poprawności',
        description: 'Czytelne statusy pomagają wychwycić niezgodność przed zakończeniem pracy.',
        items: [
          'Wykrywanie duplikatów, braków i nadmiarów',
          'Blokada równoczesnej edycji tego samego dokumentu',
        ],
      },
      {
        title: 'Historia i dokumenty',
        description: 'Szybkie dotarcie od numeru seryjnego do informacji potrzebnych w dalszej obsłudze.',
        items: [
          'Wyszukiwanie dokumentów i historii po numerze SN',
          'Generowanie kart gwarancyjnych PDF z kodami Code128',
        ],
      },
    ],
  },
  pricing: {
    subheadline: 'Prosty model licencyjny',
    headline: '300 zł netto miesięcznie za całe rozwiązanie.',
    body: 'Jeden abonament obejmuje panel webowy, aplikację Android, obsługę numerów seryjnych i kompletację. Osobno wyceniamy wdrożenie, konfigurację oraz ewentualne dopasowania.',
    planLabel: 'Abonament',
    price: '300 zł',
    priceSuffix: 'netto / miesiąc',
    planDescription: 'Panel webowy, aplikacja Android i kompletacja w ramach jednego abonamentu.',
    compatibilityLabel: 'Subiekt nexo PRO + Android',
    bullets: [
      'Panel webowy, aplikacja Android i kompletacja bez osobnej dopłaty modułowej',
      'Brak limitu użytkowników i stanowisk po stronie licencji',
      'Brak limitu liczby obsługiwanych dokumentów',
      'Brak limitu liczby zapisywanych numerów seryjnych',
      '14-dniowa licencja testowa przed decyzją o zakupie',
    ],
    note: 'Osobno wyceniamy wyłącznie wdrożenie, konfigurację serwera i urządzeń Android oraz ewentualne dopasowania po analizie środowiska klienta.',
  },
  deployment: {
    subheadline: 'Wdrożenie',
    headline: 'Od analizy Subiekta i sieci do uruchomienia kompletacji na Androidzie.',
    intro: 'Zakres i koszt prac ustalamy po sprawdzeniu środowiska klienta oraz urządzeń, na których ma działać aplikacja.',
    steps: [
      {
        title: 'Analiza Subiekta i sieci',
        description: 'Sprawdzamy konfigurację Subiekt nexo PRO, serwer, sieć lokalną oraz sposób pracy biura i magazynu.',
      },
      {
        title: 'Serwer on-premise',
        description: 'Instalujemy i konfigurujemy serwer aplikacji w środowisku klienta oraz łączymy go z uzgodnioną bazą.',
      },
      {
        title: 'Instalacja APK',
        description: 'Instalujemy aplikację APK na uzgodnionych urządzeniach z systemem Android i konfigurujemy adres lokalnego serwera.',
      },
      {
        title: 'Kamera i sieć lokalna',
        description: 'Weryfikujemy uprawnienie do kamery oraz połączenie urządzeń z serwerem przez firmową sieć LAN lub Wi-Fi.',
      },
      {
        title: 'Szkolenie zespołu',
        description: 'Pokazujemy obsługę dokumentów, skanowanie numerów SN, kompletację, braki i notatki.',
      },
    ],
  },
  security: {
    subheadline: 'Bezpieczeństwo',
    headline: 'Lokalny proces operacyjny z kontrolą równoczesnej pracy.',
    intro: 'Dane operacyjne są przechowywane w środowisku klienta. Serwer aplikacji komunikuje się także z serwerem licencji, dlatego rozwiązanie nie jest opisywane jako całkowicie odłączone od usług zewnętrznych.',
    items: [
      {
        title: 'Dane operacyjne lokalnie',
        description: 'Dokumenty, numery seryjne i postęp kompletacji pozostają na serwerze aplikacji uruchomionym w środowisku klienta.',
      },
      {
        title: 'Android w lokalnej sieci',
        description: 'Aplikacja Android łączy się z lokalnym serwerem, a uprawnienie do kamery wykorzystuje do odczytu kodów podczas skanowania.',
      },
      {
        title: 'Blokada i tryb tylko do odczytu',
        description: 'Blokada dokumentu ogranicza równoczesną edycję. Osoba bez aktywnej blokady pracuje w trybie tylko do odczytu.',
      },
      {
        title: 'Wsparcie ERP, nie jego zastępstwo',
        description: 'Rozwiązanie wspiera Subiekt nexo PRO, ale kompletacja zapisuje postęp w bazie aplikacji i nie zmienia bezpośrednio dokumentu Nexo.',
      },
    ],
  },
  trust: {
    subheadline: 'O dostawcy',
    headline: 'Rozwiązanie przygotowane przez Partner-Net',
    body1:
      'Partner-Net dostarcza rozwiązania IT, systemy zabezpieczeń, monitoring, infrastrukturę sieciową oraz wsparcie techniczne dla firm.',
    body2:
      'Doświadczenie w sprzedaży sprzętu, obsłudze B2B i wdrożeniach pozwala tworzyć narzędzia dopasowane do realnej pracy magazynu, biura i serwisu.',
    websiteUrl: 'https://partner-net.pl',
    websiteLabel: 'partner-net.pl',
    logo: {
      src: '/partner-assets/400dpiLogo.jpg',
      alt: 'Logo Partner-Net',
    },
  },
  faq: {
    subheadline: 'Najczęstsze pytania',
    headline: 'Cena, Android, sieć i kompletacja bez niedomówień.',
    items: [
      {
        question: 'Ile kosztuje aplikacja?',
        answer:
          'Całe rozwiązanie kosztuje 300 zł netto miesięcznie. Abonament obejmuje panel webowy, aplikację Android, obsługę numerów seryjnych i kompletację. Osobno wyceniamy wdrożenie, konfigurację oraz ewentualne dopasowania.',
      },
      {
        question: 'Czy aplikacja Android i kompletacja są dodatkowo płatne?',
        answer: 'Nie. Aplikacja Android i kompletacja są częścią abonamentu 300 zł netto miesięcznie. Liczbę urządzeń, na których instalujemy i konfigurujemy APK, ustalamy jedynie w zakresie osobno wycenianych prac wdrożeniowych.',
      },
      {
        question: 'Na jakich wersjach Androida działa aplikacja?',
        answer: 'Aplikacja mobilna jest przeznaczona dla urządzeń z systemem Android 7 lub nowszym. Zgodność konkretnego urządzenia i kamery weryfikujemy przed wdrożeniem.',
      },
      {
        question: 'Jak instalowana jest aplikacja Android?',
        answer: 'Aplikację dostarczamy jako plik APK. Instalację, konfigurację adresu lokalnego serwera i sposób późniejszych aktualizacji uzgadniamy w ramach wdrożenia.',
      },
      {
        question: 'Czy telefon musi być połączony z firmową siecią?',
        answer: 'Tak. Aplikacja Android komunikuje się z lokalnym serwerem przez firmową sieć LAN lub Wi-Fi. Urządzenie musi mieć dostęp do adresu serwera skonfigurowanego podczas wdrożenia.',
      },
      {
        question: 'Czy aplikacja działa w pełni offline?',
        answer: 'Nie. Aplikacja mobilna wymaga połączenia z lokalnym serwerem i nie ma kolejki operacji do późniejszej synchronizacji. Sam dostęp do internetu nie zastępuje połączenia z właściwą siecią firmową.',
      },
      {
        question: 'Dlaczego aplikacja prosi o dostęp do kamery?',
        answer: 'Uprawnienie do kamery jest potrzebne do rozpoznawania kodów w skanerze. Kamera służy do odczytu kodu podczas pracy z numerami SN i kompletacją.',
      },
      {
        question: 'Czym różni się skanowanie pojedyncze od seryjnego?',
        answer: 'Tryb pojedynczy kończy odczyt po rozpoznaniu jednego kodu. Tryb seryjny pozostaje aktywny i pozwala skanować kolejne kody bez ponownego uruchamiania skanera.',
      },
      {
        question: 'Co robi skan podczas kompletacji?',
        answer: 'Po rozpoznaniu towaru lub numeru seryjnego aplikacja zwiększa liczbę zebranych sztuk i zapisuje postęp kompletacji w swojej bazie. Nie zapisuje tej zmiany bezpośrednio do dokumentu w Subiekt nexo.',
      },
      {
        question: 'Czy można oznaczyć brak i dodać notatkę?',
        answer: 'Tak. Przy pozycji można oznaczyć brakujący towar oraz zapisać notatkę, aby kolejna osoba widziała stan realizacji.',
      },
      {
        question: 'Jakie dokumenty obsługuje rozwiązanie?',
        answer: 'Rozwiązanie wspiera pracę na dokumentach PZ, ZK i WZ oraz obsługę powiązań sprzedażowych z FS i PA, w tym przenoszenie numerów SN z ZK na powiązane WZ lub PA.',
      },
      {
        question: 'Czy kilka osób może równocześnie edytować ten sam dokument?',
        answer: 'Nie. Mechanizm blokady przyznaje edycję jednej osobie. Pozostali widzą dokument w trybie tylko do odczytu, co ogranicza ryzyko nadpisania zmian.',
      },
      {
        question: 'Czy mogę przetestować system?',
        answer: 'Tak. Dostępna jest 14-dniowa licencja testowa, która pozwala sprawdzić rozwiązanie przed decyzją o zakupie.',
      },
    ],
  },
  contact: {
    subheadline: 'Kontakt',
    headline: 'Zobacz panel webowy i kompletację na Androidzie w swoim procesie.',
    body: 'Podczas prezentacji pokażemy pracę z dokumentami i numerami SN, skanowanie aparatem urządzenia Android, postęp kompletacji, braki oraz notatki. Zakres wdrożenia omówimy na podstawie środowiska Subiekt nexo PRO i sieci magazynu.',
    directContact: {
      label: 'Zadzwoń i umów prezentację',
      value: '531 977 177',
      href: 'tel:+48531977177',
      note: 'Bezpośredni kontakt z Partner-Net w dni robocze.',
    },
    formNotice: '',
    fields: {
      fullName: { label: 'Imię i nazwisko', required: true, placeholder: 'Jan Kowalski' },
      email: { label: 'E-mail', required: true, placeholder: 'jan@firma.pl' },
      phone: { label: 'Telefon', required: true, placeholder: '+48 000 000 000' },
      taxId: { label: 'NIP firmy', required: true, placeholder: '5372186848' },
      message: { label: 'Wiadomość', required: false, placeholder: 'Np. typy dokumentów, urządzenia Android i obecny sposób kompletacji' },
    },
    buttonLabel: 'Wyślij wiadomość',
    submittingLabel: 'Wysyłanie...',
    resetLabel: 'Wyślij kolejną wiadomość',
    validationMessages: {
      required: 'To pole jest wymagane.',
      email: 'Wpisz poprawny adres e-mail.',
      phone: 'Wpisz poprawny numer telefonu (od 9 do 15 cyfr).',
      taxId: 'Wpisz poprawny NIP (10 cyfr i prawidłowa suma kontrolna).',
    },
    validationSummary: 'Formularz zawiera błędy. Popraw wskazane pola:',
    states: {
      idle: 'idle',
      submitting: 'submitting',
      verified: 'verified',
    },
    verifiedMessage: 'Dziękujemy za kontakt! Twoja wiadomość została wysłana. Skontaktujemy się z Tobą najszybciej jak to możliwe.',
  },
  demoPage: {
    badge: 'Interaktywne demo web + Android',
    headline: 'Zobacz panel webowy i aplikację mobilną w jednym procesie.',
    description:
      'Przejdź przez przykładową obsługę dokumentów w panelu webowym, a następnie sprawdź pełny przepływ numerów SN, skanowania i kompletacji w aplikacji na Androida.',
    highlights: [
      'Panel webowy do pracy z dokumentami i numerami seryjnymi',
      'Aplikacja Android z listą PZ, ZK i WZ oraz filtrami statusów',
      'Interaktywne skanowanie numerów SN i kompletacja towarów',
    ],
    stats: [
      { value: 'Web', label: 'Panel dokumentów i numerów SN' },
      { value: 'Android', label: 'Pełny przepływ aplikacji mobilnej' },
      { value: 'PZ / ZK / WZ', label: 'Dokumenty na syntetycznych danych' },
    ],
  },
  footer: {
    companyName: 'Partner-Net',
    description: 'Panel webowy i aplikacja Android do obsługi numerów seryjnych oraz kompletacji dla firm pracujących na Subiekt nexo PRO.',
    links: [
      { label: 'Strona główna', href: '/' },
      { label: 'Demo', href: '/demo' },
      { label: 'Kontakt', href: '/#kontakt' },
    ],
    legalNote: 'Wszelkie prawa zastrzeżone.',
  },
  privacy: {
    title: 'Polityka prywatności',
    lastUpdated: '2026-08-01',
    intro: 'Niniejsza polityka opisuje mechanizmy działające obecnie na stronie Partner Numery Seryjne, w tym formularz kontaktowy, publiczne demo i pamięć lokalną przeglądarki.',
    administrator: {
      heading: '1. Administrator danych osobowych',
      body: 'Administratorem danych osobowych przekazanych w formularzu kontaktowym, w bezpośredniej wiadomości e-mail lub rozmowie telefonicznej, jest PARTNER Justyna Bandzarewicz, Ortel Królewski Pierwszy 31B, 21-530 Piszczac, NIP 537-218-68-48, REGON 060302243. Dane kontaktowe znajdują się w sekcji 9.',
    },
    collectedData: {
      heading: '2. Dane na stronie marketingowej',
      items: [
        'Formularz kontaktowy przesyła dane bezpiecznym połączeniem w celu obsługi zapytania i przygotowania oferty.',
        'Pamięć localStorage przechowuje ustawienie informacji o niezbędnych mechanizmach strony pod kluczem sn_cookie_consent.',
        'Publiczne demo zapisuje losowy identyfikator sesji demonstracyjnej pod kluczem sn_client_id. Nie jest to konto użytkownika ani identyfikator reklamowy.',
        'Strona nie uruchamia narzędzi analitycznych ani marketingowych i nie przekazuje im danych o odwiedzinach.',
      ],
    },
    purpose: {
      heading: '3. Cel i podstawa przetwarzania danych',
      items: [
        'Zapamiętanie, że użytkownik zapoznał się z informacją o niezbędnej pamięci lokalnej strony.',
        'Utrzymanie technicznego identyfikatora sesji w publicznym demo i demonstracja mechanizmu blokady dokumentu.',
        'Dane przekazane dobrowolnie bezpośrednim kanałem kontaktu mogą służyć udzieleniu odpowiedzi, przygotowaniu oferty lub podjęciu działań przed zawarciem umowy.',
      ],
    },
    legalBasis: {
      heading: '4. Podstawa prawna przetwarzania',
      body: 'Niezbędne mechanizmy techniczne strony służą jej prawidłowemu działaniu. W przypadku bezpośredniego kontaktu podstawą przetwarzania może być podjęcie działań na żądanie osoby przed zawarciem umowy (art. 6 ust. 1 lit. b RODO) lub prawnie uzasadniony interes polegający na obsłudze korespondencji (art. 6 ust. 1 lit. f RODO), zależnie od treści kontaktu.',
    },
    cookies: {
      heading: '5. Pamięć lokalna i usługi zewnętrzne',
      body: 'Obecna wersja strony używa localStorage do zapisania informacji o ustawieniach oraz identyfikatora demo. Nie uruchamia Google Analytics, Meta Pixel, LinkedIn Insight Tag ani innych narzędzi analitycznych lub marketingowych. Fonty korzystają z lokalnych fallbacków systemowych i nie są pobierane z Google Fonts.',
      settingsCta: 'W każdej chwili możesz ponownie wyświetlić informację o ustawieniach strony.',
      cookieTypes: [
        { name: 'Niezbędne — aktywne', description: 'localStorage zapisuje potwierdzenie ustawień oraz techniczny identyfikator publicznego demo.' },
        { name: 'Analityczne — niewykorzystywane', description: 'Strona nie ładuje aktywnych narzędzi analitycznych ani związanych z nimi plików cookies.' },
        { name: 'Marketingowe — niewykorzystywane', description: 'Strona nie ładuje pikseli reklamowych, tagów marketingowych ani profilujących plików cookies.' },
      ],
    },
    demoAndApp: {
      heading: '6. Publiczne demo i aplikacja mobilna',
      items: [
        'Publiczne demo działa na danych syntetycznych i nie łączy się z danymi klientów.',
        'Symulacja mobilna na stronie nie uruchamia kamery urządzenia. Kod QR prowadzący do /demo jest generowany lokalnie w przeglądarce i nie korzysta z zewnętrznej usługi QR.',
        'Produkcyjna aplikacja Android jest instalowana w środowisku klienta. Korzysta z kamery wyłącznie w ramach funkcji skanowania produktu; nie jest to funkcja strony marketingowej.',
      ],
    },
    userRights: {
      heading: '7. Prawa użytkownika',
      intro: 'Przysługują Ci następujące prawa związane z przetwarzaniem danych osobowych:',
      items: [
        'Prawo dostępu do danych – możesz uzyskać informację, jakie dane przetwarzamy.',
        'Prawo do sprostowania danych – możesz żądać poprawienia nieprawidłowych danych.',
        'Prawo do usunięcia danych („prawo do bycia zapomnianym”) – możesz żądać usunięcia danych, jeśli nie ma podstaw do ich dalszego przetwarzania.',
        'Prawo do ograniczenia przetwarzania – możesz żądać czasowego wstrzymania przetwarzania danych.',
        'Prawo do przenoszenia danych – możesz otrzymać swoje dane w ustrukturyzowanym formacie.',
        'Prawo do sprzeciwu – możesz wnieść sprzeciw wobec przetwarzania danych na podstawie prawnie uzasadnionego interesu.',
        'Prawo do cofnięcia zgody – w każdej chwili możesz cofnąć zgodę na przetwarzanie danych (nie wpływa to na zgodność z prawem przetwarzania przed jej cofnięciem).',
        'Prawo do wniesienia skargi – możesz złożyć skargę do Prezesa Urzędu Ochrony Danych Osobowych (UODO).',
      ],
    },
    retention: {
      heading: '8. Okres przechowywania danych',
      body: 'Wartości sn_cookie_consent i sn_client_id pozostają w localStorage do czasu wyczyszczenia danych witryny w ustawieniach przeglądarki. Dane z formularza kontaktowego są przechowywane wyłącznie przez okres niezbędny do obsługi korespondencji i przygotowania oferty zgodnie z przepisami prawa.',
    },
    contact: {
      heading: '9. Kontakt w sprawie danych osobowych',
      lines: [
        'W sprawach związanych z ochroną danych osobowych prosimy o kontakt:',
        'E-mail: iod@partner-net.pl',
        'Telefon: +48 531 977 177',
      ],
    },
    updates: {
      heading: '10. Aktualizacja polityki prywatności',
      body: 'Niniejsza polityka prywatności podlega okresowym aktualizacjom. Ostatnia aktualizacja miała miejsce 1 sierpnia 2026 r. Wszelkie zmiany będą publikowane na tej stronie.',
    },
  },
}
