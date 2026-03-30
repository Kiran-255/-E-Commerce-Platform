import { createContext, useState, useEffect, useCallback } from 'react'
import api from '../api/axios'
import { toast } from 'react-toastify'


export const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [] })
  const [loading, setLoading] = useState(false)


  const fetchCart = useCallback(async () => {
    try {
      setLoading(true) 

      const { data } = await api.get('/cart')
      setCart(data || { items: [] })

    } catch (err) {
      console.error('Failed to fetch cart:', err)
      setCart({ items: [] })
    } finally {
      setLoading(false)
    }
  }, [])

  const addItem = async (productId, quantity = 1) => {
    try {
      setLoading(true)
      const { data } = await api.post('/cart/add', { productId, quantity })
      setCart(data)
      toast.success('Product added to cart')
    } catch (err) {
      console.error('Add to cart error:', err)
      toast.error('Failed to add product to cart')
    } finally {
      setLoading(false)
    }
  }

  const updateItem = async (productId, quantity) => {
    try {
      setLoading(true)
      const { data } = await api.put('/cart/update', { productId, quantity })
      setCart(data)
      toast.success('Cart updated')
    } catch (err) {
      console.error('Update cart error:', err)
      toast.error('Failed to update cart')

    } finally {
      setLoading(false)
    }
  }

  const removeItem = async (productId) => {
    try {
      setLoading(true)
      const { data } = await api.delete(`/cart/remove/${productId}`)
      setCart(data)
      toast.success('Product removed from cart')
    } catch (err) {
      console.error('Remove cart item error:', err)


      toast.error('Failed to remove product')
    } 
    finally {
      setLoading(false)
    }
  }

  const clearCart = async () => {
    try {
      setLoading(true)
      await api.delete('/cart/clear')

      setCart({ items: [] })
    } 
    catch (err) {
      console.error('Clear cart error:', err)
    } 
    finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCart()
  }, [fetchCart])

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addItem,
        updateItem,
        removeItem,
        fetchCart,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  )
}