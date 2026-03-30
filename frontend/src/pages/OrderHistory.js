import { useEffect, useState } from 'react'
import api from '../api/axios'
import LoadingSpinner from '../components/ui/LoadingSpinner'

const OrderHistory = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true)
        const { data } = await api.get('/orders/my')

        setOrders(data)
      } catch (err) {

        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [])

  if (loading) return <LoadingSpinner />
  if (!orders.length) return <p className="p-10 text-center text-gray-500">You have no orders yet.</p>

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Order ID</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Date</th>


              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Items</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Status</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id} className="border-t hover:bg-gray-50">
                <td className="py-3 px-4 text-sm text-gray-800 font-mono">{order._id.slice(-8)}</td>
                <td className="py-3 px-4 text-sm text-gray-600">
           {new Date(order.createdAt).toLocaleDateString('en-PK', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </td>
          <td className="py-3 px-4 text-sm text-gray-800">
                  {order.items.map(i => i.name).join(', ')}
                </td>
                <td className="py-3 px-4 text-sm">
                  <span className={`px-2 py-1 
                  
                  rounded-full text-xs font-semibold ${
                    order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                    order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {order.status || 'Processing'}
                  </span>
                </td>

                <td className="py-3 px-4 text-sm font-semibold text-gray-900">
           Rs. {order.total.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default OrderHistory