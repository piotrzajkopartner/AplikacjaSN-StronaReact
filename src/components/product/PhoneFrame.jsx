function PhoneFrame({
  children,
  className = '',
  label = 'Podgląd aplikacji Partner Numery Seryjne na urządzeniu Android',
}) {
  return (
    <section
      aria-label={label}
      className={`relative mx-auto w-full max-w-[23rem] rounded-[2.75rem] border border-slate-700 bg-slate-900 p-2.5 shadow-[0_28px_70px_rgba(15,23,42,0.24)] ${className}`.trim()}
    >
      <span
        aria-hidden="true"
        className="absolute -right-1 top-28 h-16 w-1 rounded-r-full bg-slate-700"
      />
      <span
        aria-hidden="true"
        className="absolute -left-1 top-24 h-11 w-1 rounded-l-full bg-slate-700"
      />
      <div className="overflow-hidden rounded-[2.15rem] bg-slate-50 ring-1 ring-white/10">
        <div
          aria-hidden="true"
          className="relative flex h-7 items-center justify-between bg-slate-950 px-5 text-[0.625rem] font-bold tracking-wide text-white"
        >
          <span>DEMO</span>
          <span className="absolute left-1/2 top-1.5 h-3.5 w-16 -translate-x-1/2 rounded-full bg-black" />
          <span>ANDROID</span>
        </div>
        {children}
        <div aria-hidden="true" className="flex h-6 items-center justify-center bg-white">
          <span className="h-1 w-24 rounded-full bg-slate-300" />
        </div>
      </div>
    </section>
  )
}

export default PhoneFrame
