import { MagicCard } from '../magicui/magic-card.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import { CopyX, Lock, History, FileBadge, Server } from 'lucide-react'

const icons = [CopyX, Lock, History, FileBadge, Server]

function FeaturesSection({ content }) {
  return (
    <section id="funkcje" className="space-y-8 animate-fade-in-up">
      <SectionHeading eyebrow={content.subheadline} title={content.headline} />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {content.items.map((item, index) => {
          const Icon = icons[index % icons.length]
          return (
            <MagicCard key={item} className="flex flex-col p-8 hover:border-[#00aeff]/30 cursor-default transition-colors">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#00aeff] mb-6">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg leading-relaxed text-slate-800 font-semibold">{item}</h3>
            </MagicCard>
          )
        })}
      </div>
    </section>
  )
}

export default FeaturesSection
