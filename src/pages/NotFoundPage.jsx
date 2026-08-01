import { ArrowLeft, SearchX } from 'lucide-react'
import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <section
      aria-labelledby="not-found-title"
      className="mx-auto max-w-2xl animate-fade-in-up rounded-3xl border border-slate-200 bg-white/90 p-8 text-center shadow-xl shadow-slate-200/50 backdrop-blur-xl motion-reduce:animate-none sm:p-12"
    >
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-[#00aeff]">
        <SearchX aria-hidden="true" className="h-7 w-7" />
      </div>
      <p className="mt-6 text-sm font-bold uppercase tracking-[0.16em] text-[#00aeff]">Błąd 404</p>
      <h1 id="not-found-title" className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        Nie znaleziono strony
      </h1>
      <p className="mx-auto mt-4 max-w-lg leading-relaxed text-slate-600">
        Podany adres jest nieprawidłowy albo strona została przeniesiona. Wróć do strony produktu, aby przejść do dostępnych treści.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#00aeff] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-sky-300/40 transition-colors hover:bg-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00aeff] motion-reduce:transition-none"
      >
        <ArrowLeft aria-hidden="true" className="h-4 w-4" />
        Wróć na stronę główną
      </Link>
    </section>
  )
}

export default NotFoundPage
