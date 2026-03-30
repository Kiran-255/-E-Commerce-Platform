import { useEffect, useState } from 'react'
import api from '../api/axios'
import LoadingSpinner from '../components/ui/LoadingSpinner'

import { ShoppingCartIcon, CubeIcon, UserIcon, CurrencyRupeeIcon } from '@heroicons/react/24/outline'

const AdminDashboard = () => {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchStats = async () => {
    try {
      setLoading(true)
      const { data } = await api.get('/admin/dashboard')
      setStats(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchStats() }, [])

  if (loading) return <div className="flex justify-center items-center h-[70vh]"><LoadingSpinner /></div>
  if (!stats) return null

  const cards = [
    { label: 'Total Revenue', value: `Rs. ${stats.totalRevenue.toFixed(2)}`, icon: CurrencyRupeeIcon, color: 'bg-green-100 text-green-700' },
    { label: 'Total Orders', value: stats.totalOrders, icon: ShoppingCartIcon, color: 'bg-blue-100 text-blue-700' },
    { label: 'Total Products', value: stats.totalProducts, icon: CubeIcon, color: 'bg-purple-100 text-purple-700' },
    { label: 'Total Users', value: stats.totalUsers, icon: UserIcon, color: 'bg-yellow-100 text-yellow-700' },
  ]

  const getStatusStyle = status => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-700'
      case 'shipped': return 'bg-blue-100 text-blue-700'
      case 'paid': return 'bg-purple-100 text-purple-700'
      case 'pending': return 'bg-yellow-100 text-yellow-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
     

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-green-600">Dashboard</h1>


          <p className="text-gray-500 mt-1">Welcome back, Admin. Overview of orders, revenue, and products.</p>
        </div>
      </div>

 
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
       
       
       {cards.map(card => (
          <div key={card.label} className="bg-white rounded-xl shadow-md border p-5 flex items-center gap-4 hover:shadow-lg transition">
            <div className={`p-3 rounded-full ${card.color}`}>
              <card.icon className="w-6 h-6" />
            </div>

            <div>
              <p className="text-sm text-gray-500">{card.label}</p>
              <p className="text-2xl font-bold text-gray-900">{card.value}</p>
            </div>
          </div>
        ))}
      </div>



      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

        <div className="bg-white rounded-xl shadow-md border
         p-5 hover:shadow-lg transition">
          <p className="text-sm text-gray-500">Pending Orders</p>
          <p className="text-3xl font-bold text-yellow-600">{stats.pendingOrders}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md 
        border p-5 hover:shadow-lg transition">
          <p className="text-sm text-gray-500">Low Stock Products (≤5)</p>
       
          <p className="text-3xl font-bold
           text-red-600">{stats.lowStock}</p>
        </div>
      </div>

   
      <div className="bg-white rounded-xl shadow-md border p-5">
        <div className="flex flex-col 
        md:flex-row items-start md:items-center justify-between mb-4 gap-3">
          <h2 className="text-lg font-bold text-gray-800">Recent Orders</h2>
          
          <span className="text-sm
           text-gray-500">{stats.recentOrders.length} latest orders</span>
        </div>
        {stats.recentOrders.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No orders yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">

              <thead className="bg-gray-50">
                <tr className="text-left text-sm text-gray-500">
                 
                 <th className="py-2 px-4">Order</th>
                  <th className="py-2 px-4">Customer</th>
                  <th className="py-2 px-4">Total</th>
                  <th className="py-2 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
              {stats.recentOrders.map(order => (
                  <tr key={order._id} className="hover:bg-gray-50 transition-colors
                   duration-200">
                    <td className="py-2 px-4 font-mono text-sm">#{order._id.slice(-6)}</td>
                  
                <td className="py-2 px-4 text-sm">{order.user?.name}</td>
                    <td className="py-2 px-4 text-sm font-semibold">Rs. {order.total.toFixed(2)}</td>

                    <td className="py-2 px-4">

                      <span className={`px-2 py-1 rounded-full
                         text-xs font-semibold ${getStatusStyle(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
          </tr>
          ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard