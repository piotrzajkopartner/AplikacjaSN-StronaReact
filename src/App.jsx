import { Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout.jsx'
import SeoManager from './components/seo/SeoManager.jsx'
import HomePage from './pages/HomePage.jsx'
import DemoPage from './pages/DemoPage.jsx'

function App() {
  return (
    <>
      <SeoManager />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/demo" element={<DemoPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
