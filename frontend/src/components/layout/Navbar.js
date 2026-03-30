import { Link, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { CartContext } from '../../context/CartContext'
import { ShoppingCartIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

const Navbar = () => {
  const { user, logout } = useContext(AuthContext)
  const { cart } = useContext(CartContext)
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const cartCount = cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl md:text-2xl font-bold text-gray-900 hover:text-green-600 transition">
          Deen Essentials
        </Link>
        <div className="hidden md:flex items-center gap-6 font-medium text-gray-700">
          <Link to="/shop" className="hover:text-green-600 transition">Shop</Link>
          {!user ? (
            <>
              <Link to="/login" className="hover:text-green-600 transition">Sign In</Link>
              <Link to="/register" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition shadow-sm">Sign Up</Link>
            </>
          ) : (
            <>
              {user.role === 'customer' && (
                <Link to="/cart" className="relative hover:text-green-600 transition">
                  <ShoppingCartIcon className="w-6 h-6" />
                  {cartCount > 0 && <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5">{cartCount}</span>}
                </Link>
              )}
              {user.role === 'admin' && <Link to="/admin/products" className="hover:text-green-600 transition">Admin</Link>}
              <button onClick={handleLogout} className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-black transition">Logout</button>
            </>
          )}
        </div>
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-gray-800 focus:outline-none">
          {menuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 py-4 flex flex-col gap-3 text-gray-700 font-medium">
          <Link to="/shop" onClick={() => setMenuOpen(false)} className="hover:text-green-600 transition">Shop</Link>
          {!user ? (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)} className="hover:text-green-600 transition">Sign In</Link>
              <Link to="/register" onClick={() => setMenuOpen(false)} className="bg-green-600 text-white px-4 py-2 rounded-lg text-center hover:bg-green-700 transition">Sign Up</Link>
            </>
          ) : (
            <>
              {user.role === 'customer' && <Link to="/cart" onClick={() => setMenuOpen(false)} className="hover:text-green-600 transition">Cart</Link>}
              {user.role === 'admin' && <Link to="/admin/products" onClick={() => setMenuOpen(false)} className="hover:text-green-600 transition">Admin</Link>}
              <button onClick={() => { handleLogout(); setMenuOpen(false) }} className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-black transition">Logout</button>
            </>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar