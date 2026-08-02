# Partner Numery Seryjne — Strona Marketingowa & Demo Web/Android

Oficjalny serwis internetowy rozwiązania **Partner Numery Seryjne** dedykowanego firmom pracującym w środowisku **Subiekt nexo PRO**. Strona zawiera panel informacji produktowej, interaktywne demo systemu oraz produkcyjny formularz kontaktowy z integracją wysyłki pocztowej.

**Adres produkcyjny domeny:** [https://numeryseryjne-nexo.pl](https://numeryseryjne-nexo.pl)

---

## 🚀 Technologie i Funkcjonalności

- **Frontend**: React 19 + Vite 8, Tailwind CSS, Framer Motion, Lucide Icons.
- **Backend / Serverless**: Vercel Serverless Functions (`/api/contact.js`).
- **Poczta e-mail**: Integracja z **Resend API** dla zweryfikowanej domeny `numeryseryjne-nexo.pl`.
- **Analityka i SEO**:
  - **Google Analytics 4**: identyfikator `G-L9Q9TBJSFB` podłączony we wszystkich widokach.
  - **Google Search Console**: autoryzowany plik weryfikacyjny oraz meta-tagi.
  - **Sitemap & Robots**: automatyczny `sitemap.xml` oraz dostosowany `robots.txt`.

---

## 🛠️ Zmienne Środowiskowe (Vercel Environment Variables)

Do poprawnego działania formularza kontaktowego w środowisku produkcyjnym Vercel wymagane są następujące zmienne środowiskowe:

| Nazwa Zmiennej | Opis | Domyślna Wartość |
| :--- | :--- | :--- |
| `RESEND_API_KEY` | Klucz API wygenerowany w panelu Resend | *(Wymagany w Vercel)* |
| `CONTACT_EMAIL` | Adres e-mail, na który trafiają zgłoszenia z formularza | `piotr.zajko@partner-net.pl` |
| `SENDER_EMAIL` | Zweryfikowany adres nadawcy w Resend | `Partner Contact <kontakt@numeryseryjne-nexo.pl>` |

---

## 📁 Dedykowany Endpoint Formularza (`/api/contact.js`)

Endpoint przyjmuje żądania `POST` z formularza i przesyła sformatowaną wiadomość HTML zawierającą:
- Imię i nazwisko nadawcy
- Adres e-mail oraz telefon kontaktowy
- NIP firmy (z automatyczną walidacją sumy kontrolnej NIP)
- Treść wiadomości

---

## 💻 Lokalne uruchamianie i budowanie

### Instalacja zależności:
```bash
npm install
```

### Uruchomienie serwera deweloperskiego:
```bash
npm run dev
```

### Budowanie wersji produkcyjnej:
```bash
npm run build
```

---

## 📜 Licencja i Prawa Autorskie

Wszelkie prawa zastrzeżone © **PARTNER Justyna Bandzarewicz** (NIP: 5372186848).
