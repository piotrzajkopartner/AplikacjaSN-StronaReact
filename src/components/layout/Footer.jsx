import { siteContent } from '../../content/siteContent.js'

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-sm text-slate-600 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-medium text-slate-800">{siteContent.footer.companyName}</p>
          <p>{siteContent.footer.description}</p>
        </div>
        <p>{siteContent.footer.legalNote}</p>
      </div>
    </footer>
  )
}

export default Footer
