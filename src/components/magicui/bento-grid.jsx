import { ArrowRight } from "lucide-react"
import { cn } from "../../lib/utils"
import { Button } from "../ui/Button"
import { MagicCard } from "./magic-card"

const BentoGrid = ({ children, className, ...props }) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[22rem] grid-cols-3 gap-6",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  ...props
}) => (
  <MagicCard
    gradientColor="#00aeff15"
    gradientSize={300}
    className={cn(
      "group relative flex flex-col justify-between overflow-hidden p-0",
      className
    )}
    {...props}
  >
    <div className="absolute inset-0 z-0">{background}</div>
    <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 lg:p-8 transition-all duration-300 group-hover:-translate-y-2 h-full justify-start">
      <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-blue-50 text-[#00aeff] mb-4 origin-left transform-gpu transition-all duration-300 ease-in-out group-hover:scale-95 group-hover:shadow-sm">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-xl font-bold text-slate-800 tracking-tight">
        {name}
      </h3>
      <p className="max-w-lg text-slate-600 mt-2 leading-relaxed">{description}</p>
    </div>

    {href && cta && (
      <div
        className={cn(
          "pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-6 lg:p-8 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
        )}
      >
        <Button
          variant="ghost"
          href={href}
          className="pointer-events-auto p-0 text-[#00aeff] hover:text-[#008bc9] hover:bg-transparent font-semibold"
        >
          {cta}
          <ArrowRight className="ms-2 h-4 w-4" />
        </Button>
      </div>
    )}

    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-slate-50/20" />
  </MagicCard>
)

export { BentoCard, BentoGrid }
