import { useState } from 'react'
import api from '../api/axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useCartLogic } from './useCartLogic'

export const useCheckoutLogic = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

   const { fetchCart } = useCartLogic() 

  const placeOrder = async (redirect = true) => {
    setLoading(true)
    try {
      const { data } = await api.post('/orders/checkout')
      toast.success('Order placed successfully')

       await fetchCart()
      if (redirect) navigate('/my-orders')

      return data
    } catch (err) {
      const msg = err.response?.data?.message || 'Checkout failed'
      toast.error(msg)
      console.error('Checkout error:', msg)
    } finally {
      setLoading(false)
    }
  }

  return { placeOrder, loading }
}