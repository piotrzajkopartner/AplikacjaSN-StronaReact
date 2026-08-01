import ScannerSimulation from '../product/ScannerSimulation.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'

function ScannerSection() {
  return (
    <section id="skanowanie" className="space-y-8">
      <SectionHeading
        eyebrow="Skanowanie"
        title="Pojedynczy odczyt albo seria kodów, zależnie od zadania."
        description="Tryb pojedynczy zatwierdza jeden kod, a seryjny prowadzi przez kolejne numery. Wąski celownik pomaga wskazać kod w gęstym układzie, natomiast pełny kadr ułatwia odczyt większego obszaru."
      />
      <ScannerSimulation />
    </section>
  )
}

export default ScannerSection
