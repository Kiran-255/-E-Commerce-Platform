import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { CubeIcon, ShoppingCartIcon, UserIcon, Squares2X2Icon } from '@heroicons/react/24/outline'
import { UserCircleIcon } from '@heroicons/react/24/solid'
import { FiLogOut } from 'react-icons/fi'

const sidebarItems = [
  { name: 'Dashboard', path: '/admin', icon: Squares2X2Icon },

  { name: 'Products', path: '/admin/products', icon: CubeIcon },
  { name: 'Orders', path: '/admin/orders', icon: ShoppingCartIcon },
  { name: 'Users', path: '/admin/users', icon: UserIcon },
]

const AdminLayout = () => {
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()
  const [isSidebarOpen, setSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (isMobile) setSidebarOpen(false)
    else setSidebarOpen(true)
  }, [isMobile])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }
  return (
    <div className="flex h-screen bg-gray-100">


      <aside className={`bg-white shadow-lg flex flex-col transition-all duration-300
        ${isSidebarOpen ? 'w-64' : 'w-20'}`}>
        
       
        <div className="flex items-center justify-center px-4 py-5 border-b">
          {isSidebarOpen ? (
            <h2 className="text-xl font-bold text-green-600">Deen Essentials</h2>
          ) : (
            <span className="text-green-600 font-bold text-xl">DE</span>
          )}
        </div>

        {isSidebarOpen && (
          <div className="flex items-center gap-3 px-4 py-4 border-b bg-gray-50">
            <UserCircleIcon className="w-10 h-10 text-green-600" />
            <div>
              <p className="font-semibold text-gray-800 text-sm">{user?.name}</p>
              <p className="text-xs text-green-600 font-medium capitalize">{user?.role}</p>
            </div>
          </div>
        )}

   
        <nav className="flex-1 px-2 py-4 space-y-2">
          {sidebarItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.name === 'Dashboard'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-green-100 hover:text-green-700 transition ${
                  isActive ? 'bg-green-600 text-white hover:bg-green-600 hover:text-white' : ''
                }`
              }
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {isSidebarOpen && <span className="font-medium">{item.name}</span>}
            </NavLink>
          ))}
        </nav>

      
        <div className="px-4 py-4 border-t">
          <button
            onClick={handleLogout}
            className={`flex items-center justify-center gap-2 w-full rounded-lg font-medium
              transition ${isSidebarOpen ? 'bg-red-500 text-white px-4 py-2 hover:bg-red-600' : 'bg-red-500 text-white p-3 hover:bg-red-600'}`}
          >
            <FiLogOut className="w-5 h-5" />
            {isSidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      
      <div className="flex-1 flex flex-col overflow-auto">

        <header className="flex justify-between items-center bg-white shadow px-6 py-4 border-b">
  <h1 className="text-xl font-bold text-gray-600">Welcome Admin</h1>
  <NavLink
    to="/shop"
    className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition"
  >
    <span className="hidden sm:inline">Go to Shop</span>
  </NavLink>
</header>

      
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout