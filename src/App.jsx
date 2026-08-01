import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout.jsx'
import SeoManager from './components/seo/SeoManager.jsx'
import DemoPageSkeleton from './components/ui/DemoPageSkeleton.jsx'

const HomePage = lazy(() => import('./pages/HomePage.jsx'))
const DemoPage = lazy(() => import('./pages/DemoPage.jsx'))
const PrivacyPage = lazy(() => import('./pages/PrivacyPage.jsx'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage.jsx'))

function RoutePageFallback() {
  return (
    <div className="min-h-[32rem] rounded-3xl border border-slate-200 bg-white/70" role="status">
      <span className="sr-only">Ładowanie strony...</span>
    </div>
  )
}

function App() {
  return (
    <>
      <SeoManager />
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/"
            element={
              <Suspense fallback={<RoutePageFallback />}>
                <HomePage />
              </Suspense>
            }
          />
          <Route
            path="/polityka-prywatnosci"
            element={
              <Suspense fallback={<RoutePageFallback />}>
                <PrivacyPage />
              </Suspense>
            }
          />
          <Route
            path="/demo"
            element={
              <Suspense fallback={<DemoPageSkeleton />}>
                <DemoPage />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<RoutePageFallback />}>
                <NotFoundPage />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </>
  )
}

export default App
