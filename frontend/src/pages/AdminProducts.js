import { useState, useEffect, useRef } from 'react'
import api from '../api/axios'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import Button from '../components/ui/Button'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'

const AdminProducts = () => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([]) 
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [modalOpen, setModalOpen] = useState(false)

  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [deletingProduct, setDeletingProduct] = useState(null)

  const [submitLoading, setSubmitLoading] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const [currentPage, setCurrentPage] = useState(1)
  const [imagePreview, setImagePreview] = useState('') 
  const itemsPerPage = 8

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '', 
    stock: '',
    description: '',
    image: '',
  })

  const modalRef = useRef()
  const fetchCategories = async () => {
    try {
      const { data } = await api.get('/categories')
      setCategories(data)
    } catch (err) {
      console.log(err)
    }
  }
  const fetchProducts = async () => {
    try {
      setLoading(true)
      const { data } = await api.get('/products')
      setProducts(data.products || [])
    } catch (err) {
      setError(err.response?.data?.message || err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories() 
    fetchProducts()
  }, [])

  // Modal handlers
  const openModal = (product = null) => {
    setEditingProduct(product)
    setFormData(
  
      product
        ? { ...product }
        : { name: '', price: '', category: '', stock: '', description: '', image: '' }
    )
    setImagePreview(product?.image || '') 

    setModalOpen(true)
  }

  const closeModal = () => {
    setEditingProduct(null)
    setModalOpen(false)
    
    setImagePreview('') 
  }

  const openDeleteModal = (product) => {
    setDeletingProduct(product)

    setDeleteModalOpen(true)
  }

  const closeDeleteModal = () => {
    setDeletingProduct(null)
    setDeleteModalOpen(false)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (name === 'image') setImagePreview(value) 
  }
  const validateForm = () => {
    const { name, price, stock, category, image } = formData
    if (!name || !category || !image) return 'Please fill all required fields.'

    if (Number(price) < 0) return 'Price cannot be negative.'
    if (Number(stock) < 0) return 'Stock cannot be negative.'
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationError = validateForm()
    if (validationError) return alert(validationError)

    try {
      setSubmitLoading(true)
      const payload = {
        ...formData,
        price: Number(formData.price),

        stock: Number(formData.stock),
      }

      if (editingProduct) await api.put(`/products/${editingProduct._id}`, payload)
      else await api.post('/products', payload)

      await fetchProducts()

      closeModal()
    } catch (err) {
      alert(err.response?.data?.message || err.message)
    } finally {
      setSubmitLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!deletingProduct) return
    try {
      setDeleteLoading(true)
      await api.delete(`/products/${deletingProduct._id}`)
      await fetchProducts()
      closeDeleteModal()
    } catch (err) {
      alert(err.response?.data?.message || err.message)
    } finally {
      setDeleteLoading(false)
    }
  }


  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) closeModal()
  }

  useEffect(() => {
    if (modalOpen) document.addEventListener('mousedown', handleOutsideClick)
    else document.removeEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [modalOpen])


  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())

  )
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const paginatedProducts = filteredProducts.slice(

    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-3">
        <h1 className="text-3xl font-bold text-gray-900">Products Management</h1>
        <div className="flex gap-3 flex-wrap">
          <input

            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setCurrentPage(1)
            }}
            className="border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <Button
            className="bg-green-600 hover:bg-green-700 text-white w-auto rounded-lg shadow-md"
            onClick={() => openModal()}
          >
            + Add Product
          </Button>
        </div>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <p className="text-red-500 font-medium">{error}</p>
      ) : (
        <>
          <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200 bg-white rounded-lg">
              <thead className="bg-green-600 text-white">
                <tr>
        <th className="py-3 px-6 text-left font-medium">Name</th>
                  <th className="py-3 px-6 text-left font-medium">Category</th>
                  <th className="py-3 px-6 text-left font-medium">Price</th>
                  <th className="py-3 px-6 text-left font-medium">Stock</th>
                  <th className="py-3 px-6 text-right font-medium">Actions</th>
                </tr>
              </thead>
         <tbody className="divide-y divide-gray-200">


                {paginatedProducts.map((p) => (
                  <tr key={p._id} className="hover:bg-green-50 transition">
                    <td className="py-3 px-6 font-medium text-gray-900">{p.name}</td>
                    <td className="py-3 px-6 text-gray-700">{p.category}</td>
                    <td className="py-3 px-6 font-semibold text-gray-900">Rs. {p.price}</td>
                    <td className="py-3 px-6 text-gray-700">{p.stock}</td>
                    <td className="py-3 px-6 text-right flex justify-end gap-2">
                      <button
                        onClick={() => openModal(p)}
                        className="flex items-center gap-1 bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg transition shadow-sm"
                      >
                        <PencilIcon className="w-4 h-4" /> Edit
                      </button>
                      <button
                        onClick={() => openDeleteModal(p)}
                        className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg transition shadow-sm"
                      >
            <TrashIcon className="w-4 h-4" /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

      {totalPages > 1 && (
            <div className="flex justify-center mt-6 gap-2">
              {[...Array(totalPages)].map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(idx + 1)}
            className={`px-4 py-2 rounded ${
                    
                    currentPage === idx + 1 ? 'bg-green-600 text-white' : 'bg-gray-200'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          )}
        </>
      )}

    
      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        >
          <div
            ref={modalRef}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 animate-fadeIn"
          >
       <h2 className="text-2xl font-bold mb-6">
              {editingProduct ? 'Edit Product' : 'Add Product'}
            </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="name"
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
        
              <select
                name="category"
                value={formData.category}
          onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <input
                name="price"
                type="number"
                placeholder="Price"
                value={formData.price}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
              <input
        name="stock"
                type="number"
                placeholder="Stock"
                value={formData.stock}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
              <input
                name="image"
                type="url"
                placeholder="Image URL"
                value={formData.image}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
    
           {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="mt-2 w-32 h-32 object-cover rounded-lg border"
                />
              )}
              <input
                name="description"
                type="text"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
              />

              <div className="flex justify-end gap-3 mt-4">
                <Button
                  type="button"
                  className="bg-gray-300 text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-400"
                  onClick={closeModal}
                  disabled={submitLoading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
                  disabled={submitLoading}
                >
                  {submitLoading ? 'Saving...' : editingProduct ? 'Update' : 'Add'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

    

      {deleteModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        >
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center animate-fadeIn">
            <h3 className="text-xl font-bold mb-4">Confirm Delete</h3>
            <p className="mb-6 text-gray-800">
           Are you sure you want to delete{' '}
              <span className="font-semibold">{deletingProduct?.name}</span>?
            </p>
            <div className="flex justify-center gap-4">
              <Button
                type="button"
                className="bg-gray-300 text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-400"
                onClick={closeDeleteModal}
                disabled={deleteLoading}
              >
                Cancel
              </Button>
              <Button
                type="button"
           className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                onClick={handleDelete}
                disabled={deleteLoading}
              >
         {deleteLoading ? 'Deleting...' : 'Delete'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminProducts