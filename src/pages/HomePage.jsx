import BenefitsGridSection from '../components/sections/BenefitsGridSection.jsx'
import DeploymentSection from '../components/sections/DeploymentSection.jsx'
import FAQSection from '../components/sections/FAQSection.jsx'
import FeaturesSection from '../components/sections/FeaturesSection.jsx'
import FinalCTASection from '../components/sections/FinalCTASection.jsx'
import HeroSection from '../components/sections/HeroSection.jsx'
import PartnerNetTrustSection from '../components/sections/PartnerNetTrustSection.jsx'
import PricingSection from '../components/sections/PricingSection.jsx'
import ProblemSection from '../components/sections/ProblemSection.jsx'
import SecuritySection from '../components/sections/SecuritySection.jsx'
import SolutionSection from '../components/sections/SolutionSection.jsx'
import { siteContent } from '../content/siteContent.js'

function HomePage() {
  return (
    <div className="space-y-14 md:space-y-20">
      <HeroSection content={siteContent.hero} />
      <ProblemSection content={siteContent.problems} />
      <SolutionSection content={siteContent.solution} />
      <BenefitsGridSection content={siteContent.benefits} />
      <FeaturesSection content={siteContent.features} />
      <PricingSection content={siteContent.pricing} />
      <DeploymentSection content={siteContent.deployment} />
      <SecuritySection content={siteContent.security} />
      <PartnerNetTrustSection content={siteContent.trust} />
      <FAQSection content={siteContent.faq} />
      <FinalCTASection content={siteContent.contact} />
    </div>
  )
}

export default HomePage
