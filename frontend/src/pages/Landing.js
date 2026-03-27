import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { ProductsContext } from '../context/ProductsContext'
import ProductCard from '../components/product/ProductCard'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import EmptyState from '../components/ui/EmptyState'
import Footer from '../components/layout/Footer'

const Landing = () => {
  const navigate = useNavigate()
  const { products, loading, error } = useContext(ProductsContext)

  const handleShopNow = () => navigate('/shop')

  const categories = [

    { name: 'Prayer Mats', img: '/images/categories/prayer-mats.jpg' },
    { name: 'Islamic Books', img: '/images/categories/islamic-books.jpg' },
    { name: 'Tasbeeh', img: '/images/categories/tasbeeh.jpg' },
    { name: 'Attar', img: '/images/categories/attar.jpg' }
  ]

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
   <div className="relative w-full">
        <img src="/images/hero-banner.jpg" alt="Islamic products" className="w-full h-[500px] md:h-[650px] object-cover" />

    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end md:items-center justify-center">
          <div className="text-center md:max-w-3xl px-6 py-12">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">Deen Essentials</h1>
            <p className="text-white text-lg md:text-2xl mt-4">Premium Islamic products for prayers, home & lifestyle</p>

            <button onClick={handleShopNow} className="mt-6 bg-green-600 text-white font-semibold py-3 px-10 rounded-2xl shadow-lg hover:bg-green-700 transition transform hover:scale-105">Shop Now</button>
          </div>
        </div>
      </div>

      <section className="py-20 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-4 text-center">Featured Products</h2>

        <p className="text-gray-600 mb-16 text-lg text-center">Most popular this season</p>

        {loading ? <LoadingSpinner /> : error ? <p className="text-red-500 font-medium text-center">{error}</p> : products.length === 0 ? <EmptyState message="No products available" /> : <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">{products.slice(0, 8).map(product => <ProductCard key={product._id} product={product} />)}</div>}

        <div className="flex justify-center mt-12">
          <button onClick={() => navigate('/shop')} className="bg-green-600 text-white py-3 px-6 rounded-2xl shadow-lg hover:bg-green-700 transition transform hover:scale-105 font-semibold">View All Products</button>
        </div>
      </section>

      <section className="py-20 px-6 max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold mb-12 text-gray-900">Shop by Category</h2>

        <div className="flex flex-wrap justify-center gap-8">

          {categories.map(cat => (
            <div key={cat.name} onClick={() => navigate(`/shop?category=${cat.name}`)} className="cursor-pointer w-52 rounded-2xl overflow-hidden shadow-md hover:shadow-lg hover:scale-105 transition transform bg-white border border-gray-200">
              <img src={cat.img} alt={cat.name} className="w-full h-44 object-cover" />
              
              <div className="py-2 text-gray-900 font-semibold text-lg text-center bg-gray-100">{cat.name}</div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Landing