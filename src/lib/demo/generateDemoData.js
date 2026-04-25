const DAY_IN_MS = 24 * 60 * 60 * 1000
const DEFAULT_REFERENCE_DATE = '2026-04-30'

function mulberry32(seed) {
  let t = seed

  return function random() {
    t += 0x6d2b79f5
    let n = Math.imul(t ^ (t >>> 15), t | 1)
    n ^= n + Math.imul(n ^ (n >>> 7), n | 61)
    return ((n ^ (n >>> 14)) >>> 0) / 4294967296
  }
}

function pick(random, list) {
  return list[Math.floor(random() * list.length)]
}

function pickUnique(random, list, count) {
  const pool = [...list]
  const result = []

  for (let index = 0; index < count && pool.length; index += 1) {
    const itemIndex = Math.floor(random() * pool.length)
    const [item] = pool.splice(itemIndex, 1)
    result.push(item)
  }

  return result
}

function addMonths(dateString, months) {
  const date = new Date(dateString)
  date.setMonth(date.getMonth() + months)
  return date.toISOString().slice(0, 10)
}

function toIsoDate(referenceDate, daysBack) {
  const baseTime = new Date(`${referenceDate}T12:00:00Z`).getTime()
  return new Date(baseTime - daysBack * DAY_IN_MS).toISOString().slice(0, 10)
}

function generateProducts() {
  return [
    {
      id: 'PRD-001',
      sku: 'PN-ROUT-AX1800',
      name: 'Router AX1800 Partner Secure',
      manufacturer: 'Partner Devices',
      vatRate: 23,
      priceNet: 389,
      warrantyMonths: 24,
    },
    {
      id: 'PRD-002',
      sku: 'PN-SW-24G-L2',
      name: 'Switch zarządzalny 24G L2',
      manufacturer: 'NetLink Industrial',
      vatRate: 23,
      priceNet: 940,
      warrantyMonths: 36,
    },
    {
      id: 'PRD-003',
      sku: 'PN-AP-WIFI6-OUT',
      name: 'Access Point Wi-Fi 6 Outdoor',
      manufacturer: 'Partner Devices',
      vatRate: 23,
      priceNet: 730,
      warrantyMonths: 24,
    },
    {
      id: 'PRD-004',
      sku: 'PN-CAM-4K-POE',
      name: 'Kamera 4K PoE VisionCam',
      manufacturer: 'VisionCam',
      vatRate: 23,
      priceNet: 650,
      warrantyMonths: 24,
    },
    {
      id: 'PRD-005',
      sku: 'PN-UPS-1500-LI',
      name: 'UPS 1500VA Li-Ion Rack',
      manufacturer: 'PowerGrid',
      vatRate: 23,
      priceNet: 1290,
      warrantyMonths: 36,
    },
    {
      id: 'PRD-006',
      sku: 'PN-SENS-TEMP-IOT',
      name: 'Czujnik temperatury IoT v2',
      manufacturer: 'SenseWare',
      vatRate: 8,
      priceNet: 210,
      warrantyMonths: 24,
    },
  ]
}

function generateContractors() {
  return [
    {
      id: 'CTR-001',
      name: 'Alfa Logistics Sp. z o.o.',
      taxId: '5213001542',
      city: 'Warszawa',
    },
    {
      id: 'CTR-002',
      name: 'Beta Instalacje S.A.',
      taxId: '6462931175',
      city: 'Katowice',
    },
    {
      id: 'CTR-003',
      name: 'Gamma Retail Group',
      taxId: '6762510091',
      city: 'Krakow',
    },
    {
      id: 'CTR-004',
      name: 'Delta Med Systems',
      taxId: '8992874501',
      city: 'Wroclaw',
    },
  ]
}

export function generateDemoData(seed = 17771465, options = {}) {
  const referenceDate = options.referenceDate ?? DEFAULT_REFERENCE_DATE
  const random = mulberry32(seed)
  const products = generateProducts()
  const contractors = generateContractors()
  const statuses = ['zeskanowane', 'wydane', 'reklamacja']

  const documents = []
  const serials = []
  const warranties = []
  const operations = []

  let serialCounter = 1

  for (let docIndex = 0; docIndex < 14; docIndex += 1) {
    const type = docIndex % 2 === 0 ? 'FS' : 'WZ'
    const selectedProducts = pickUnique(random, products, 2 + Math.floor(random() * 2))
    const contractor = contractors[docIndex % contractors.length]
    const date = toIsoDate(referenceDate, 85 - docIndex * 5)
    const number = `${type}/${String(docIndex + 1).padStart(3, '0')}/04/2026`

    const items = selectedProducts.map((product, itemIndex) => {
      const quantity = 1 + Math.floor(random() * 3)
      const serialIds = []

      for (let unit = 0; unit < quantity; unit += 1) {
        const status = pick(random, statuses)
        const serialId = `SER-${String(serialCounter).padStart(4, '0')}`
        const serialCode = `${product.sku}-${String(serialCounter).padStart(5, '0')}`
        const soldDate = date
        const issuedDate = toIsoDate(referenceDate, 84 - docIndex * 5 + unit)
        const complaintDate = toIsoDate(referenceDate, 80 - docIndex * 5 + unit)

        const history = [
          {
            date: soldDate,
            status: 'zeskanowane',
            note: `Skan przy dokumencie ${number}`,
          },
          {
            date: issuedDate,
            status: status === 'zeskanowane' ? 'zeskanowane' : 'wydane',
            note: status === 'zeskanowane' ? 'Oczekuje na wydanie' : `Wydane dla ${contractor.name}`,
          },
        ]

        if (status === 'reklamacja') {
          history.push({
            date: complaintDate,
            status: 'reklamacja',
            note: 'Przyjęte zgłoszenie serwisowe RMA',
          })
        }

        serials.push({
          id: serialId,
          code: serialCode,
          productId: product.id,
          documentNumber: number,
          contractorId: contractor.id,
          status,
          soldAt: soldDate,
          history,
        })

        history.forEach((entry) => {
          operations.push({
            serialCode,
            documentNumber: number,
            ...entry,
          })
        })

        if (type === 'FS') {
          const warrantyNumber = `GW/${String(docIndex + 1).padStart(3, '0')}/${String(unit + 1).padStart(2, '0')}/2026`
          warranties.push({
            id: `WAR-${serialId}`,
            warrantyNumber,
            documentNumber: number,
            contractorId: contractor.id,
            productId: product.id,
            serialId,
            soldAt: soldDate,
            validUntil: addMonths(soldDate, product.warrantyMonths),
            warrantyMonths: product.warrantyMonths,
          })
        }

        serialIds.push(serialId)
        serialCounter += 1
      }

      const lineNet = quantity * product.priceNet

      return {
        id: `${number}-ITEM-${itemIndex + 1}`,
        productId: product.id,
        quantity,
        unitPriceNet: product.priceNet,
        vatRate: product.vatRate,
        lineNet,
        lineGross: lineNet * (1 + product.vatRate / 100),
        serialIds,
      }
    })

    documents.push({
      id: `DOC-${String(docIndex + 1).padStart(3, '0')}`,
      number,
      type,
      contractorId: contractor.id,
      date,
      items,
      totalNet: items.reduce((sum, item) => sum + item.lineNet, 0),
      totalGross: items.reduce((sum, item) => sum + item.lineGross, 0),
    })
  }

  const dashboard = {
    documentsCount: documents.length,
    positionsCount: documents.reduce((sum, document) => sum + document.items.length, 0),
    serialsCount: serials.length,
    complaintsCount: serials.filter((serial) => serial.status === 'reklamacja').length,
  }

  return {
    dashboard,
    documents,
    products,
    contractors,
    serials,
    warranties,
    operations: operations.sort((a, b) => b.date.localeCompare(a.date)).slice(0, 12),
  }
}
