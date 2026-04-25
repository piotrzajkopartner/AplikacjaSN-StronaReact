import { siteContent } from '../../content/siteContent.js'

function Footer() {
  return (
    <footer className="mt-12 border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-6xl gap-5 px-4 py-8 text-sm text-slate-600 md:grid-cols-2 md:items-end">
        <div>
          <p className="font-semibold text-slate-900">{siteContent.footer.companyName}</p>
          <p className="mt-2 max-w-xl leading-relaxed">{siteContent.footer.description}</p>
        </div>
        <div className="md:text-right">
          <div className="mb-2 flex flex-wrap gap-3 md:justify-end">
            {siteContent.footer.links.map((item) => (
              <a key={item.href} href={item.href} className="text-slate-700 hover:text-slate-900">
                {item.label}
              </a>
            ))}
          </div>
          <p>{siteContent.footer.legalNote}</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
