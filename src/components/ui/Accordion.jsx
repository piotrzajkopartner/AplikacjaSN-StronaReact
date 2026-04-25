import { useMemo, useState } from 'react'

function AccordionItem({ item, isOpen, onToggle, index }) {
  const buttonId = `accordion-button-${index}`
  const panelId = `accordion-panel-${index}`

  return (
    <div className="rounded-xl border border-slate-200 bg-white">
      <h3>
        <button
          id={buttonId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-50"
        >
          <span>{item.question}</span>
          <span
            className={`inline-flex h-6 w-6 items-center justify-center rounded-full border border-slate-300 text-slate-500 ${isOpen ? 'bg-slate-900 text-white border-slate-900' : ''}`.trim()}
            aria-hidden="true"
          >
            {isOpen ? '-' : '+'}
          </span>
        </button>
      </h3>

      {isOpen ? (
        <div
          id={panelId}
          role="region"
          aria-labelledby={buttonId}
          className="border-t border-slate-200 px-4 py-4 text-sm leading-relaxed text-slate-700"
        >
          {item.answer}
        </div>
      ) : null}
    </div>
  )
}

function Accordion({ items = [], defaultOpenIndex = 0, allowCollapse = true, className = '' }) {
  const safeDefaultIndex = useMemo(() => {
    if (items.length === 0) {
      return -1
    }

    return defaultOpenIndex >= 0 && defaultOpenIndex < items.length ? defaultOpenIndex : 0
  }, [defaultOpenIndex, items.length])

  const [openIndex, setOpenIndex] = useState(safeDefaultIndex)

  const handleToggle = (index) => {
    if (allowCollapse && openIndex === index) {
      setOpenIndex(-1)
      return
    }

    setOpenIndex(index)
  }

  if (items.length === 0) {
    return null
  }

  return (
    <div className={`space-y-3 ${className}`.trim()}>
      {items.map((item, index) => (
        <AccordionItem
          key={item.question}
          item={item}
          index={index}
          isOpen={openIndex === index}
          onToggle={() => handleToggle(index)}
        />
      ))}
    </div>
  )
}

export default Accordion
