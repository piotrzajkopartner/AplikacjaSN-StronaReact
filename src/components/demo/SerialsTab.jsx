import { formatDate } from '../../lib/demo/formatters.js'

function SerialsTab({ content, serialQuery, onSerialQueryChange, serials, productsById, contractorsById }) {
  return (
    <div className="space-y-4">
      <section className="rounded-2xl border border-slate-200 bg-white p-4">
        <label className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500" htmlFor="serial-search">
          {content.searchLabel}
        </label>
        <input
          id="serial-search"
          value={serialQuery}
          onChange={(event) => onSerialQueryChange(event.target.value)}
          placeholder={content.searchPlaceholder}
          className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />
      </section>

      {serials.length === 0 ? (
        <section className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm text-slate-600">
          {content.emptyState}
        </section>
      ) : (
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-[0.06em] text-slate-600">
                <tr>
                  <th className="px-4 py-3 font-semibold">{content.columns.serial}</th>
                  <th className="px-4 py-3 font-semibold">{content.columns.product}</th>
                  <th className="px-4 py-3 font-semibold">{content.columns.contractor}</th>
                  <th className="px-4 py-3 font-semibold">{content.columns.status}</th>
                  <th className="px-4 py-3 font-semibold">{content.columns.lastOperation}</th>
                </tr>
              </thead>
              <tbody>
                {serials.map((serial) => {
                  const lastOperation = serial.history[serial.history.length - 1]

                  return (
                    <tr key={serial.id} className="border-t border-slate-100">
                      <td className="px-4 py-3 font-medium text-slate-900">{serial.code}</td>
                      <td className="px-4 py-3 text-slate-700">{productsById.get(serial.productId)?.name}</td>
                      <td className="px-4 py-3 text-slate-700">{contractorsById.get(serial.contractorId)?.name}</td>
                      <td className="px-4 py-3">
                        <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700">{serial.status}</span>
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        {formatDate(lastOperation.date)} - {lastOperation.note}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  )
}

export default SerialsTab
