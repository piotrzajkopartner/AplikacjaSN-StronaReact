import { useMemo, useState } from 'react'
import { generateDemoData } from '../../lib/demo/generateDemoData.js'
import DashboardTab from './DashboardTab.jsx'
import DocumentsTab from './DocumentsTab.jsx'
import ProductsTab from './ProductsTab.jsx'
import SerialsTab from './SerialsTab.jsx'
import WarrantiesTab from './WarrantiesTab.jsx'

function createMap(items) {
  return new Map(items.map((item) => [item.id, item]))
}

function DemoAppShell({ content }) {
  const data = useMemo(
    () => generateDemoData(content.seed, { referenceDate: content.referenceDate }),
    [content.referenceDate, content.seed],
  )
  const [activeTab, setActiveTab] = useState(content.tabs[0].id)
  const [serialQuery, setSerialQuery] = useState('')
  const [selectedDocumentId, setSelectedDocumentId] = useState(data.documents[0]?.id)

  const contractorsById = useMemo(() => createMap(data.contractors), [data.contractors])
  const productsById = useMemo(() => createMap(data.products), [data.products])
  const serialsById = useMemo(() => createMap(data.serials), [data.serials])

  const filteredSerials = useMemo(() => {
    const query = serialQuery.trim().toLowerCase()

    if (!query) {
      return data.serials
    }

    return data.serials.filter((serial) => {
      const product = productsById.get(serial.productId)
      const contractor = contractorsById.get(serial.contractorId)

      return (
        serial.code.toLowerCase().includes(query) ||
        serial.documentNumber.toLowerCase().includes(query) ||
        (product?.name ?? '').toLowerCase().includes(query) ||
        (contractor?.name ?? '').toLowerCase().includes(query)
      )
    })
  }, [contractorsById, data.serials, productsById, serialQuery])

  const activeTabConfig = content.tabs.find((tab) => tab.id === activeTab)

  return (
    <section className="space-y-6 rounded-2xl border border-slate-200 bg-slate-50 p-3 md:p-4">
      <header className="rounded-xl border border-slate-200 bg-white p-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-3">
            <img
              src={content.shell.logoPath}
              alt={content.shell.logoAlt}
              className="h-10 w-10 rounded-lg border border-slate-200 bg-white object-contain"
            />
            <div>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">{content.shell.moduleLabel}</p>
            <p className="mt-1 text-base font-semibold text-slate-900">{content.shell.moduleName}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium">
            <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-emerald-700">
              {content.shell.modeLabel}
            </span>
            <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-blue-700">
              {content.shell.lastSyncLabel}
            </span>
          </div>
        </div>

        <div className="mt-3 space-y-3">
          <p className="text-sm text-slate-600">{activeTabConfig?.description}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {content.tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                activeTab === tab.id
                  ? 'border-blue-500 bg-blue-500 text-white shadow-sm shadow-blue-500/25'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      {activeTab === 'dashboard' && (
        <DashboardTab content={content.dashboard} dashboard={data.dashboard} operations={data.operations} />
      )}

      {activeTab === 'documents' && (
        <DocumentsTab
          content={content.documents}
          documents={data.documents}
          contractorsById={contractorsById}
          productsById={productsById}
          serialsById={serialsById}
          selectedDocumentId={selectedDocumentId}
          onSelectDocument={setSelectedDocumentId}
        />
      )}

      {activeTab === 'products' && (
        <ProductsTab content={content.products} products={data.products} serials={data.serials} />
      )}

      {activeTab === 'serials' && (
        <SerialsTab
          content={content.serials}
          serialQuery={serialQuery}
          onSerialQueryChange={setSerialQuery}
          serials={filteredSerials}
          productsById={productsById}
          contractorsById={contractorsById}
        />
      )}

      {activeTab === 'warranties' && (
        <WarrantiesTab
          content={content.warranties}
          warranties={data.warranties}
          productsById={productsById}
          serialsById={serialsById}
          contractorsById={contractorsById}
          pdfCompany={content.pdf.company}
          pdfLabels={content.pdf.labels}
          pdfAssets={content.pdf.assets}
        />
      )}
    </section>
  )
}

export default DemoAppShell
