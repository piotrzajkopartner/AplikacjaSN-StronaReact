function Card({ children, className = '', as: Component = 'article' }) {
  const classes = `rounded-2xl border border-slate-100 bg-white p-6 shadow-xl shadow-slate-200/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-200/60 ${className}`.trim()

  return <Component className={classes}>{children}</Component>
}

export default Card
