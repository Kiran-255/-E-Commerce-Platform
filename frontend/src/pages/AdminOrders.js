import { useEffect, useState } from 'react'
import api from '../api/axios'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import { toast } from 'react-toastify'

const STATUS_FLOW = ['pending', 'paid', 'shipped', 'delivered', 'cancelled']

const getStatusStyle = status => {
  switch (status) {
    case 'delivered': return 'bg-green-100 text-green-700'
    case 'shipped': return 'bg-blue-100 text-blue-700'
    case 'paid': return 'bg-yellow-100 text-yellow-700'
    case 'cancelled': return 'bg-red-100 text-red-700'
    default: return 'bg-gray-100 text-gray-700'
  }
}

const AdminOrders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)
  const [updatingId, setUpdatingId] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [sortBy, setSortBy] = useState('createdAt')
  const [order, setOrder] = useState('desc')
  const itemsPerPage = 8

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const { data } = await api.get('/orders', {

        params: { page: currentPage, limit: itemsPerPage, search: searchTerm, sortBy, order }
      })
      setOrders(data.orders)
      
      setTotalPages(data.totalPages)
    } catch (err) {
      toast.error(err.response?.data?.message || err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchOrders() }, [currentPage, searchTerm, sortBy, order])

  const handleStatusChange = async (orderId, newStatus, currentStatus) => {
    const currentIndex = STATUS_FLOW.indexOf(currentStatus)
    const newIndex = STATUS_FLOW.indexOf(newStatus)
    if (currentStatus === 'delivered' || currentStatus === 'cancelled') {
     toast.error('Cannot change status of a completed order')
      return
    }
    if (newIndex < currentIndex) {
   toast.error('Cannot move order backwards')
      return
    }
    try {
      setUpdatingId(orderId)
      await api.put(`/orders/${orderId}/status`, { status: newStatus })
      setOrders(prev => prev.map(o => o._id === orderId ? { ...o, status: newStatus } : o))
      toast.success('Order status updated')
    } catch (err) {
      toast.error(err.response?.data?.message || err.message)
    } finally {
      setUpdatingId(null)
    }
  }

  if (loading) return (
    <div className="flex justify-center items-center h-[70vh]">
      <LoadingSpinner />
    </div>
  )

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-green-600">All Orders List</h1>
          <p className="text-gray-500 mt-1">Manage all customer orders, update status, and track progress</p>
        </div>
        <div className="flex flex-wrap gap-2 items-center mt-3 md:mt-0">
          <input
            type="text"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1) }}
            className="w-full md:w-64 border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 transition"
          />
          <select
            value={sortBy}
            onChange={e => { setSortBy(e.target.value); setCurrentPage(1) }}
            className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 transition"
          >
            <option value="createdAt">Date</option>
            <option value="total">Total</option>
            <option value="status">Status</option>
          </select>
          <select
            value={order}
            onChange={e => { setOrder(e.target.value); setCurrentPage(1) }}
            className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 transition"
          >
         <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>
      </div>
      {orders.length === 0 ? (
        <div className="flex justify-center items-center py-20">
          <div className="text-center text-gray-400">

            <p className="text-xl font-medium mb-2">No orders found</p>
            <p className="text-sm">
              Orders will appear here once customers place them.</p>
          </div>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto rounded-2xl shadow-lg border border-gray-200">
            <table className="min-w-full bg-white divide-y
            
            divide-gray-200">
              <thead className="bg-green-600 text-white 
              text-sm md:text-base">
                <tr>
                  <th className="py-3 px-4 text-left font-medium">Order</th>
                 
                  <th className="py-3 px-4 text-left font-medium">Customer</th>
                  <th className="py-3 px-4 text-left font-medium">Items</th>
                  <th className="py-3 px-4 text-left font-medium">Total</th>
                  <th className="py-3 px-4 text-left font-medium">Status</th>
                  <th className="py-3 px-4 text-left font-medium">Change Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders.map(order => (
                  <tr key={order._id} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="py-4 px-4 font-mono text-sm text-gray-800">
                      #{order._id.slice(-6)}
                      <div className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</div>
                    </td>
                    <td className="py-4 px-4 font-semibold text-gray-900">
                      {order.user?.name}
                      <div className="text-sm text-gray-500">{order.user?.email}</div>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-700 max-w-xs">
                      {order.items.map(i => i.name).join(', ')}
                    </td>
                    <td className="py-4 px-4 font-semibold text-gray-900">Rs. {order.total.toFixed(2)}</td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs md:text-sm font-semibold ${getStatusStyle(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      {order.status === 'delivered' || order.status === 'cancelled' ? (
                        <span className="text-xs text-gray-400 italic">No changes</span>
                      ) : (
                        <select
                          value={order.status}
                          disabled={updatingId === order._id}
                          onChange={e => handleStatusChange(order._id, e.target.value, order.status)}
                          className="border border-gray-300 rounded-lg px-3 py-1 text-sm font-medium focus:ring-2 focus:ring-green-600 focus:outline-none transition"
                        >
                          {STATUS_FLOW.map(s => (
                            
                            <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                          ))}
                        </select>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center mt-6 gap-2 flex-wrap items-center">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}

                className={`px-3 py-2 rounded-lg font-medium transition flex
                   items-center gap-1 ${currentPage === 1 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700'}`}
              >
                ← Previous
              </button>

              {[...Array(totalPages)].map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(idx + 1)}
                  className={`px-4 py-2 rounded-lg font-medium transition ${currentPage === idx + 1 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                >
                  {idx + 1}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`px-3 py-2 rounded-lg font-medium transition flex items-center gap-1 ${currentPage === totalPages ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700'}`}
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default AdminOrders