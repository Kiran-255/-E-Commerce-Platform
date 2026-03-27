import { Link, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { ShoppingCartIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

const Navbar = () => {
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex justify-between items-center">

        <Link to="/" className="text-xl md:text-2xl font-bold text-gray-900">
          Deen Essentials
        </Link>

        <div className="hidden md:flex items-center gap-6 text-gray-700 font-medium">
          <Link to="/shop" className="hover:text-green-600 transition">
            Shop
          </Link>

          {!user ? (
            <>
       <Link to="/login" className="hover:text-green-600 transition">
                Sign In
          </Link>
              <Link to="/register" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition shadow-sm">
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <Link to="/cart" className="relative hover:text-green-600 transition">
          <ShoppingCartIcon className="w-6 h-6" />
              </Link>

              {user.role === 'admin' && (
                <Link to="/admin/products" className="hover:text-green-600 transition">
             Admin
                </Link>
              )}

        <button onClick={handleLogout} className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-black transition">
                Logout

              </button>
            </>
          )}
        </div>

        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-gray-800">
          {menuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-4 text-gray-700 font-medium bg-white border-t">
          <Link to="/shop" onClick={() => setMenuOpen(false)}>
            Shop
          </Link>

          {!user ? (
            <>
        <Link to="/login" onClick={() => setMenuOpen(false)}>
                Sign In
              </Link>

              <Link to="/register" onClick={() => setMenuOpen(false)} className="bg-green-600 text-white px-4 py-2 rounded-lg text-center">
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <Link to="/cart" onClick={() => setMenuOpen(false)}>
                Cart
              </Link>

     {user.role === 'admin' && (
                <Link to="/admin/products" onClick={() => setMenuOpen(false)}>
                  Admin
                </Link>
              )}

        <button
                onClick={() => {
                  handleLogout()
                  setMenuOpen(false)
                }}
                className="bg-gray-900 text-white px-4 py-2 rounded-lg"
              >

                Logout
   </button>
            </>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar