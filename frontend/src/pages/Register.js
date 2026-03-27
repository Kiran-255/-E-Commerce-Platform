import { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { register, loading, error } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const success = await register(name, email, password)
    if (success) navigate('/')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
  <form
    onSubmit={handleSubmit}
    className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-gray-200"
  >
    <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Register</h2>

    {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

    <div className="flex flex-col gap-4">
      <Input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="border-gray-300 focus:ring-blue-500 focus:border-blue-500"
      />

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
      className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg shadow-sm"
    >
      Register
    </Button>

    <p className="mt-4 text-sm text-gray-600 text-center">
      Already have an account?{' '}
      <Link to="/login" className="text-blue-600 hover:underline font-medium">
        Login
      </Link>
    </p>
  </form>
</div>
  )
}

export default Register