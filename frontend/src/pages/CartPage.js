import { useCartLogic } from '../hooks/useCartLogic'
import { useNavigate } from 'react-router-dom'

import EmptyState from '../components/ui/EmptyState'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import api from '../api/axios'
import CheckoutItems from '../components/checkout/CheckoutItems'
import OrderSummary from '../components/checkout/OrderSummary'

const CartPage = () => {
  const { cart, loading, updateItem, removeItem } = useCartLogic()
  const [updatingId, setUpdatingId] = useState(null)
  const [preview, setPreview] = useState(null)
  const [loadingPreview, setLoadingPreview] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchPreview = async () => {
      if (!cart.items.length) return
      try {
        setLoadingPreview(true)
        const { data } = await api.get('/orders/preview')
        setPreview(data)
      } catch (err) {
        console.error(err)
        toast.error('Some items in your cart are no longer available')
        setPreview(null)
      } finally {
        setLoadingPreview(false)
      }
    }
     
 fetchPreview()
  }, [cart.items.length])

  const updateQuantity = async (productId, newQty, stock) => {
    if (newQty < 1) return

     if (newQty > stock) {
      toast.warning('Cannot add more than available stock')
      return}
    setUpdatingId(productId)
    await updateItem(productId, newQty)
    setUpdatingId(null)
  }

 if (loading ) return <LoadingSpinner />
  if (!cart.items.length) return <EmptyState message="Your cart is empty. Start shopping now!" />
  if (cart.items.length && loadingPreview) return <LoadingSpinner />

  const subtotal = preview.subtotal || 0
  const shipping = preview.shipping || 0
  const total = preview.total || 0

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-extrabold mb-8 text-gray-900">Your Cart</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">

          <CheckoutItems
            items={preview.items}
            cartItems={cart.items}
            updatingId={updatingId}
            updateQuantity={updateQuantity}
            removeItem={removeItem}
          />
        </div>

        <OrderSummary
          subtotal={subtotal}
          shipping={shipping}
          total={total}
          discount={preview.discount || 0}
          onCheckoutClick={() => navigate('/checkout')}
          disabled={!cart.items.length}
        />
      </div>
    </div>
  )
}

export default CartPage