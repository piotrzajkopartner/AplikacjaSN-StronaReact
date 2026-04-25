import { cn } from "../../lib/utils"

export const ShinyText = ({ children, className }) => {
  return (
    <span
      className={cn(
        "inline-block bg-gradient-to-r from-[#00aeff] via-[#66cfff] to-[#00aeff] bg-clip-text text-transparent bg-[length:200%_auto] font-medium",
        className
      )}
      style={{
        animation: "shiny 3s linear infinite",
      }}
    >
      <style>{`
        @keyframes shiny {
          0% { background-position: 0% center; }
          100% { background-position: -200% center; }
        }
      `}</style>
      {children}
    </span>
  )
}
