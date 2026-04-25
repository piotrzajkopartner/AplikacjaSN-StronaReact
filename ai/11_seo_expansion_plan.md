# Plan rozszerzen SEO (canonical / robots / sitemap)

## 1. Cel dokumentu
Ten dokument opisuje szczegolowy plan wdrozenia rozszerzen SEO technicznego dla landing page "Partner Numery Seryjne".

Zakres obejmuje:
- canonical URL,
- `robots.txt`,
- `sitemap.xml`,
- walidacje po wdrozeniu,
- checkliste operacyjna i plan utrzymania.

Dokument jest przeznaczony do realizacji w kolejnym kroku projektu.

---

## 2. Aktualny stan (punkt startowy)
Zaimplementowane juz elementy SEO podstawowego poziomu:
- `index.html` zawiera bazowe `title`, `meta description`, `og:type`, `og:title`, `og:description`.
- `src/components/seo/SeoManager.jsx` ustawia runtime:
  - `document.title`,
  - `meta description`,
  - `og:title`, `og:description`, `og:type`, `og:image`.
- Trasy publiczne:
  - `/`
  - `/demo`

Braki do domkniecia:
- brak canonical,
- brak `public/robots.txt`,
- brak `public/sitemap.xml`.

---

## 3. Zasady i wymagania wdrozeniowe

### 3.1 Zasady techniczne
1. Jedno zrodlo prawdy dla domeny publicznej (`siteUrl`) w warstwie danych.
2. Zero hardcode domeny w wielu plikach.
3. Deterministyczne canonical URL dla kazdej trasy indeksowalnej.
4. Brak duplikatow tagow `<meta>` i `<link rel="canonical">` po zmianie trasy.
5. Wszystkie zmiany zgodne z obecna architektura SPA (React + Router).

### 3.2 Zasady publikacyjne
1. `robots.txt` i `sitemap.xml` musza byc dostepne pod root domeny.
2. `robots.txt` musi wskazywac na `sitemap.xml`.
3. `sitemap.xml` musi zawierac wszystkie publiczne trasy i tylko publiczne trasy.

### 3.3 Wymagania jakosci
- Build musi przechodzic: `npm run build`.
- W trybie runtime przy przejsciach miedzy `/` i `/demo` canonical i meta musza aktualizowac sie poprawnie.
- Weryfikacja reczna i narzedziowa (Search Console / walidatory).

---

## 4. Plan implementacji

## Etap A - Canonical URL

### A.1 Zmiany w danych
Dopisac `siteUrl` do `siteContent.seo`:

```js
seo: {
  siteUrl: 'https://twoja-domena.pl',
  ...
}
```

Wymaganie:
- wartosc bez trailing slash na koncu (np. `https://twoja-domena.pl`).

### A.2 Zmiany w `SeoManager`
Rozszerzyc `src/components/seo/SeoManager.jsx` o logike canonical:
1. Wyliczyc canonical per trasa:
   - `/` => `${siteUrl}/`
   - `/demo` => `${siteUrl}/demo`
2. Zapewnic istnienie dokladnie jednego `<link rel="canonical">`.
3. Przy zmianie trasy podmieniac `href` canonical, a nie tworzyc kolejnych duplikatow.

Przykladowy helper:

```js
function setCanonical(href) {
  let link = document.head.querySelector('link[rel="canonical"]')

  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', 'canonical')
    document.head.appendChild(link)
  }

  link.setAttribute('href', href)
}
```

### A.3 Definition of done
- Kazda publiczna trasa ma canonical.
- W DOM istnieje tylko jeden canonical.
- Canonical jest stabilny i poprawny po przejsciach client-side.

---

## Etap B - robots.txt

### B.1 Utworzenie pliku
Dodac plik:
- `public/robots.txt`

Minimalna zawartosc produkcyjna:

```text
User-agent: *
Allow: /

Sitemap: https://twoja-domena.pl/sitemap.xml
```

### B.2 Warianty srodowiskowe (opcjonalnie)
Jesli istnieje staging/public preview, rozwazyc wariant:

```text
User-agent: *
Disallow: /
```

Rekomendacja operacyjna:
- Wersje staging nie powinny byc indeksowane.
- Wersja produkcyjna powinna miec `Allow: /`.

### B.3 Definition of done
- Po deployu `https://twoja-domena.pl/robots.txt` zwraca prawidlowy plik.
- Link do sitemap w robots wskazuje poprawny URL.

---

## Etap C - sitemap.xml

### C.1 Utworzenie pliku
Dodac plik:
- `public/sitemap.xml`

Minimalna wersja dla aktualnych tras:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://twoja-domena.pl/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://twoja-domena.pl/demo</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
</urlset>
```

### C.2 Zasady aktualizacji
1. Przy kazdej nowej publicznej trasie aktualizowac sitemap.
2. Nie dodawac tras technicznych, prywatnych ani eksperymentalnych.
3. URL w sitemap musza byc absolutne (z domena).

### C.3 Definition of done
- `https://twoja-domena.pl/sitemap.xml` dostepny po deployu.
- Zawiera komplet aktualnych tras publicznych.

---

## Etap D - Walidacja i odbior SEO

### D.1 Testy lokalne (przed deployem)
1. `npm run build` bez bledow.
2. `npm run preview` i reczna kontrola:
   - `/` i `/demo` maja poprawny `title` i `description`.
   - `/` i `/demo` maja poprawny canonical.
3. Kontrola HEAD w DevTools (Elements):
   - brak duplikatow canonical,
   - brak duplikatow `description` i `og:*`.

### D.2 Testy po deployu
1. Otworzyc i sprawdzic:
   - `https://twoja-domena.pl/robots.txt`
   - `https://twoja-domena.pl/sitemap.xml`
2. Sprawdzic canonical dla `/` i `/demo` w zrodle strony.
3. Zweryfikowac podglad OG w narzedziu social debugger.

### D.3 Search Console
1. Dodac/zweryfikowac domene.
2. Zglosic `sitemap.xml`.
3. Uzyc URL Inspection dla:
   - `/`
   - `/demo`
4. Potwierdzic brak bledow indeksacji krytycznych.

### D.4 Definition of done
- Brak krytycznych bledow SEO technicznego blokujacych indeksacje.
- Sitemap przyjeta i odczytywana.

---

## 5. Szczegolowa checklista implementacyjna

### 5.1 Kod
- [ ] dodano `siteUrl` w `siteContent.seo`
- [ ] `SeoManager` obsluguje canonical
- [ ] brak duplikatow canonical po client-side navigation

### 5.2 Pliki public
- [ ] utworzono `public/robots.txt`
- [ ] utworzono `public/sitemap.xml`
- [ ] URL domeny w obu plikach jest poprawny

### 5.3 Testy
- [ ] `npm run build` przechodzi
- [ ] reczny test `/` i `/demo`
- [ ] walidacja w Search Console

---

## 6. Ryzyka i sposoby ograniczenia

### Ryzyko 1: Niespojna domena (siteUrl)
Objaw:
- canonical i sitemap wskazuja inna domene niz produkcyjna.

Mitigacja:
- trzymac `siteUrl` w jednym miejscu,
- code review kazdej zmiany domeny,
- test smoke po deployu.

### Ryzyko 2: Duplikaty canonical/meta
Objaw:
- wiele tagow canonical/description po zmianach trasy.

Mitigacja:
- helpery `setMeta` i `setCanonical` musza aktualizowac istniejace elementy,
- test przechodzenia miedzy `/` i `/demo`.

### Ryzyko 3: Staging zaindeksowany przez Google
Objaw:
- adresy testowe widoczne w indeksie.

Mitigacja:
- oddzielny `robots.txt` dla staging (`Disallow: /`),
- brak linkowania stagingu publicznie.

### Ryzyko 4: Zapomniana aktualizacja sitemap
Objaw:
- nowe trasy nie sa crawlowane.

Mitigacja:
- dopisac krok do checklisty release,
- traktowac aktualizacje sitemap jako obowiazkowy element PR przy nowych trasach.

---

## 7. Proponowana kolejnosc wdrozenia (1 sprint)

Dzien 1:
- Canonical (`siteUrl` + `SeoManager`)
- testy lokalne

Dzien 2:
- `robots.txt`
- `sitemap.xml`
- testy lokalne i preview

Dzien 3:
- deploy
- walidacja produkcyjna + Search Console
- poprawki po walidacji

---

## 8. Artefakty koncowe po wykonaniu planu
Po zamknieciu planu w repo powinny istniec:
- zaktualizowany `src/content/siteContent.js` (z `seo.siteUrl`),
- zaktualizowany `src/components/seo/SeoManager.jsx` (canonical),
- `public/robots.txt`,
- `public/sitemap.xml`,
- wpis w dokumentacji technicznej potwierdzajacy wdrozenie.

---

## 9. Kryteria gotowosci do publikacji (SEO+)
- podstawowe SEO dziala (`title`, `description`, OG),
- canonical poprawny dla kazdej trasy,
- robots i sitemap dostepne publicznie,
- Search Console nie pokazuje bledow krytycznych,
- build produkcyjny przechodzi bez bledow.

---

Dokument gotowy do realizacji w kolejnym etapie. Obecnie nie wprowadza zmian kodu aplikacji - jest planem wykonawczym.
