import { useEffect, useState } from 'react'
import { useCartLogic } from '../hooks/useCartLogic'
import { useCheckoutLogic } from '../hooks/useCheckoutLogic'

import LoadingSpinner from '../components/ui/LoadingSpinner'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'
import CheckoutItems from '../components/checkout/CheckoutItems'
import OrderSummary from '../components/checkout/OrderSummary'

const Checkout = () => {
  const { cart, loading: cartLoading } = useCartLogic()
  const { placeOrder, loading: orderLoading } = useCheckoutLogic()
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(true)
   const [updatingId, setUpdatingId] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchPreview = async () => {
      if (!cart.items.length) return
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
  if (!preview) return <LoadingSpinner />

  const updateQuantity = async (productId, newQty, stock) => {
 if (newQty < 1) return
 setUpdatingId(productId)
 await cart.updateItem(productId, newQty)
 setUpdatingId(null)
}

  const handleOrder = async () => {
    const order = await placeOrder()
    if (order) navigate('/order-confirmation', { state: order })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <CheckoutItems
            items={preview.items}
            cartItems={cart.items}
            updatingId={updatingId}
            updateQuantity={updateQuantity}
            removeItem={() => {}}
          />
        </div>
<div className="lg:col-span-1 ">
        <OrderSummary
          subtotal={preview.subtotal || 0}
          shipping={preview.shipping || 0}
          total={preview.total || 0}
          discount={preview.discount || 0}
          onCheckoutClick={handleOrder}
          disabled={false}
          checkoutPage={true}
          loadingButton={orderLoading}
        />
        </div>
      </div>
    </div>
  )
}

export default Checkout