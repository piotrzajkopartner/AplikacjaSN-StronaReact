import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout.jsx'
import SeoManager from './components/seo/SeoManager.jsx'
import HomePage from './pages/HomePage.jsx'

const DemoPage = lazy(() => import('./pages/DemoPage.jsx'))

function App() {
  return (
    <>
      <SeoManager />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/demo"
            element={
              <Suspense fallback={<div className="py-16 text-center text-sm text-slate-600">Ladowanie demo...</div>}>
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
