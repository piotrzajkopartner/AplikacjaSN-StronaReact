function SectionHeading({ eyebrow, title, description, align = 'left', className = '' }) {
  const alignmentClass = align === 'center' ? 'text-center' : 'text-left'
  const descriptionClass = align === 'center' ? 'mx-auto' : ''

  return (
    <header className={`${alignmentClass} ${className}`.trim()}>
      {eyebrow ? (
        <p className="mb-3 inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-brand-blue ring-1 ring-inset ring-blue-500/10">
          {eyebrow}
        </p>
      ) : null}
      {title ? <h2 className="text-3xl font-bold leading-tight tracking-tight text-brand-text md:text-4xl">{title}</h2> : null}
      {description ? (
        <p className={`mt-4 max-w-3xl text-lg leading-relaxed text-brand-muted ${descriptionClass}`.trim()}>
          {description}
        </p>
      ) : null}
    </header>
  )
}

export default SectionHeading
