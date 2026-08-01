import {
  ClipboardList,
  MessageSquareText,
  ScanLine,
  Smartphone,
  TimerReset,
} from 'lucide-react'
import SectionHeading from '../ui/SectionHeading.jsx'

const steps = [
  {
    title: 'Wybierz dokument',
    description: 'Otwórz właściwy PZ, ZK lub WZ z listy roboczej.',
    icon: ClipboardList,
  },
  {
    title: 'Przejdź na Androida',
    description: 'Magazynier otwiera dokument w aplikacji mobilnej.',
    icon: Smartphone,
  },
  {
    title: 'Skanuj',
    description: 'Dodawaj numery SN albo zbieraj kolejne sztuki pozycji.',
    icon: ScanLine,
  },
  {
    title: 'Kontroluj status',
    description: 'Licznik i status pokazują postęp, kompletność oraz braki.',
    icon: TimerReset,
  },
  {
    title: 'Zapisz stan pracy',
    description: 'Zachowaj postęp, oznacz brak lub dodaj notatkę do pozycji.',
    icon: MessageSquareText,
  },
]

function WorkflowSection() {
  return (
    <section id="jak-dziala" className="section-shell p-6 md:p-8 lg:p-10">
      <div className="pointer-events-none absolute left-1/2 top-28 h-px w-[80%] -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-300 to-transparent lg:top-[12.2rem]" />
      <SectionHeading
        eyebrow="Jak działa"
        title="Od wyboru dokumentu do zapisanego postępu w pięciu krokach."
        description="Panel webowy i aplikacja Android prowadzą ten sam proces, ale każdy interfejs odpowiada miejscu pracy zespołu."
      />

      <ol className="relative mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {steps.map(({ title, description, icon: Icon }, index) => (
          <li
            key={title}
            className="relative rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-[0_12px_35px_rgba(15,23,42,0.06)]"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700 ring-1 ring-indigo-100">
                <Icon aria-hidden="true" className="h-5 w-5" />
              </span>
              <span className="font-mono text-xs font-black tracking-[0.14em] text-cyan-600">
                0{index + 1}
              </span>
            </div>
            <h3 className="mt-5 text-base font-black text-slate-950">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}

export default WorkflowSection
