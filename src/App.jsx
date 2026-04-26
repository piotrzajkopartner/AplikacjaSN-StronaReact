import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout.jsx'
import SeoManager from './components/seo/SeoManager.jsx'
import HomePage from './pages/HomePage.jsx'
import PrivacyPage from './pages/PrivacyPage.jsx'
import DemoPageSkeleton from './components/ui/DemoPageSkeleton.jsx'

const DemoPage = lazy(() => import('./pages/DemoPage.jsx'))

function App() {
  return (
    <>
      <SeoManager />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/polityka-prywatnosci" element={<PrivacyPage />} />
          <Route
            path="/demo"
            element={
              <Suspense fallback={<DemoPageSkeleton />}>
                <DemoPage />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </>
  )
}

export default App
