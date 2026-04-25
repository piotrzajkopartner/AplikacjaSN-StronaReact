import { useState } from 'react'
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

function ContactForm({ content }) {
  const fields = content?.fields ?? {}
  const validationMessages = content?.validationMessages ?? {}
  const states = content?.states ?? { idle: 'idle', submitting: 'submitting', success: 'success' }

  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState(states.idle)

  const handleChange = (event) => {
    const { name, value } = event.target

    setValues((currentValues) => ({
      ...currentValues,
      [name]: name === 'taxId' ? normalizeTaxId(value) : value,
    }))

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: '',
    }))
  }

  const validate = () => {
    const nextErrors = {}

    if (!values.fullName.trim()) {
      nextErrors.fullName = validationMessages.required || 'This field is required.'
    }

    if (!values.email.trim()) {
      nextErrors.email = validationMessages.required || 'This field is required.'
    } else if (!emailRegex.test(values.email.trim())) {
      nextErrors.email = validationMessages.email || 'Enter a valid email address.'
    }

    if (!values.phone.trim()) {
      nextErrors.phone = validationMessages.required || 'This field is required.'
    }

    if (!values.taxId.trim()) {
      nextErrors.taxId = validationMessages.required || 'This field is required.'
    } else if (!nipRegex.test(values.taxId.trim())) {
      nextErrors.taxId = validationMessages.taxId || 'Enter a valid tax ID.'
    }

    return nextErrors
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const nextErrors = validate()

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    setStatus(states.submitting)

    await new Promise((resolve) => {
      setTimeout(resolve, 800)
    })

    setStatus(states.success)
  }

  if (status === states.success) {
    return (
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5 text-sm text-emerald-800">
        {content?.successMessage || 'Message sent successfully.'}
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
          error={errors.fullName}
          required={fields.fullName?.required ?? true}
          placeholder={fields.fullName?.placeholder || ''}
        />
        <FormField
          name="email"
          type="email"
          label={fields.email?.label || 'Email'}
          value={values.email}
          onChange={handleChange}
          error={errors.email}
          required={fields.email?.required ?? true}
          placeholder={fields.email?.placeholder || ''}
        />
        <FormField
          name="phone"
          label={fields.phone?.label || 'Phone'}
          value={values.phone}
          onChange={handleChange}
          error={errors.phone}
          required={fields.phone?.required ?? true}
          placeholder={fields.phone?.placeholder || ''}
        />
        <FormField
          name="taxId"
          label={fields.taxId?.label || 'Tax ID'}
          value={values.taxId}
          onChange={handleChange}
          error={errors.taxId}
          required={fields.taxId?.required ?? true}
          placeholder={fields.taxId?.placeholder || ''}
          inputMode="numeric"
          maxLength={10}
        />
      </div>

      <FormField
        name="message"
        label={fields.message?.label || 'Message'}
        value={values.message}
        onChange={handleChange}
        error={errors.message}
        required={fields.message?.required ?? false}
        placeholder={fields.message?.placeholder || ''}
        as="textarea"
      />

      <Button type="submit" disabled={status === states.submitting}>
        {status === states.submitting ? 'Sending...' : content?.buttonLabel || 'Submit'}
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
  error,
  required,
  placeholder,
  ...props
}) {
  const commonClassName =
    'mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-200'

  return (
    <label className="block text-sm font-medium text-slate-800">
      {label}
      {required ? <span className="ml-1 text-rose-600">*</span> : null}
      {as === 'textarea' ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          className={commonClassName}
          placeholder={placeholder}
          rows={4}
          {...props}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className={commonClassName}
          placeholder={placeholder}
          {...props}
        />
      )}
      {error ? <span className="mt-1 block text-xs text-rose-600">{error}</span> : null}
    </label>
  )
}

export default ContactForm
