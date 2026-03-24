import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Overview from './pages/Overview'
import FlowDetail from './pages/FlowDetail'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#1a1a1a] transition-colors">
      <Header />
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/flow/:id" element={<FlowDetail />} />
      </Routes>
    </div>
  )
}
