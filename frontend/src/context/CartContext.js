import { createContext, useState, useEffect } from 'react'
import api from '../api/axios'
import { toast } from 'react-toastify'

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [] })
  const [loading, setLoading] = useState(false)

  const fetchCart = async () => {
    try {
      setLoading(true)
      const { data } = await api.get('/cart')
      setCart(data)
      setLoading(false)
    } catch (err) {
      setLoading(false)
      console.error(err)
    }
  }

  const addItem = async (productId, quantity = 1) => {
    try {
      const { data } = await api.post('/cart/add', { productId, quantity })
      setCart(data)
      toast.success('Product added to cart')
    } catch (err) {
      console.error(err)
      toast.error('Failed to add product to cart')
    }
  }

  const updateItem = async (productId, quantity) => {
    try {
      const { data } = await api.put('/cart/update', { productId, quantity })
      setCart(data)
      toast.success('Cart updated')
    } catch (err) {
      console.error(err)
      toast.error('Failed to remove product')
    }
  }

  const removeItem = async (productId) => {
    try {
      const { data } = await api.delete(`/cart/remove/${productId}`)
      setCart(data)
      toast.success('Product removed from cart')
    } catch (err) {
      console.error(err)
      toast.error('Failed to remove product')
    }
  }

  useEffect(() => {
    fetchCart()
  }, [])

  return (
    <CartContext.Provider value={{ cart, loading, addItem, updateItem, removeItem, fetchCart }}>
      {children}
    </CartContext.Provider>
  )
}