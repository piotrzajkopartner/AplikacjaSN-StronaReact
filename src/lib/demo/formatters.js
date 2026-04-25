const dateFormatter = new Intl.DateTimeFormat('pl-PL')
const currencyFormatter = new Intl.NumberFormat('pl-PL', {
  style: 'currency',
  currency: 'PLN',
})

export function formatDate(value) {
  return dateFormatter.format(new Date(value))
}

export function formatCurrency(value) {
  return currencyFormatter.format(value)
}

export function formatVat(rate) {
  return `${rate}%`
}
