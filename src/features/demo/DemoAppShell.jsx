import DemoStandaloneApp from './standalone/App.jsx'
import './demo.css'

function DemoAppShell() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-slate-50 p-3 shadow-sm md:p-4">
      <div className="sn-demo overflow-hidden rounded-xl border border-slate-200 bg-white">
        <DemoStandaloneApp />
      </div>
    </section>
  )
}

export default DemoAppShell
