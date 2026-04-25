import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">Partner Numery Seryjne</h1>
      <p className="max-w-2xl text-slate-700">
        Placeholder strony glownej landing page. W kolejnych etapach pojawia sie pelna struktura sekcji
        i finalny content.
      </p>
      <Link
        to="/demo"
        className="inline-flex rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
      >
        Przejdz do strony /demo
      </Link>
    </section>
  )
}

export default HomePage
