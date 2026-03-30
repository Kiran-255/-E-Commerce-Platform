import { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, loading, error } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const success = await login(email, password)
    if (success) {
    const savedUser = JSON.parse(localStorage.getItem('userInfo'))
    savedUser?.role === 'admin' ? navigate('/admin') : navigate('/')
  }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-gray-200"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Login</h2>

        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

        <div className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          />

          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <Button
          type="submit"
          loading={loading}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow-sm"
        >
          Login
        </Button>

        <p className="mt-6 text-sm text-gray-600 text-center">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-600 hover:underline font-medium">
            Register
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Login