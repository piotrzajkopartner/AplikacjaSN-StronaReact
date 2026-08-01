import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { siteContent } from '../../content/siteContent.js'

const routeKeys = {
  '/': 'home',
  '/demo': 'demo',
  '/polityka-prywatnosci': 'privacy',
}

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

function setCanonical(href) {
  let element = document.head.querySelector('link[rel="canonical"]')

  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', 'canonical')
    document.head.appendChild(element)
  }

  element.setAttribute('href', href)
}

function getSiteUrl() {
  const configuredUrl = import.meta.env.VITE_SITE_URL?.trim().replace(/\/+$/, '')
  return configuredUrl || window.location.origin
}

function createAbsoluteUrl(siteUrl, path) {
  return new URL(path, `${siteUrl}/`).href
}

function updateJsonLd(routeKey, siteUrl, imageUrl) {
  document.head.querySelectorAll('script[data-seo-json-ld]').forEach((element) => element.remove())

  if (routeKey !== 'home') return

  const { faq, pricing, seo, trust } = siteContent
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: siteContent.navigation.brand,
        description: seo.routes.home.description,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Przeglądarka internetowa, Android 7 lub nowszy',
        url: createAbsoluteUrl(siteUrl, '/'),
        image: imageUrl,
        offers: {
          '@type': 'Offer',
          price: '300',
          priceCurrency: 'PLN',
          description: pricing.priceSuffix,
        },
      },
      {
        '@type': 'Organization',
        name: trust.headline.replace('Rozwiązanie przygotowane przez ', ''),
        url: trust.websiteUrl,
        logo: imageUrl,
      },
      {
        '@type': 'FAQPage',
        mainEntity: faq.items.map(({ question, answer }) => ({
          '@type': 'Question',
          name: question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: answer,
          },
        })),
      },
    ],
  }

  const element = document.createElement('script')
  element.type = 'application/ld+json'
  element.dataset.seoJsonLd = 'home'
  element.textContent = JSON.stringify(structuredData).replace(/</g, '\\u003c')
  document.head.appendChild(element)
}

function SeoManager() {
  const location = useLocation()

  useEffect(() => {
    const { seo } = siteContent
    const routeKey = routeKeys[location.pathname] || 'notFound'
    const routeSeo = seo.routes[routeKey]
    const siteUrl = getSiteUrl()
    const canonicalPath = routeKey === 'notFound' ? location.pathname : routeSeo.path
    const canonicalUrl = createAbsoluteUrl(siteUrl, canonicalPath)
    const imageUrl = createAbsoluteUrl(siteUrl, seo.image)

    document.title = routeSeo.title
    setMeta('description', routeSeo.description)
    setMeta('robots', routeSeo.robots)
    setMeta('og:type', routeSeo.type, 'property')
    setMeta('og:title', routeSeo.title, 'property')
    setMeta('og:description', routeSeo.description, 'property')
    setMeta('og:image', imageUrl, 'property')
    setMeta('og:url', canonicalUrl, 'property')
    setMeta('twitter:card', 'summary_large_image')
    setMeta('twitter:title', routeSeo.title)
    setMeta('twitter:description', routeSeo.description)
    setMeta('twitter:image', imageUrl)
    setCanonical(canonicalUrl)
    updateJsonLd(routeKey, siteUrl, imageUrl)
  }, [location.pathname])

  return null
}

export default SeoManager
