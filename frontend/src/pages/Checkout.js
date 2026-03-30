import { useEffect, useState } from 'react'
import { useCartLogic } from '../hooks/useCartLogic'
import { useCheckoutLogic } from '../hooks/useCheckoutLogic'
import Button from '../components/ui/Button'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'

const Checkout = () => {
  const { cart, loading: cartLoading } = useCartLogic()
  const { placeOrder, loading: orderLoading } = useCheckoutLogic()
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchPreview = async () => {
      try {
        setLoading(true)
        const { data } = await api.get('/orders/preview')
        setPreview(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchPreview()
  }, [cart])

  if (cartLoading || loading) return <LoadingSpinner />
  if (!cart.items.length) return <p className="p-10">Cart is empty</p>

  const handleOrder = async () => {
    const order = await placeOrder()
    if (order) navigate('/my-orders')
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {preview.items.map(item => (
            <div
              key={item.product}
              className="flex items-center justify-between border rounded-xl p-4 shadow-sm bg-white"
            >
              <div className="flex items-center gap-4">
                <img
                  src={cart.items.find(i => i.product._id === item.product)?.product.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <h2 className="font-semibold">{item.name}</h2>
                  <p className="text-gray-500 text-sm">
                    Rs. {item.price} × {item.quantity}
                  </p>
                </div>
              </div>

              <div className="font-semibold">
                Rs. {(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        <div className="lg:sticky lg:top-24 h-fit border rounded-xl p-6 shadow-lg bg-white">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>Rs. {preview.subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-green-600">
              <span>Discount</span>
              <span>- Rs. {preview.discount.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{preview.shipping === 0 ? 'Free' : `Rs. ${preview.shipping}`}</span>
            </div>

            <hr className="my-3" />

            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>Rs. {preview.total.toFixed(2)}</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Free shipping on orders above Rs. 3000
            </p>
          </div>

          <Button
            onClick={handleOrder}
            loading={orderLoading}
            className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl text-lg font-semibold"
          >
            Place Order (Cash on Delivery)
          </Button>

          <p className="text-xs text-gray-500 mt-3 text-center">
            Secure checkout. Pay on delivery.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Checkout