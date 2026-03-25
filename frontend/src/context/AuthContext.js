import { createContext, useState, useEffect } from 'react'
import api from '../api/axios'
export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const savedUser = localStorage.getItem('userInfo')
    if (savedUser) setUser(JSON.parse(savedUser))
  }, [])

  const login = async (email, password) => {
    setLoading(true)
    setError(null)
    try {
      const { data } = await api.post('/auth/login', { email, password })
      setUser(data)
      localStorage.setItem('userInfo', JSON.stringify(data))
      return true  
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
      return false
    } finally {
      setLoading(false)
    }
  }

  const register = async (name, email, password) => {
    setLoading(true)
    setError(null)
    try {
      const { data } = await api.post('/auth/register', { name, email, password })
      setUser(data)
      localStorage.setItem('userInfo', JSON.stringify(data))
      return true
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed')
      return false
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('userInfo')
  }

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}