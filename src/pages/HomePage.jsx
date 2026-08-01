import { lazy, Suspense } from 'react'
import BenefitsGridSection from '../components/sections/BenefitsGridSection.jsx'
import DeploymentSection from '../components/sections/DeploymentSection.jsx'
import FAQSection from '../components/sections/FAQSection.jsx'
import FeaturesSection from '../components/sections/FeaturesSection.jsx'
import FinalCTASection from '../components/sections/FinalCTASection.jsx'
import HeroSection from '../components/sections/HeroSection.jsx'
import MobileAppSection from '../components/sections/MobileAppSection.jsx'
import PartnerNetTrustSection from '../components/sections/PartnerNetTrustSection.jsx'
import ProblemSection from '../components/sections/ProblemSection.jsx'
import ScannerSection from '../components/sections/ScannerSection.jsx'
import SecuritySection from '../components/sections/SecuritySection.jsx'
import SolutionSection from '../components/sections/SolutionSection.jsx'
import WorkflowSection from '../components/sections/WorkflowSection.jsx'
import { siteContent } from '../content/siteContent.js'

const PricingSection = lazy(() => import('../components/sections/PricingSection.jsx'))

function HomePage() {
  return (
    <div className="space-y-12 md:space-y-16">
      <HeroSection content={siteContent.hero} />
      <ProblemSection content={siteContent.problems} />
      <SolutionSection content={siteContent.solution} />
      <WorkflowSection />
      <MobileAppSection />
      <ScannerSection />
      <BenefitsGridSection content={siteContent.benefits} />
      <FeaturesSection content={siteContent.features} />
      <Suspense fallback={<div aria-hidden="true" className="min-h-[28rem]" />}>
        <PricingSection content={siteContent.pricing} />
      </Suspense>
      <DeploymentSection content={siteContent.deployment} />
      <SecuritySection content={siteContent.security} />
      <PartnerNetTrustSection content={siteContent.trust} />
      <FAQSection content={siteContent.faq} />
      <FinalCTASection content={siteContent.contact} />
    </div>
  )
}

export default HomePage
