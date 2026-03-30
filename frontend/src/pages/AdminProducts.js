import { useState, useEffect, useRef } from 'react'
import api from '../api/axios'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import Button from '../components/ui/Button'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import { toast } from 'react-toastify'
import AddEditModal from '../components/modals/AddEditModal'
import DeleteModal from '../components/modals/DeleteModal'

const AdminProducts = () => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [editingProduct, setEditingProduct] = useState(null)
  const [deletingProduct, setDeletingProduct] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [totalPages, setTotalPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const debounceRef = useRef(null)
  const itemsPerPage = 8

  const fetchCategories = async () => {
    try {
      const { data } = await api.get('/categories')
      setCategories(data)
    } catch (err) {
      console.log(err)
    }
  }

  const fetchProducts = async (page = 1, search = '') => {
    try {
      setLoading(true)
      const query = `/products?page=${page}&limit=${itemsPerPage}${search ? `&search=${search}` : ''}`
      const { data } = await api.get(query)
      setProducts(data.products || [])
      setTotalPages(data.totalPages || 1)
      setCurrentPage(data.page || 1)
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

  const openAddEditModal = (product = null) => {
    setEditingProduct(product)
    setIsModalOpen(true)
  }

  const closeAddEditModal = () => {
    setEditingProduct(null)
    setIsModalOpen(false)
  }

  const openDeleteModal = product => setDeletingProduct(product)
  const closeDeleteModal = () => setDeletingProduct(null)

  const handleSubmit = async formData => {
    try {
      const payload = { ...formData, price: Number(formData.price), stock: Number(formData.stock) }
      if (editingProduct) {
        await api.put(`/products/${editingProduct._id}`, payload)
        toast.success('Product updated')
      } else {
        await api.post('/products', payload)
        toast.success('Product created')
      }
      fetchProducts(currentPage, searchTerm)
      closeAddEditModal()
    } catch (err) {
      toast.error(err.response?.data?.message || err.message)
    }
  }

  const handleDelete = async () => {
    if (!deletingProduct) return
    try {
      await api.delete(`/products/${deletingProduct._id}`)
      toast.success('Product deleted')
      fetchProducts(currentPage, searchTerm)
      closeDeleteModal()
    } catch (err) {
      toast.error(err.response?.data?.message || err.message)
    }
  }

  const handleSearch = value => {
    setSearchTerm(value)
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => fetchProducts(1, value), 400)
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-3">
        <h1 className="text-3xl font-bold text-gray-900">Products Management</h1>
        <div className="flex gap-3 flex-wrap">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={e => handleSearch(e.target.value)}
            className="border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm w-full md:w-64"
          />
          <Button
            className="bg-green-600 hover:bg-green-700 text-white w-auto rounded-lg shadow-md"
            onClick={() => openAddEditModal(null)}
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
              <thead className="bg-green-600 text-white sticky top-0 z-10">
                <tr>
                  <th className="py-3 px-3 text-left font-medium">Image</th>
                  <th className="py-3 px-6 text-left font-medium">Name</th>
                  <th className="py-3 px-6 text-left font-medium">Category</th>
                  <th className="py-3 px-6 text-left font-medium">Price</th>
                  <th className="py-3 px-6 text-left font-medium">Stock</th>
                  <th className="py-3 px-6 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-10 text-gray-500">
                      No products found
                    </td>
                  </tr>
                ) : (
                  products.map((p, idx) => (
                    <tr key={p._id} className={`transition hover:bg-green-50 ${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                      <td className="py-3 px-3">
                        <img src={p.image} alt={p.name} className="w-12 h-12 object-cover rounded-lg border" />
                      </td>
                      <td className="py-3 px-6 font-medium text-gray-900">{p.name}</td>
                      <td className="py-3 px-6 text-gray-700">{p.category}</td>
                      <td className="py-3 px-6 font-semibold text-gray-900">Rs. {p.price}</td>
                      <td className="py-3 px-6">
                        {p.stock <= 5 ? (
                          <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold">⚠️ Low ({p.stock})</span>
                        ) : (
                          <span className="text-gray-700 font-medium">{p.stock}</span>
                        )}
                      </td>
                      <td className="py-3 px-6 text-right flex justify-end gap-2">
                        <button
                          onClick={() => openAddEditModal(p)}
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
                  ))
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-6 gap-2 flex-wrap">
              <button
                onClick={() => fetchProducts(currentPage - 1, searchTerm)}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded font-medium transition ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-700 hover:bg-gray-300 shadow-sm'}`}
              >
               ← Previous
              </button>
              {[...Array(totalPages)].map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => fetchProducts(idx + 1, searchTerm)}
                  className={`px-4 py-2 rounded font-medium transition ${currentPage === idx + 1 ? 'bg-green-600 text-white shadow' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                >
                  {idx + 1}
                </button>
              ))}
              <button
                onClick={() => fetchProducts(currentPage + 1, searchTerm)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded font-medium transition ${currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-700 hover:bg-gray-300 shadow-sm'}`}
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}

      <AddEditModal
        isOpen={isModalOpen}
        onClose={closeAddEditModal}
        onSubmit={handleSubmit}
        initialData={editingProduct || {}}
        fields={[
          { name: 'name', placeholder: 'Name', required: true },
          { name: 'category', type: 'select', placeholder: 'Select Category', required: true, options: categories.map(c => ({ value: c.name, label: c.name })) },
          { name: 'price', type: 'number', placeholder: 'Price', required: true },
          { name: 'stock', type: 'number', placeholder: 'Stock', required: true },
          { name: 'image', placeholder: 'Image URL', required: true },
          { name: 'description', placeholder: 'Description' },
        ]}
      />
      <DeleteModal
        isOpen={!!deletingProduct}
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
        itemName={deletingProduct?.name}
      />
    </div>
  )
}

export default AdminProducts