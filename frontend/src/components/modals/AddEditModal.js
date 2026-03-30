import { useRef, useEffect, useState } from 'react'
import Button from '../ui/Button'
import { toast } from 'react-toastify'

const AddEditModal = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  initialData = {}, 
  fields = [] 
}) => {
  const modalRef = useRef()
  const [formData, setFormData] = useState(initialData)
  const [loading, setLoading] = useState(false)
  const [imagePreview, setImagePreview] = useState(initialData.image || '')

  useEffect(() => {
    setFormData(initialData)
    setImagePreview(initialData.image || '')
  }, [initialData])

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) onClose()
  }

  useEffect(() => {
    if (isOpen) document.addEventListener('mousedown', handleOutsideClick)
    else document.removeEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [isOpen])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (name === 'image') setImagePreview(value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await onSubmit(formData)
      toast.success(initialData._id ? 'Updated successfully' : 'Created successfully')
      onClose()
    } catch (err) {
      toast.error(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div
        ref={modalRef}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-xl p-8 animate-fadeIn scale-95 transition-transform duration-300"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-900">
          {initialData._id ? 'Edit Product' : 'Add New Product'}
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {fields.map((field) => (
            <div key={field.name} className="flex flex-col">
              {field.type === 'select' ? (
                <select
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={handleChange}
                  required={field.required}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none hover:border-green-400 transition"
                >
                  <option value="">{field.placeholder}</option>
                  {field.options?.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type || 'text'}
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  required={field.required}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none hover:border-green-400 transition"
                />
              )}
            </div>
          ))}

          {imagePreview && (
            <div className="mt-2 w-40 h-40 border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="flex justify-end gap-3 mt-6">
            <Button
              type="button"
              className="bg-gray-400/70 text-gray-800 px-5 py-2 rounded-lg hover:bg-gray-500/70 transition shadow-sm"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow-md transition"
              disabled={loading}
            >
              {loading ? 'Saving...' : initialData._id ? 'Update Product' : 'Add Product'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddEditModal