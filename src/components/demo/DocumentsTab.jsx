import { useMemo, useState } from 'react'
import { formatCurrency, formatDate } from '../../lib/demo/formatters.js'

function getDocumentTone(document) {
  if (document.hasItemExcess) {
    return {
      card: 'border-violet-200 bg-violet-50',
      badge: 'bg-violet-100 text-violet-700',
      status: 'Nadmiar',
    }
  }

  if (document.isComplete) {
    return {
      card: 'border-emerald-200 bg-emerald-50',
      badge: 'bg-emerald-100 text-emerald-700',
      status: 'Uzupełniony',
    }
  }

  return {
    card: 'border-amber-200 bg-amber-50',
    badge: 'bg-amber-100 text-amber-700',
    status: 'Do uzupełnienia',
  }
}

function buildDocumentSubtitle(document, contractorName) {
  return `${document.number} | ${contractorName}`
}

function DocumentsTab({ content, documents, contractorsById, productsById, serialsById, selectedDocumentId, onSelectDocument }) {
  const [docType, setDocType] = useState(content.filters.defaultDocType)
  const [status, setStatus] = useState(content.filters.defaultStatus)
  const [searchQuery, setSearchQuery] = useState('')

  const visibleDocuments = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()

    return documents.filter((document) => {
      const contractor = contractorsById.get(document.contractorId)
      const matchesType = docType === 'all' || document.type === docType
      const matchesStatus =
        status === 'all' ||
        (status === 'pending' && !document.isComplete) ||
        (status === 'completed' && document.isComplete)
      const matchesQuery =
        !query ||
        document.number.toLowerCase().includes(query) ||
        (contractor?.name ?? '').toLowerCase().includes(query)

      return matchesType && matchesStatus && matchesQuery
    })
  }, [contractorsById, docType, documents, searchQuery, status])

  const selectedDocument =
    visibleDocuments.find((document) => document.id === selectedDocumentId) ??
    documents.find((document) => document.id === selectedDocumentId) ??
    visibleDocuments[0] ??
    documents[0]

  return (
    <div className="grid gap-4 xl:grid-cols-[1.2fr_1fr]">
      <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-4 md:p-5">
        <header className="space-y-3 border-b border-slate-100 pb-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-base font-semibold text-slate-900">{content.listTitle}</h3>
            <span className="text-xs text-slate-500">{content.updatedLabel}: {content.updatedAt}</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {content.filters.docTypes.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setDocType(option.value)}
                className={`rounded-md border px-3 py-1.5 text-xs font-semibold transition ${
                  docType === option.value
                    ? 'border-slate-900 bg-slate-900 text-white'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {content.filters.statuses.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setStatus(option.value)}
                className={`rounded-md px-3 py-1.5 text-xs font-semibold transition ${
                  status === option.value ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          <input
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            placeholder={content.filters.searchPlaceholder}
          />
        </header>

        <div className="space-y-2">
          {visibleDocuments.map((document) => {
            const contractor = contractorsById.get(document.contractorId)
            const tone = getDocumentTone(document)
            const isActive = selectedDocument?.id === document.id

            return (
              <button
                key={document.id}
                type="button"
                onClick={() => onSelectDocument(document.id)}
                className={`w-full rounded-xl border p-3 text-left transition ${tone.card} ${isActive ? 'ring-2 ring-blue-300' : ''}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{document.number}</p>
                    <p className="mt-1 text-xs text-slate-600">{buildDocumentSubtitle(document, contractor?.name ?? '-')}</p>
                  </div>
                  <span className={`rounded-full px-2 py-1 text-[11px] font-semibold ${tone.badge}`}>{tone.status}</span>
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-600">
                  <span>{content.requiredLabel}: {document.requiredItems}</span>
                  <span>{content.savedLabel}: {document.savedItems}</span>
                  <span>{formatDate(document.date)}</span>
                </div>
              </button>
            )
          })}

          {visibleDocuments.length === 0 && (
            <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-sm text-slate-500">
              {content.filters.emptyState}
            </div>
          )}
        </div>
      </section>

      {selectedDocument && (
        <section className="rounded-2xl border border-slate-200 bg-white p-4 md:p-5">
          <h3 className="text-base font-semibold text-slate-900">{content.detailsTitle}</h3>
          <p className="mt-1 text-sm text-slate-600">
            {selectedDocument.number} - {contractorsById.get(selectedDocument.contractorId)?.name}
          </p>
          <p className="mt-2 text-xs text-slate-500">{content.totalLabel}: {formatCurrency(selectedDocument.totalGross)}</p>

          <ul className="mt-4 space-y-3">
            {selectedDocument.items.map((item) => {
              const product = productsById.get(item.productId)

              return (
                <li key={item.id} className="rounded-xl border border-slate-100 p-3">
                  <p className="text-sm font-semibold text-slate-900">{product?.name}</p>
                  <p className="mt-1 text-xs text-slate-600">
                    {content.quantityLabel}: {item.quantity} | {content.vatLabel}: {item.vatRate}% | {content.lineValueLabel}:{' '}
                    {formatCurrency(item.lineGross)}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    {content.serialsLabel}: {item.serialIds.map((serialId) => serialsById.get(serialId)?.code).join(', ') || '-'}
                  </p>
                </li>
              )
            })}
          </ul>
        </section>
      )}
    </div>
  )
}

export default DocumentsTab
