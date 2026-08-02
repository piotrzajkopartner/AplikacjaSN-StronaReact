// Vercel Serverless Function - Wysyłka formularza kontaktowego
// Endpoint: /api/contact

const NIP_WEIGHTS = [6, 5, 7, 2, 3, 4, 5, 6, 7]

function validateTaxId(taxId) {
  const cleanTaxId = taxId.replace(/\D/g, '')
  if (cleanTaxId.length !== 10) return false
  const checksum = NIP_WEIGHTS.reduce((sum, weight, idx) => sum + Number(cleanTaxId[idx]) * weight, 0) % 11
  return checksum !== 10 && checksum === Number(cleanTaxId[9])
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export default async function handler(req, res) {
  // Zapewnienie obsługi tylko metodą POST
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' })
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {}
    const { fullName, email, phone, taxId, message } = body

    // Walidacja pól po stronie serwera
    if (!fullName || !fullName.trim()) {
      return res.status(400).json({ success: false, error: 'Imię i nazwisko jest wymagane.' })
    }
    if (!email || !validateEmail(email)) {
      return res.status(400).json({ success: false, error: 'Podaj poprawny adres e-mail.' })
    }
    if (!phone || !phone.trim()) {
      return res.status(400).json({ success: false, error: 'Numer telefonu jest wymagany.' })
    }
    if (!taxId || !validateTaxId(taxId)) {
      return res.status(400).json({ success: false, error: 'Podaj poprawny NIP firmy (10 cyfr).' })
    }

    const recipientEmail = process.env.CONTACT_EMAIL || 'biuro@partner-net.pl'
    const resendApiKey = process.env.RESEND_API_KEY
    const smtpHost = process.env.SMTP_HOST

    const emailSubject = `Zapytanie ze strony: ${fullName} (${taxId})`
    const emailHtmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; line-height: 1.6;">
        <h2 style="color: #0f172a; border-bottom: 2px solid #00aeff; padding-bottom: 8px;">
          Nowe zapytanie kontaktowe z witryny Partner Numery Seryjne
        </h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; width: 140px;">Imię i nazwisko:</td>
            <td style="padding: 8px 0;">${fullName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">E-mail:</td>
            <td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Telefon:</td>
            <td style="padding: 8px 0;"><a href="tel:${phone}">${phone}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">NIP firmy:</td>
            <td style="padding: 8px 0;">${taxId}</td>
          </tr>
        </table>
        
        <div style="margin-top: 20px; padding: 16px; background-color: #f8fafc; border-left: 4px solid #00aeff; border-radius: 4px;">
          <h4 style="margin: 0 0 8px 0; color: #1e293b;">Treść wiadomości:</h4>
          <p style="margin: 0; whitespace: pre-wrap;">${message || '(Brak dodatkowej treści)'}</p>
        </div>

        <p style="margin-top: 24px; font-size: 12px; color: #64748b;">
          Wiadomość została wysłana z formularza kontaktowego na stronie Partner Numery Seryjne.
        </p>
      </div>
    `

    // Option 1: Resend API (Zalecane na Vercel)
    if (resendApiKey) {
      const senderEmail = process.env.SENDER_EMAIL || 'Partner Contact <kontakt@numeryseryjne-nexo.pl>'

      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: senderEmail,
          to: [recipientEmail],
          reply_to: email,
          subject: emailSubject,
          html: emailHtmlContent
        })
      })

      const resendData = await response.json()

      if (!response.ok) {
        console.error('Błąd Resend API:', resendData)
        const detailedError = resendData?.message || resendData?.error || 'Nie udało się wysłać wiadomości e-mail.'
        return res.status(response.status || 500).json({
          success: false,
          error: detailedError
        })
      }

      return res.status(200).json({ success: true, message: 'Wiadomość wysłana pomyślnie.' })
    }

    // Option 2: Webhook / Formspree / Custom SMTP webhook fallback
    if (process.env.WEBHOOK_URL) {
      const response = await fetch(process.env.WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, phone, taxId, message })
      })

      if (response.ok) {
        return res.status(200).json({ success: true, message: 'Wiadomość wysłana pomyślnie.' })
      }
    }

    // W przypadku braku skonfigurowanych zmiennych środowiskowych na Vercel (np. w środowisku deweloperskim)
    console.warn('Uwaga: Brak zmiennej RESEND_API_KEY na Vercel. Zgłoszenie przyjęte lokalnie:', { fullName, email, phone, taxId, message })
    
    return res.status(200).json({
      success: true,
      message: 'Formularz został odebrany. (Tryb oczekiwania na klucz API poczty na Vercel)'
    })

  } catch (error) {
    console.error('Błąd w funkcji api/contact:', error)
    return res.status(500).json({ success: false, error: 'Wystąpił wewnętrzny błąd serwera.' })
  }
}
