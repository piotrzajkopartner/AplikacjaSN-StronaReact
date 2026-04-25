function SectionHeading({ eyebrow, title, description, align = 'left', className = '' }) {
  const alignmentClass = align === 'center' ? 'text-center' : 'text-left'
  const descriptionClass = align === 'center' ? 'mx-auto' : ''

  return (
    <header className={`${alignmentClass} ${className}`.trim()}>
      {eyebrow ? (
        <p className="mb-3 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-slate-700">
          {eyebrow}
        </p>
      ) : null}
      {title ? <h2 className="text-2xl font-bold leading-tight tracking-tight text-slate-950 md:text-3xl">{title}</h2> : null}
      {description ? (
        <p className={`mt-4 max-w-3xl text-base leading-relaxed text-slate-700 ${descriptionClass}`.trim()}>
          {description}
        </p>
      ) : null}
    </header>
  )
}

export default SectionHeading
