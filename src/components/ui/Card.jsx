function Card({ children, className = '', as: Component = 'article' }) {
  const classes = `rounded-2xl border border-slate-200/80 bg-white/82 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.07)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-sky-200 hover:shadow-[0_24px_70px_rgba(14,165,233,0.12)] ${className}`.trim()

  return <Component className={classes}>{children}</Component>
}

export default Card
