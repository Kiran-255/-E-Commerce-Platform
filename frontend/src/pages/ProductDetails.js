import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState, useContext } from 'react'
import api from '../api/axios'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import { CartContext } from '../context/CartContext'
import { toast } from 'react-toastify'

const ProductDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addItem } = useContext(CartContext)
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const { data } = await api.get(`/products/${id}`)
        setProduct(data)
        setLoading(false)
      } catch (err) {
        setError(err.response?.data?.message || err.message)
        setLoading(false)
      }
    }
    fetchProduct()
  }, [id])

  const handleAddToCart = () => {
    const user = JSON.parse(localStorage.getItem('userInfo'))
    if (!user) return navigate('/login')
    if (user.role !== 'customer') return
    addItem(product._id, 1)
    toast.success('Product added to cart')
  }

  if (loading) return <LoadingSpinner />
  if (error) return <p className="text-red-500 text-center mt-6">{error}</p>
  if (!product) return null

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white rounded-3xl shadow-xl p-8">
        <div className="w-full flex justify-center items-center">
          <img
            src={product.image || '/placeholder.png'}
            alt={product.name}
            className="w-full max-w-md h-96 object-cover rounded-2xl shadow-lg"
          />
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{product.name}</h1>
            <p className="text-gray-600 mb-2">Category: {product.category}</p>
            <p className="text-green-700 font-bold text-2xl mb-4">Rs. {product.price}</p>
            <p className="text-gray-700 mb-6 leading-relaxed">{product.description}</p>
          </div>
          <button
            onClick={handleAddToCart}
            className="mt-4 bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-6 rounded-2xl shadow-lg hover:from-green-700 hover:to-green-800 transition transform hover:scale-105 w-full md:w-auto font-semibold"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails