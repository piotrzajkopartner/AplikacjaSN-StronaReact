function SectionHeading({ eyebrow, title, description, align = 'left', className = '' }) {
  const alignmentClass = align === 'center' ? 'text-center' : 'text-left'

  return (
    <header className={`${alignmentClass} ${className}`.trim()}>
      {eyebrow ? (
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-600">{eyebrow}</p>
      ) : null}
      {title ? <h2 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">{title}</h2> : null}
      {description ? <p className="mt-3 max-w-3xl text-base text-slate-700">{description}</p> : null}
    </header>
  )
}

export default SectionHeading
