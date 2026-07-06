import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import ProtectedRoute from './routes/ProtectedRoute'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import XrayAnalyzer from './pages/XrayAnalyzer'
import BloodReportAnalyzer from './pages/BloodReportAnalyzer'
import HealthAssessment from './pages/HealthAssessment'
import CalorieCounter from './pages/CalorieCounter'
import AIAssistant from './pages/AIAssistant'
import HealthHistory from './pages/HealthHistory'
import Profile from './pages/Profile'
import About from './pages/About'
import Contact from './pages/Contact'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/xray-analyzer" element={<ProtectedRoute><XrayAnalyzer /></ProtectedRoute>} />
          <Route path="/blood-report-analyzer" element={<ProtectedRoute><BloodReportAnalyzer /></ProtectedRoute>} />
          <Route path="/health-assessment" element={<ProtectedRoute><HealthAssessment /></ProtectedRoute>} />
          <Route path="/calorie-counter" element={<ProtectedRoute><CalorieCounter /></ProtectedRoute>} />
          <Route path="/ai-assistant" element={<ProtectedRoute><AIAssistant /></ProtectedRoute>} />
          <Route path="/health-history" element={<ProtectedRoute><HealthHistory /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
