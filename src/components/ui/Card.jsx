function Card({ children, className = '', as: Component = 'article' }) {
  const classes = `rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_1px_2px_0_rgba(2,6,23,0.06)] transition-shadow duration-200 hover:shadow-[0_10px_25px_-20px_rgba(2,6,23,0.45)] ${className}`.trim()

  return <Component className={classes}>{children}</Component>
}

export default Card
