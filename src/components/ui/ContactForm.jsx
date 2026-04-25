import { useMemo, useState } from 'react'
import Button from './Button.jsx'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const nipRegex = /^\d{10}$/

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

function validateField(name, value, fieldsConfig, messages) {
  const trimmedValue = value.trim()
  const isRequired = fieldsConfig?.[name]?.required ?? false

  if (isRequired && !trimmedValue) {
    return messages.required || 'This field is required.'
  }

  if (!trimmedValue) {
    return ''
  }

  if (name === 'email' && !emailRegex.test(trimmedValue)) {
    return messages.email || 'Enter a valid email address.'
  }

  if (name === 'taxId' && !nipRegex.test(trimmedValue)) {
    return messages.taxId || 'Enter a valid tax ID.'
  }

  return ''
}

function ContactForm({ content }) {
  const fields = content?.fields ?? {}
  const validationMessages = content?.validationMessages ?? {}

  const states = useMemo(
    () => ({
      idle: content?.states?.idle || 'idle',
      submitting: content?.states?.submitting || 'submitting',
      success: content?.states?.success || 'success',
    }),
    [content?.states?.idle, content?.states?.submitting, content?.states?.success],
  )

  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState(states.idle)

  const isSubmitting = status === states.submitting

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

  const mockSubmit = () =>
    new Promise((resolve) => {
      setTimeout(resolve, 900)
    })

  const handleSubmit = async (event) => {
    event.preventDefault()

    const nextErrors = validate()

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    setStatus(states.submitting)

    await mockSubmit()

    setStatus(states.success)
  }

  const handleReset = () => {
    setValues(initialValues)
    setErrors({})
    setStatus(states.idle)
  }

  if (status === states.success) {
    return (
      <div className="space-y-4 rounded-xl border border-emerald-200 bg-emerald-50 p-5 text-sm text-emerald-800">
        <p>{content?.successMessage || 'Message sent successfully.'}</p>
        <Button type="button" variant="secondary" onClick={handleReset}>
          Wyslij kolejna wiadomosc
        </Button>
      </div>
    )
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit} noValidate>
      <div className="grid gap-4 md:grid-cols-2">
        <FormField
          name="fullName"
          label={fields.fullName?.label || 'Full name'}
          value={values.fullName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.fullName}
          required={fields.fullName?.required ?? true}
          placeholder={fields.fullName?.placeholder || ''}
          disabled={isSubmitting}
        />
        <FormField
          name="email"
          type="email"
          label={fields.email?.label || 'Email'}
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.email}
          required={fields.email?.required ?? true}
          placeholder={fields.email?.placeholder || ''}
          disabled={isSubmitting}
        />
        <FormField
          name="phone"
          label={fields.phone?.label || 'Phone'}
          value={values.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.phone}
          required={fields.phone?.required ?? true}
          placeholder={fields.phone?.placeholder || ''}
          disabled={isSubmitting}
        />
        <FormField
          name="taxId"
          label={fields.taxId?.label || 'Tax ID'}
          value={values.taxId}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.taxId}
          required={fields.taxId?.required ?? true}
          placeholder={fields.taxId?.placeholder || ''}
          inputMode="numeric"
          maxLength={10}
          disabled={isSubmitting}
        />
      </div>

      <FormField
        name="message"
        label={fields.message?.label || 'Message'}
        value={values.message}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.message}
        required={fields.message?.required ?? false}
        placeholder={fields.message?.placeholder || ''}
        as="textarea"
        disabled={isSubmitting}
      />

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Wysylanie...' : content?.buttonLabel || 'Submit'}
      </Button>
    </form>
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
      {required ? <span className="ml-1 text-rose-600">*</span> : null}
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
