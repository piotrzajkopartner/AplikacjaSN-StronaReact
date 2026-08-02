import { useState } from 'react'
import Button from './Button.jsx'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const nipRegex = /^\d{10}$/
const phoneCharactersRegex = /^\+?[\d\s().-]+$/
const nipWeights = [6, 5, 7, 2, 3, 4, 5, 6, 7]

const initialValues = {
  fullName: '',
  email: '',
  phone: '',
  taxId: '',
  message: '',
}

function normalizeTaxId(value) {
  return value.replace(/\D/g, '')
}

function isValidTaxId(value) {
  if (!nipRegex.test(value)) return false

  const checksum = nipWeights.reduce(
    (sum, weight, index) => sum + Number(value[index]) * weight,
    0,
  ) % 11

  return checksum !== 10 && checksum === Number(value[9])
}

function isValidPhone(value) {
  if (!phoneCharactersRegex.test(value)) return false

  const digits = value.replace(/\D/g, '')
  return digits.length >= 9 && digits.length <= 15 && !/^(\d)\1+$/.test(digits)
}

function validateField(name, value, fieldsConfig, messages) {
  const trimmedValue = value.trim()
  const isRequired = fieldsConfig?.[name]?.required ?? false

  if (isRequired && !trimmedValue) {
    return messages.required || 'To pole jest wymagane.'
  }

  if (!trimmedValue) {
    return ''
  }

  if (name === 'email' && !emailRegex.test(trimmedValue)) {
    return messages.email || 'Wpisz poprawny adres e-mail.'
  }

  if (name === 'phone' && !isValidPhone(trimmedValue)) {
    return messages.phone || 'Wpisz poprawny numer telefonu.'
  }

  if (name === 'taxId' && !isValidTaxId(trimmedValue)) {
    return messages.taxId || 'Wpisz poprawny NIP.'
  }

  return ''
}

function ContactForm({ content }) {
  const fields = content?.fields ?? {}
  const validationMessages = content?.validationMessages ?? {}
  const states = {
    idle: content?.states?.idle || 'idle',
    submitting: content?.states?.submitting || 'submitting',
    verified: content?.states?.verified || 'verified',
  }

  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [wasSubmitted, setWasSubmitted] = useState(false)
  const [status, setStatus] = useState(states.idle)
  const [submitError, setSubmitError] = useState('')

  const isSubmitting = status === states.submitting
  const isVerified = status === states.verified
  const visibleErrors = Object.entries(errors).filter(([, error]) => Boolean(error))

  const handleChange = (event) => {
    const { name, value } = event.target

    const nextValue = name === 'taxId' ? normalizeTaxId(value) : value

    setValues((currentValues) => ({
      ...currentValues,
      [name]: nextValue,
    }))

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: '',
    }))

    if (submitError) {
      setSubmitError('')
    }
  }

  const handleBlur = (event) => {
    const { name, value } = event.target

    const fieldError = validateField(name, value, fields, validationMessages)

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: fieldError,
    }))
  }

  const validate = () => {
    const nextErrors = {}

    Object.keys(initialValues).forEach((name) => {
      const fieldError = validateField(name, values[name], fields, validationMessages)

      if (fieldError) {
        nextErrors[name] = fieldError
      }
    })

    return nextErrors
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const nextErrors = validate()

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      setWasSubmitted(true)
      return
    }

    setWasSubmitted(false)
    setSubmitError('')
    setStatus(states.submitting)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      const data = await response.json().catch(() => ({}))

      if (!response.ok || data.success === false) {
        throw new Error(data.error || 'Wystąpił problem podczas wysyłania wiadomości.')
      }

      setStatus(states.verified)
    } catch (err) {
      console.error('Błąd wysyłki formularza:', err)
      setSubmitError(err.message || 'Wystąpił błąd podczas wysyłania. Spróbuj ponownie za chwilę.')
      setStatus(states.idle)
    }
  }

  const handleReset = () => {
    setValues(initialValues)
    setErrors({})
    setWasSubmitted(false)
    setSubmitError('')
    setStatus(states.idle)
  }

  return (
    <div className="space-y-5">
      {content?.formNotice ? (
        <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-relaxed text-amber-900">
          {content.formNotice}
        </p>
      ) : null}

      {submitError ? (
        <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-900" role="alert">
          <p className="font-semibold">Błąd wysyłania:</p>
          <p className="mt-1">{submitError}</p>
        </div>
      ) : null}

      {isVerified ? (
        <div className="space-y-4 rounded-xl border border-emerald-200 bg-emerald-50/80 p-6 text-sm text-emerald-950 shadow-sm" role="status" aria-live="polite">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white font-bold text-lg">
              ✓
            </div>
            <div>
              <p className="font-bold text-base text-emerald-950">Wiadomość została wysłana!</p>
              <p className="mt-0.5 text-emerald-800">{content?.verifiedMessage || 'Dziękujemy za kontakt. Skontaktujemy się z Tobą najszybciej jak to możliwe.'}</p>
            </div>
          </div>
          <div className="pt-2">
            <Button type="button" variant="secondary" onClick={handleReset}>
              {content?.resetLabel || 'Wyślij kolejną wiadomość'}
            </Button>
          </div>
        </div>
      ) : (
        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          {wasSubmitted && visibleErrors.length > 0 ? (
            <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-900" role="alert" aria-live="assertive">
              <p className="font-semibold">{content?.validationSummary || 'Formularz zawiera błędy:'}</p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                {visibleErrors.map(([name, error]) => (
                  <li key={name}>
                    <a className="underline decoration-rose-300 underline-offset-2" href={`#contact-${name}`}>
                      {fields[name]?.label || name}: {error}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              name="fullName"
              label={fields.fullName?.label || 'Imię i nazwisko'}
              value={values.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.fullName}
              required={fields.fullName?.required ?? true}
              placeholder={fields.fullName?.placeholder || ''}
              autoComplete="name"
              disabled={isSubmitting}
            />
            <FormField
              name="email"
              type="email"
              label={fields.email?.label || 'E-mail'}
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.email}
              required={fields.email?.required ?? true}
              placeholder={fields.email?.placeholder || ''}
              autoComplete="email"
              disabled={isSubmitting}
            />
            <FormField
              name="phone"
              type="tel"
              label={fields.phone?.label || 'Telefon'}
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.phone}
              required={fields.phone?.required ?? true}
              placeholder={fields.phone?.placeholder || ''}
              autoComplete="tel"
              disabled={isSubmitting}
            />
            <FormField
              name="taxId"
              label={fields.taxId?.label || 'NIP firmy'}
              value={values.taxId}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.taxId}
              required={fields.taxId?.required ?? true}
              placeholder={fields.taxId?.placeholder || ''}
              inputMode="numeric"
              maxLength={10}
              autoComplete="off"
              disabled={isSubmitting}
            />
          </div>

          <FormField
            name="message"
            label={fields.message?.label || 'Wiadomość'}
            value={values.message}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.message}
            required={fields.message?.required ?? false}
            placeholder={fields.message?.placeholder || ''}
            as="textarea"
            autoComplete="off"
            disabled={isSubmitting}
          />

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? content?.submittingLabel || 'Sprawdzanie...' : content?.buttonLabel || 'Sprawdź formularz'}
          </Button>
        </form>
      )}
    </div>
  )
}

function FormField({
  as = 'input',
  type = 'text',
  label,
  name,
  value,
  onChange,
  onBlur,
  error,
  required,
  placeholder,
  disabled = false,
  ...props
}) {
  const fieldId = `contact-${name}`
  const errorId = `${fieldId}-error`

  const commonClassName =
    'mt-2 w-full border-0 border-b-2 bg-transparent px-0 py-2 text-base text-brand-text outline-none transition-all placeholder:text-slate-400 focus:ring-0 focus:border-brand-blue disabled:cursor-not-allowed disabled:border-slate-100 disabled:text-slate-500 ' +
    (error
      ? 'border-rose-400 focus:border-rose-500'
      : 'border-slate-200 hover:border-slate-300')

  return (
    <label htmlFor={fieldId} className="block text-sm font-semibold text-brand-text">
      {label}
      {required ? (
        <>
          <span className="ml-1 text-rose-600" aria-hidden="true">*</span>
          <span className="sr-only"> (pole wymagane)</span>
        </>
      ) : null}
      {as === 'textarea' ? (
        <textarea
          id={fieldId}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={commonClassName}
          placeholder={placeholder}
          rows={4}
          aria-invalid={Boolean(error)}
          aria-required={required}
          aria-describedby={error ? errorId : undefined}
          disabled={disabled}
          {...props}
        />
      ) : (
        <input
          id={fieldId}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={commonClassName}
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          aria-required={required}
          aria-describedby={error ? errorId : undefined}
          disabled={disabled}
          {...props}
        />
      )}
      {error ? (
        <span id={errorId} className="mt-1 block text-xs text-rose-600">
          {error}
        </span>
      ) : null}
    </label>
  )
}

export default ContactForm
