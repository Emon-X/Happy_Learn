import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { LoginPage } from './pages/LoginPage'
import { HomePage } from './pages/HomePage'
import { GamePage } from './pages/GamePage'
import { ParentDashboard } from './pages/ParentDashboard'
import { useStore } from './store/useStore'

function App() {
  const fetchInitialData = useStore(state => state.fetchInitialData)

  useEffect(() => {
    fetchInitialData()
  }, [fetchInitialData])

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/game/:category" element={<GamePage />} />
      <Route path="/parent" element={<ParentDashboard />} />
    </Routes>
  )
}

export default App
