import { formatCurrency } from '../../lib/demo/formatters.js'

function ProductsTab({ content, products, serials }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => {
        const productSerials = serials.filter((serial) => serial.productId === product.id)
        const complaintCount = productSerials.filter((serial) => serial.status === 'reklamacja').length

        return (
          <article key={product.id} className="rounded-2xl border border-slate-200 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">{product.sku}</p>
            <h3 className="mt-2 text-lg font-semibold text-slate-900">{product.name}</h3>
            <p className="mt-1 text-sm text-slate-600">{product.manufacturer}</p>

            <dl className="mt-4 grid grid-cols-2 gap-2 text-sm">
              <div className="rounded-lg bg-slate-50 p-2">
                <dt className="text-xs uppercase tracking-[0.08em] text-slate-500">{content.netPrice}</dt>
                <dd className="mt-1 font-semibold text-slate-900">{formatCurrency(product.priceNet)}</dd>
              </div>
              <div className="rounded-lg bg-slate-50 p-2">
                <dt className="text-xs uppercase tracking-[0.08em] text-slate-500">{content.vatRate}</dt>
                <dd className="mt-1 font-semibold text-slate-900">{product.vatRate}%</dd>
              </div>
              <div className="rounded-lg bg-slate-50 p-2">
                <dt className="text-xs uppercase tracking-[0.08em] text-slate-500">{content.serialCount}</dt>
                <dd className="mt-1 font-semibold text-slate-900">{productSerials.length}</dd>
              </div>
              <div className="rounded-lg bg-slate-50 p-2">
                <dt className="text-xs uppercase tracking-[0.08em] text-slate-500">{content.complaintsCount}</dt>
                <dd className="mt-1 font-semibold text-slate-900">{complaintCount}</dd>
              </div>
            </dl>
          </article>
        )
      })}
    </div>
  )
}

export default ProductsTab
