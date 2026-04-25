function PlaceholderImage({ title, description, alt, className = '', ratio = '16/9' }) {
  return (
    <div
      role="img"
      aria-label={alt || title}
      className={`relative overflow-hidden rounded-2xl border border-slate-300/80 bg-gradient-to-br from-slate-100 via-slate-50 to-blue-50 ${className}`.trim()}
      style={{ aspectRatio: ratio }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(15,23,42,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.08) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
      <div className="relative flex h-full w-full flex-col items-center justify-center px-6 text-center">
        <p className="text-sm font-semibold text-slate-800">{title}</p>
        {description ? <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-600">{description}</p> : null}
      </div>
    </div>
  )
}

export default PlaceholderImage
