import { useState } from 'react'
import api from '../api/axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export const useCheckoutLogic = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const placeOrder = async (redirect = true) => {
    setLoading(true)
    try {
      const { data } = await api.post('/orders/checkout')
      toast.success('Order placed successfully')

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