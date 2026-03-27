import { useState, useEffect, useContext } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { ProductsContext } from '../context/ProductsContext'
import ProductCard from '../components/product/ProductCard'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import EmptyState from '../components/ui/EmptyState'
import api from '../api/axios'

let debounceTimer
const Shop = () => {
  const { products,page, totalPages,loading, error, fetchProducts, } = useContext(ProductsContext)

  const [searchParams] = useSearchParams()
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')

  const [sortOption, setSortOption] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const [categories, setCategories] = useState([])
  const [currentCategory, setCurrentCategory] = useState(searchParams.get('category') || '')

  const navigate = useNavigate()

  const fetchCategories = async () => {

    try {
      const { data } = await api.get('/categories')
      setCategories(data)
    } 
    catch (err) {
      console.error('Failed to fetch categories:', err)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => setDebouncedSearch(searchTerm), 300)
    return () => clearTimeout(debounceTimer)
  }, [searchTerm])

  useEffect(() => {
    const [sortBy, order] = sortOption ? sortOption.split('_') : ['', '']

    fetchProducts({
      page: currentPage,
      limit: 8,
      search: debouncedSearch,
      category: currentCategory,
      sortBy,
      order,
    })
  }, [currentPage, debouncedSearch, currentCategory, sortOption])

  const handleAddToCart = (product) => {
   
    const user = JSON.parse(localStorage.getItem('userInfo'))
    if (!user) return navigate('/login')

    const cart = JSON.parse(localStorage.getItem('cart')) || []

    const existingItem = cart.find(item => item._id === product._id)
    if (existingItem) existingItem.quantity += 1
    else cart.push({ ...product, quantity: 1 })

    localStorage.setItem('cart', JSON.stringify(cart))
    alert('Product added to cart!')
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Shop</h1>

      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6 items-center">
        <div className="flex">
        
        
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={e => {
              setCurrentPage(1)
              setSearchTerm(e.target.value)
            }}
            className="border rounded-l px-4 py-2 w-64 focus:outline-none"
          />
          <button
            className="bg-green-600 text-white px-4 rounded-r"
            onClick={() =>
              fetchProducts({
                page: 1,
                limit: 8,
                search: searchTerm,
                category: currentCategory,
                ...(sortOption
                  ? { sortBy: sortOption.split('_')[0], order: sortOption.split('_')[1] }: {}),
              })
            }
          >
            Search
 </button>
        </div>

        <select
          value={currentCategory}
          onChange={(e) => {
            setCurrentPage(1)
            setCurrentCategory(e.target.value)
          }}
          className="border px-3 py-2 rounded"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (

            <option key={cat._id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>

        <select
          value={sortOption}
          onChange={e => {
            setCurrentPage(1)
            setSortOption(e.target.value)
          }}
          className="border px-3 py-2 rounded"
        >
          <option value="">Sort By</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="name_asc">Name: A → Z</option>
          <option value="name_desc">Name: Z → A</option>
          <option value="createdAt_desc">Newest First</option>
          <option value="createdAt_asc">Oldest First</option>
        </select>
      </div>

 {currentCategory && (
        <p className="text-center mb-4 text-green-800 font-semibold">
          Category: {currentCategory}
        </p>
      )}
  {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : products.length === 0 ? (
        <EmptyState message="No products found" />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(product => (
        <ProductCard
         key={product._id}
              product={product}
              onAddToCart={handleAddToCart} 
            />
          ))}
     </div>
      )}

   {totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-3">
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx + 1}
         onClick={() => setCurrentPage(idx + 1)}
          className={`px-4 py-2 rounded ${
                currentPage === idx + 1
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200'
              }`}  > {idx + 1}</button>
  ))}
        </div>
      )}
    </div>
  )
}

export default Shop