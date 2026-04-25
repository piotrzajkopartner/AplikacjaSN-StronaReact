function PlaceholderImage({ title, description, alt, className = '', ratio = '16/9' }) {
  return (
    <div
      role="img"
      aria-label={alt || title}
      className={`overflow-hidden rounded-xl border border-dashed border-slate-300 bg-gradient-to-br from-slate-100 to-slate-200 ${className}`.trim()}
      style={{ aspectRatio: ratio }}
    >
      <div className="flex h-full w-full flex-col items-center justify-center px-6 text-center">
        <p className="text-sm font-semibold text-slate-700">{title}</p>
        {description ? <p className="mt-2 text-sm text-slate-600">{description}</p> : null}
      </div>
    </div>
  )
}

export default PlaceholderImage
