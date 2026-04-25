import { Link } from 'react-router-dom'
import { ShimmerButton } from '../magicui/shimmer-button.jsx'
const variantClasses = {
  primary:
    'border border-brand-blue bg-brand-blue text-white shadow-md shadow-brand-blue/30 hover:bg-brand-blue-hover hover:border-brand-blue-hover hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-blue/40 focus-visible:outline-brand-blue',
  secondary:
    'border border-slate-200 bg-white text-brand-text hover:border-slate-300 hover:bg-slate-50 hover:-translate-y-0.5 hover:shadow-sm focus-visible:outline-slate-200',
  ghost: 'bg-transparent text-brand-muted hover:bg-slate-50 hover:text-brand-text focus-visible:outline-slate-200',
  premium: 'premium',
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

  if (variant === 'premium') {
    return (
      <ShimmerButton to={to} href={href} className={className} disabled={disabled} {...props}>
        {children}
      </ShimmerButton>
    )
  }

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
