import { Link } from 'react-router-dom'
import { ArrowLeft, Shield, Database, Cookie, FileText, Scale, Clock, Mail } from 'lucide-react'
import { siteContent } from '../content/siteContent.js'

const iconMap = {
  administrator: Shield,
  collectedData: Database,
  purpose: FileText,
  legalBasis: Scale,
  cookies: Cookie,
  userRights: FileText,
  retention: Clock,
  contact: Mail,
  updates: FileText,
}

function PrivacySection({ id, icon, heading, children }) {
  const Icon = icon
  return (
    <section id={id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#00aeff]">
          <Icon className="h-5 w-5" />
        </div>
        <h2 className="text-lg font-bold text-slate-900">{heading}</h2>
      </div>
      <div className="text-sm leading-relaxed text-slate-700 space-y-3">
        {children}
      </div>
    </section>
  )
}

function PrivacyPage() {
  const { privacy } = siteContent

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in-up">
      <div className="flex items-center gap-2 mb-2">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-[#00aeff] transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Powrót na stronę główną
        </Link>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-blue-50/30 p-6 md:p-8">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
          {privacy.title}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          {privacy.intro}
        </p>
        <p className="mt-2 text-xs text-slate-400">
          Ostatnia aktualizacja: {privacy.lastUpdated}
        </p>
      </div>

      <PrivacySection id="administrator" icon={iconMap.administrator} heading={privacy.administrator.heading}>
        <p>{privacy.administrator.body}</p>
      </PrivacySection>

      <PrivacySection id="collected-data" icon={iconMap.collectedData} heading={privacy.collectedData.heading}>
        <ul className="list-disc pl-5 space-y-1.5">
          {privacy.collectedData.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </PrivacySection>

      <PrivacySection id="purpose" icon={iconMap.purpose} heading={privacy.purpose.heading}>
        <ul className="list-disc pl-5 space-y-1.5">
          {privacy.purpose.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </PrivacySection>

      <PrivacySection id="legal-basis" icon={iconMap.legalBasis} heading={privacy.legalBasis.heading}>
        <p>{privacy.legalBasis.body}</p>
      </PrivacySection>

      <PrivacySection id="cookies" icon={iconMap.cookies} heading={privacy.cookies.heading}>
        <p>{privacy.cookies.body}</p>
        <div className="space-y-3 mt-4">
          {privacy.cookies.cookieTypes.map((type) => (
            <div key={type.name} className="rounded-xl border border-slate-100 bg-slate-50 p-4">
              <p className="font-semibold text-slate-800">{type.name}</p>
              <p className="mt-1 text-slate-600">{type.description}</p>
            </div>
          ))}
        </div>
        <p className="mt-4">
          {privacy.cookies.settingsCta}{' '}
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('openCookieSettings'))}
            className="font-semibold text-[#00aeff] hover:underline"
          >
            Otwórz ustawienia cookies →
          </button>
        </p>
      </PrivacySection>

      <PrivacySection id="user-rights" icon={iconMap.userRights} heading={privacy.userRights.heading}>
        <p>{privacy.userRights.intro}</p>
        <ul className="list-disc pl-5 space-y-1.5">
          {privacy.userRights.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </PrivacySection>

      <PrivacySection id="retention" icon={iconMap.retention} heading={privacy.retention.heading}>
        <p>{privacy.retention.body}</p>
      </PrivacySection>

      <PrivacySection id="contact" icon={iconMap.contact} heading={privacy.contact.heading}>
        {privacy.contact.lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </PrivacySection>

      <PrivacySection id="updates" icon={iconMap.updates} heading={privacy.updates.heading}>
        <p>{privacy.updates.body}</p>
      </PrivacySection>

      <div className="pt-4 text-center">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#00aeff] hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Wróć na stronę główną
        </Link>
      </div>
    </div>
  )
}

export default PrivacyPage
