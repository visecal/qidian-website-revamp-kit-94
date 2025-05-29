
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Stories from './pages/Stories'
import StoryDetail from './pages/StoryDetail'
import Layout from './components/Layout'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/truyen" element={<Stories />} />
        <Route path="/truyen/:slug" element={<StoryDetail />} />
      </Routes>
    </Layout>
  )
}

export default App
