import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { siteContent } from '../../content/siteContent.js'

function setMeta(name, content, type = 'name') {
  const selector = type === 'property' ? `meta[property="${name}"]` : `meta[name="${name}"]`
  let element = document.head.querySelector(selector)

  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(type, name)
    document.head.appendChild(element)
  }

  element.setAttribute('content', content)
}

function SeoManager() {
  const location = useLocation()

  useEffect(() => {
    const { seo, demoPage } = siteContent

    const isDemoPage = location.pathname === '/demo'

    const title = isDemoPage
      ? `Demo | ${siteContent.navigation.brand}`
      : seo.title

    const description = isDemoPage ? demoPage.description : seo.description

    document.title = title
    setMeta('description', description)
    setMeta('og:type', seo.og.type, 'property')
    setMeta('og:title', title, 'property')
    setMeta('og:description', description, 'property')
    setMeta('og:image', seo.og.image, 'property')
  }, [location.pathname])

  return null
}

export default SeoManager
