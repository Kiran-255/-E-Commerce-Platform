import { Link, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { CartContext } from '../../context/CartContext'
import { ShoppingCartIcon, Bars3Icon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import { UserCircleIcon } from '@heroicons/react/24/solid'

const Navbar = () => {
  const { user, logout } = useContext(AuthContext)
  const { cart } = useContext(CartContext)
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)

  const cartCount = cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0
  const handleLogout = () => { logout(); navigate('/') }
  if (user?.role === 'admin') return null

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl md:text-3xl font-extrabold text-gray-900 hover:text-green-600 transition">
          Deen Essentials
        </Link>

        <div className="hidden md:flex items-center gap-6 font-medium text-gray-700">
          <Link to="/shop" className="hover:text-green-600 transition">Shop</Link>

          {!user ? (
            <>
              <Link to="/login" className="hover:text-green-600 transition">Sign In</Link>
              <Link to="/register" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition shadow-md">
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <Link to="/cart" className="relative hover:text-green-600 transition">
                <ShoppingCartIcon className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5">
                    {cartCount}
                  </span>
                )}
              </Link>

              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 px-2 py-1 rounded-lg hover:shadow-lg transition"
                >
                  <UserCircleIcon className="w-8 h-8 text-gray-600" />
                  <span className="font-medium text-gray-700">{user.name}</span>
                  <ChevronDownIcon className="w-4 h-4 text-gray-500" />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-white shadow-lg border rounded-xl py-2 z-20">
                    <Link to="/my-orders" onClick={() => setProfileOpen(false)} className="block px-4 py-2 hover:bg-gray-100 transition">
                      My Orders
                    </Link>
                    <button onClick={() => { handleLogout(); setProfileOpen(false) }} className="w-full text-left px-4 py-2 hover:bg-gray-100 transition">
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-gray-800 focus:outline-none">
          {menuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 py-4 flex flex-col gap-3 text-gray-700 font-medium shadow-lg">
          <Link to="/shop" onClick={() => setMenuOpen(false)} className="hover:text-green-600 transition">Shop</Link>

          {!user ? (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)} className="hover:text-green-600 transition">Sign In</Link>
              <Link to="/register" onClick={() => setMenuOpen(false)} className="bg-green-600 text-white px-4 py-2 rounded-lg text-center hover:bg-green-700 transition shadow-md">
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <Link to="/my-orders" onClick={() => setMenuOpen(false)} className="hover:text-green-600 transition">My Orders</Link>
              <Link to="/cart" onClick={() => setMenuOpen(false)} className="hover:text-green-600 transition">Cart</Link>
              <button onClick={() => { handleLogout(); setMenuOpen(false) }} className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition shadow-md">
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