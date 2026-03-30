import { Navigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext' 

const ProtectedRoute = ({ children, adminRequired = false }) => {
  const { user, loading } = useContext(AuthContext)

  if (loading) return null
  if (!user) return <Navigate to="/login" replace />
   if (adminRequired && user.role !== 'admin') return <Navigate to="/" replace />
    return children
}

export default ProtectedRoute