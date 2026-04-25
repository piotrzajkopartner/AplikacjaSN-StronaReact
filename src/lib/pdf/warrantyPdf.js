import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'

const dateFormatter = new Intl.DateTimeFormat('pl-PL')

function formatDate(value) {
  return dateFormatter.format(new Date(value))
}

function toPdfText(value) {
  return String(value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

function getExtension(path) {
  return path.toLowerCase().split('?')[0].split('.').pop()
}

async function embedImageFromPath(pdfDoc, imagePath) {
  const response = await fetch(imagePath)
  if (!response.ok) {
    throw new Error(`Cannot load image: ${imagePath}`)
  }

  const bytes = await response.arrayBuffer()
  const extension = getExtension(imagePath)

  if (extension === 'png') {
    return pdfDoc.embedPng(bytes)
  }

  return pdfDoc.embedJpg(bytes)
}

function drawLabeledValue(page, font, x, y, label, value, color = rgb(0.11, 0.18, 0.32)) {
  page.drawText(toPdfText(label), {
    x,
    y,
    size: 9,
    font,
    color: rgb(0.44, 0.5, 0.63),
  })

  page.drawText(toPdfText(value), {
    x,
    y: y - 14,
    size: 11,
    font,
    color,
  })
}

export async function buildWarrantyPdf({ warranty, company, product, serial, contractor, labels, assets }) {
  const pdfDoc = await PDFDocument.create()
  const page = pdfDoc.addPage([595.28, 841.89])
  const width = page.getWidth()
  const height = page.getHeight()
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold)

  let logoImage = null
  let watermarkImage = null

  if (assets?.logoPrimary || assets?.logoFallback) {
    try {
      if (assets?.logoPrimary) {
        logoImage = await embedImageFromPath(pdfDoc, assets.logoPrimary)
      }
    } catch {
      try {
        if (assets?.logoFallback) {
          logoImage = await embedImageFromPath(pdfDoc, assets.logoFallback)
        }
      } catch {
        logoImage = null
      }
    }
  }

  if (assets?.watermark) {
    try {
      watermarkImage = await embedImageFromPath(pdfDoc, assets.watermark)
    } catch {
      watermarkImage = null
    }
  }

  if (watermarkImage) {
    const scaled = watermarkImage.scale(0.9)
    page.drawImage(watermarkImage, {
      x: (width - scaled.width) / 2,
      y: (height - scaled.height) / 2 - 40,
      width: scaled.width,
      height: scaled.height,
      opacity: 0.09,
    })
  }

  page.drawRectangle({
    x: 0,
    y: height - 126,
    width,
    height: 126,
    color: rgb(0.06, 0.12, 0.23),
  })

  if (logoImage) {
    const scaledLogo = logoImage.scale(0.34)
    page.drawImage(logoImage, {
      x: 42,
      y: height - 92,
      width: scaledLogo.width,
      height: scaledLogo.height,
    })
  }

  page.drawText(toPdfText(company.name), {
    x: logoImage ? 280 : 42,
    y: height - 54,
    size: 24,
    font: fontBold,
    color: rgb(0.32, 0.94, 0.81),
  })

  page.drawText(toPdfText(company.tagline), {
    x: logoImage ? 280 : 42,
    y: height - 78,
    size: 11,
    font,
    color: rgb(0.84, 0.9, 0.98),
  })

  page.drawText(toPdfText(labels.documentTitle), {
    x: 42,
    y: height - 112,
    size: 14,
    font: fontBold,
    color: rgb(1, 1, 1),
  })

  drawLabeledValue(page, font, 42, height - 168, labels.warrantyNumber, warranty.warrantyNumber)
  drawLabeledValue(page, font, 280, height - 168, labels.documentNumber, warranty.documentNumber)

  drawLabeledValue(page, font, 42, height - 224, labels.companyName, company.legalName)
  drawLabeledValue(page, font, 42, height - 274, labels.companyAddress, company.address)
  drawLabeledValue(page, font, 42, height - 324, labels.companyTaxId, company.taxId)

  drawLabeledValue(page, font, 42, height - 390, labels.clientName, contractor.name)
  drawLabeledValue(page, font, 42, height - 440, labels.clientTaxId, contractor.taxId)
  drawLabeledValue(page, font, 42, height - 490, labels.clientCity, contractor.city)

  drawLabeledValue(page, font, 320, height - 224, labels.productName, product.name)
  drawLabeledValue(page, font, 320, height - 274, labels.productSku, product.sku)
  drawLabeledValue(page, font, 320, height - 324, labels.serialNumber, serial.code)
  drawLabeledValue(page, font, 320, height - 390, labels.saleDate, formatDate(warranty.soldAt))
  drawLabeledValue(page, font, 320, height - 440, labels.validUntil, formatDate(warranty.validUntil))
  drawLabeledValue(page, font, 320, height - 490, labels.warrantyPeriod, `${warranty.warrantyMonths} mies.`)

  page.drawRectangle({
    x: 42,
    y: 150,
    width: width - 84,
    height: 150,
    borderWidth: 1,
    borderColor: rgb(0.87, 0.9, 0.95),
    color: rgb(0.97, 0.98, 1),
  })

  page.drawText(toPdfText(labels.termsTitle), {
    x: 56,
    y: 278,
    size: 11,
    font: fontBold,
    color: rgb(0.11, 0.18, 0.32),
  })

  const terms = labels.terms
  terms.forEach((term, index) => {
    page.drawText(toPdfText(`${index + 1}. ${term}`), {
      x: 56,
      y: 254 - index * 22,
      size: 9,
      font,
      color: rgb(0.24, 0.29, 0.39),
    })
  })

  page.drawText(toPdfText(labels.generatedNote), {
    x: 42,
    y: 96,
    size: 9,
    font,
    color: rgb(0.44, 0.5, 0.63),
  })

  page.drawText(toPdfText(`${company.signatureLabel}: __________________________`), {
    x: 42,
    y: 66,
    size: 10,
    font,
    color: rgb(0.24, 0.29, 0.39),
  })

  return pdfDoc.save()
}
