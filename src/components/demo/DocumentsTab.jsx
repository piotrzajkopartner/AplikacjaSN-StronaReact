import { formatCurrency, formatDate } from '../../lib/demo/formatters.js'

function DocumentsTab({ content, documents, contractorsById, productsById, serialsById, selectedDocumentId, onSelectDocument }) {
  const selectedDocument = documents.find((document) => document.id === selectedDocumentId) ?? documents[0]

  return (
    <div className="grid gap-4 xl:grid-cols-[1.3fr_1fr]">
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <header className="border-b border-slate-100 px-4 py-3 text-sm font-semibold text-slate-900">{content.listTitle}</header>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-[0.06em] text-slate-600">
              <tr>
                <th className="px-4 py-3 font-semibold">{content.columns.number}</th>
                <th className="px-4 py-3 font-semibold">{content.columns.contractor}</th>
                <th className="px-4 py-3 font-semibold">{content.columns.date}</th>
                <th className="px-4 py-3 font-semibold">{content.columns.total}</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((document) => {
                const contractor = contractorsById.get(document.contractorId)
                const isActive = selectedDocument?.id === document.id

                return (
                  <tr
                    key={document.id}
                    className={`cursor-pointer border-t border-slate-100 transition-colors hover:bg-slate-50 ${isActive ? 'bg-blue-50/70' : ''}`}
                    onClick={() => onSelectDocument(document.id)}
                  >
                    <td className="px-4 py-3 font-medium text-slate-900">{document.number}</td>
                    <td className="px-4 py-3 text-slate-700">{contractor?.name}</td>
                    <td className="px-4 py-3 text-slate-600">{formatDate(document.date)}</td>
                    <td className="px-4 py-3 text-slate-700">{formatCurrency(document.totalGross)}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>

      {selectedDocument && (
        <section className="rounded-2xl border border-slate-200 bg-white p-4 md:p-5">
          <h3 className="text-base font-semibold text-slate-900">{content.detailsTitle}</h3>
          <p className="mt-1 text-sm text-slate-600">
            {selectedDocument.number} - {contractorsById.get(selectedDocument.contractorId)?.name}
          </p>
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
                    {content.serialsLabel}: {item.serialIds.map((serialId) => serialsById.get(serialId)?.code).join(', ')}
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
