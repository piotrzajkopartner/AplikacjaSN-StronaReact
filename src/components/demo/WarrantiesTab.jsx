import { formatDate } from '../../lib/demo/formatters.js'
import WarrantyPdfButton from './WarrantyPdfButton.jsx'

function WarrantiesTab({
  content,
  warranties,
  productsById,
  serialsById,
  contractorsById,
  pdfCompany,
  pdfLabels,
  pdfAssets,
}) {
  return (
    <section className="space-y-3">
      {warranties.map((warranty) => {
        const product = productsById.get(warranty.productId)
        const serial = serialsById.get(warranty.serialId)
        const contractor = contractorsById.get(warranty.contractorId)

        if (!product || !serial || !contractor) {
          return null
        }

        return (
          <article
            key={warranty.id}
            className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 md:flex-row md:items-center md:justify-between"
          >
            <div>
              <p className="text-sm font-semibold text-slate-900">{warranty.warrantyNumber}</p>
              <p className="mt-1 text-sm text-slate-600">
                {product.name} - {serial.code}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                {contractor.name} | {content.labels.saleDate}: {formatDate(warranty.soldAt)} | {content.labels.validUntil}:{' '}
                {formatDate(warranty.validUntil)}
              </p>
            </div>
            <WarrantyPdfButton
              warranty={warranty}
              product={product}
              serial={serial}
              contractor={contractor}
              company={pdfCompany}
              labels={pdfLabels}
              assets={pdfAssets}
            />
          </article>
        )
      })}
    </section>
  )
}

export default WarrantiesTab
