import React, { createContext, useState, useEffect } from 'react'
import api from '../services/api'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('suba_token')
    if (!token) {
      setLoading(false)
      return
    }
    api.get('/auth/me')
      .then(res => setUser(res.data.data))
      .catch(() => localStorage.removeItem('suba_token'))
      .finally(() => setLoading(false))
  }, [])

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password })
    localStorage.setItem('suba_token', res.data.data.token)
    setUser(res.data.data.user)
    return res.data.data.user
  }

  const register = async (payload) => {
    const res = await api.post('/auth/register', payload)
    localStorage.setItem('suba_token', res.data.data.token)
    setUser(res.data.data.user)
    return res.data.data.user
  }

  const logout = () => {
    localStorage.removeItem('suba_token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
