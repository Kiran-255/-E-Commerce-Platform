import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import api from '../api/axios'
import LoadingSpinner from '../components/ui/LoadingSpinner'

const ProductDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()

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

    const cart = JSON.parse(localStorage.getItem('cart')) || []
    const existingItem = cart.find(item => item._id === product._id)

    if (existingItem) existingItem.quantity += 1
    else cart.push({ ...product, quantity: 1 })

    localStorage.setItem('cart', JSON.stringify(cart))

    alert('Added to cart')
  }

  if (loading) return <LoadingSpinner />
  if (error) return <p className="text-red-500 text-center">{error}</p>
  if (!product) return null

  return (
    <div className="container mx-auto p-6">

      <div className="grid md:grid-cols-2 gap-8 bg-white p-6 rounded-xl shadow-lg">
        
        <img
          src={product.image}

          alt={product.name}
          className="w-full h-96 object-cover rounded-lg"
        />
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-2">Category: {product.category}</p>

     <p className="text-green-700 font-bold text-xl mb-4">Rs. {product.price}</p>
          <p className="text-gray-700 mb-6">{product.description}</p>

          <button
            onClick={handleAddToCart}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
          >
            Add to Cart
            
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails