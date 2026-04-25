import { Link } from 'react-router-dom'

const variantClasses = {
  primary:
    'border border-blue-950 bg-blue-950 text-white shadow-sm hover:bg-blue-900 hover:border-blue-900 focus-visible:outline-blue-900',
  secondary:
    'border border-slate-300 bg-white text-slate-900 hover:border-slate-400 hover:bg-slate-50 focus-visible:outline-slate-500',
  ghost: 'bg-transparent text-slate-700 hover:bg-slate-100 focus-visible:outline-slate-500',
}

function Button({
  children,
  variant = 'primary',
  to,
  href,
  type = 'button',
  className = '',
  disabled = false,
  ...props
}) {
  const baseClassName =
    'inline-flex min-h-10 items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60'
  const classes = `${baseClassName} ${variantClasses[variant] ?? variantClasses.primary} ${className}`.trim()

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button type={type} className={classes} disabled={disabled} {...props}>
      {children}
    </button>
  )
}

export default Button
