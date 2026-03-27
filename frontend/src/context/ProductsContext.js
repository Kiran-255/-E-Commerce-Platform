import { createContext, useState } from 'react'
import api from '../api/axios'

export const ProductsContext = createContext()

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchProducts = async (params = {}) => {
    try {
      setLoading(true)

      const query = new URLSearchParams(params).toString()

      const { data } = await api.get(`/products?${query}`)

      setProducts(data.products || [])
      setPage(data.page)
      setTotalPages(data.totalPages)

      setLoading(false)
    } catch (err) {
      setError(err.response?.data?.message || err.message)
      setLoading(false)
    }
  }

  return (
    <ProductsContext.Provider
      value={{
        products,
        page,
        totalPages,
        loading,
        error,
        fetchProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}