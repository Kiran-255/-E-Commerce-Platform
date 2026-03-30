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
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-200 space-y-6"
      >
        <h2 className="text-3xl font-extrabold text-gray-900 text-center">Welcome Back</h2>
        <p className="text-gray-500 text-sm text-center">
          Sign in to manage your products, orders, and dashboard.
        </p>

        {error && (
          <p className="text-red-500 text-sm text-center font-medium">{error}</p>
        )}

        <div className="flex flex-col gap-4">
          <Input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border-gray-300 focus:ring-green-500 focus:border-green-500"
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border-gray-300 focus:ring-green-500 focus:border-green-500"
          />
        </div>

        <Button
          type="submit"
          loading={loading}
          className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg shadow-md transition"
        >
          Login
        </Button>

        <div className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="text-green-600 hover:underline font-medium"
          >
            Register
          </Link>
        </div>
      </form>
    </div>
  )
}

export default Login