import { useContext } from 'react'
import { CartContext } from '../context/CartContext'

export const useCartLogic = () => {
  return useContext(CartContext)
}