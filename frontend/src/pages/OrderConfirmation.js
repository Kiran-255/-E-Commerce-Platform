import { useLocation, useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'

const OrderConfirmation = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const order = location.state

  if (!order) {
    return <p className="p-10 text-center text-gray-400">No order found.</p>
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-gradient-to-r from-green-50 to-white p-8 rounded-2xl shadow-xl">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Thank You for Your Order!</h1>
      <p className="text-gray-600 mb-8">Your order has been successfully placed. We've emailed your order confirmation.</p>

        <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">


          <div className="flex justify-between items-center mb-4">
            <div>

              <p className="text-gray-800 font-semibold">Order ID:</p>
              <p className="text-gray-500 text-sm">{order._id.slice(-8)}</p>
            </div>
            <div>
              <p className="text-gray-800 font-semibold">Date:</p>

              <p className="text-gray-500 text-sm">{new Date(order.createdAt).toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' })}</p>

            </div>
          </div>

          <div className="border-t border-gray-100 pt-4 space-y-4">
            {order.items.map(item => (
              <div key={item.product} className="flex justify-between items-center">

                <span className="text-gray-700">{item.name} x {item.quantity}</span>

                <span className="text-gray-900 font-medium">Rs. {(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-100 mt-6 pt-4 space-y-2">
            <div className="flex justify-between text-gray-600">

              <span>Subtotal</span>
              <span>Rs. {order.subtotal.toFixed(2)}</span>

            </div>
            <div className="flex justify-between text-green-600 font-medium">
              <span>Discount</span>
              <span>- Rs. {order.discount.toFixed(2)}</span>

            </div>
            <div className="flex justify-between text-gray-600">

              <span>Shipping</span>
              <span className="text-green-600">{order.shipping === 0 ? 'Free' : `Rs. ${order.shipping}`}</span>
            </div>

            <div className="flex justify-between text-gray-900 font-bold text-lg mt-2">
              <span>Total</span>
              <span>Rs. {order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Button
            onClick={() => navigate('/my-orders')}
            className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-2xl shadow-md transition"
          >
            View My Orders
          </Button>
          <Button
            onClick={() => navigate('/shop')}
            className="w-full sm:w-auto bg-gray-400 hover:bg-gray-500 text-gray-800 py-3 px-6 rounded-2xl shadow-sm transition"
          >
            Continue Shopping
          </Button>
        </div>


        <p className="text-sm text-gray-400 mt-4 text-center">Secure checkout. Pay on delivery.</p>
      </div>
    </div>
  )
}

export default OrderConfirmation