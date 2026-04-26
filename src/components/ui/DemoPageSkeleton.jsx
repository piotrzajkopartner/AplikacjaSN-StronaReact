function DemoPageSkeleton() {
  return (
    <div className="space-y-8 md:space-y-10 animate-pulse">
      <section className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-xl shadow-slate-200/50 md:p-10">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            <div className="h-6 w-48 rounded-full bg-slate-200" />
            <div className="space-y-2">
              <div className="h-10 w-3/4 rounded bg-slate-200" />
              <div className="h-10 w-1/2 rounded bg-slate-200" />
            </div>
            <div className="space-y-2 mt-6">
              <div className="h-4 w-full rounded bg-slate-100" />
              <div className="h-4 w-5/6 rounded bg-slate-100" />
              <div className="h-4 w-4/6 rounded bg-slate-100" />
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <div className="h-10 w-40 rounded-lg bg-slate-200" />
              <div className="h-10 w-36 rounded-lg bg-slate-100" />
            </div>
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 rounded-2xl bg-slate-100 border border-slate-200/60" />
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-slate-50 p-3 shadow-sm md:p-4">
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <div className="h-16 border-b border-slate-200 flex items-center px-4 gap-3">
            <div className="h-10 w-10 rounded-lg bg-slate-200" />
            <div className="h-5 w-48 rounded bg-slate-200" />
            <div className="ml-auto flex gap-2">
              <div className="h-8 w-8 rounded bg-slate-100" />
              <div className="h-8 w-8 rounded bg-slate-100" />
            </div>
          </div>
          <div className="p-6 space-y-3">
            <div className="h-12 rounded-lg bg-slate-100" />
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-[68px] rounded-lg border border-slate-100 p-2 flex items-center gap-3">
                <div className="h-10 w-10 shrink-0 rounded-md bg-slate-100" />
                <div className="space-y-1.5 flex-1">
                  <div className="h-4 w-48 rounded bg-slate-100" />
                  <div className="h-3 w-72 rounded bg-slate-50" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default DemoPageSkeleton
