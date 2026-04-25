function Card({ children, className = '', as: Component = 'article' }) {
  const classes = `rounded-xl border border-slate-200 bg-white p-6 shadow-sm ${className}`.trim()

  return <Component className={classes}>{children}</Component>
}

export default Card
