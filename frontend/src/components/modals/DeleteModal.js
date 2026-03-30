import Button from '../ui/Button'
import { toast } from 'react-toastify'
import { useState } from 'react'

const DeleteModal = ({ isOpen, onClose, onConfirm, itemName }) => {
  const [loading, setLoading] = useState(false)

  if (!isOpen) return null

  const handleConfirm = async () => {
    setLoading(true)
    try {
      await onConfirm()
      
      toast.success('Deleted successfully')
      onClose()
    } 
    catch (err) {
      toast.error(err.message || 'Something went wrong')
    } 
    finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">

      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center animate-fadeIn">
       
        <h3 className="text-xl font-bold mb-4">Confirm Delete</h3>

     <p className="mb-6 text-gray-800">
          
          Are you sure you want to delete <span className="font-semibold">{itemName}</span>?
        </p>
        <div className="flex justify-center gap-4">

          <Button
            type="button"

            className="bg-gray-400/70 text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-500"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            
        type="button"
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
            onClick={handleConfirm}
            disabled={loading}
          >
            {loading ? 'Deleting...' : 'Delete'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal