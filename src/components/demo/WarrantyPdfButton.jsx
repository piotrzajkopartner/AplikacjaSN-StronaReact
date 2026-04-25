import { useEffect, useRef, useState } from 'react'
import Button from '../ui/Button.jsx'
import { buildWarrantyPdf } from '../../lib/pdf/warrantyPdf.js'

function sanitizePart(value) {
  return String(value)
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-zA-Z0-9-_]/g, '')
}

function downloadBlob({ bytes, filename }) {
  const blob = new Blob([bytes], { type: 'application/pdf' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')

  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()

  link.remove()
  URL.revokeObjectURL(url)
}

function WarrantyPdfButton({ warranty, company, labels, assets, product, serial, contractor }) {
  const [state, setState] = useState('idle')
  const resetTimeoutRef = useRef(null)

  useEffect(() => {
    return () => {
      if (resetTimeoutRef.current) {
        window.clearTimeout(resetTimeoutRef.current)
      }
    }
  }, [])

  async function handleDownload() {
    if (resetTimeoutRef.current) {
      window.clearTimeout(resetTimeoutRef.current)
      resetTimeoutRef.current = null
    }

    setState('loading')

    try {
      const pdfBytes = await buildWarrantyPdf({
        warranty,
        company,
        labels,
        assets,
        product,
        serial,
        contractor,
      })

      const filename = `Gwarancja_${sanitizePart(warranty.documentNumber)}_${sanitizePart(serial.code)}.pdf`
      downloadBlob({ bytes: pdfBytes, filename })
      setState('done')

      resetTimeoutRef.current = window.setTimeout(() => {
        setState('idle')
        resetTimeoutRef.current = null
      }, 1500)
    } catch {
      setState('error')
    }
  }

  const disabled = state === 'loading'
  const label =
    state === 'loading'
      ? labels.downloading
      : state === 'error'
        ? labels.error
        : state === 'done'
          ? labels.done
          : labels.idle

  return (
    <Button type="button" variant="secondary" className="min-w-36" disabled={disabled} onClick={handleDownload}>
      {label}
    </Button>
  )
}

export default WarrantyPdfButton
