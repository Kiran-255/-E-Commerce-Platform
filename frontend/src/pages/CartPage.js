import { useCartLogic } from '../hooks/useCartLogic'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import EmptyState from '../components/ui/EmptyState'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import { useState } from 'react'

const CartPage = () => {
  const { cart, loading, updateItem, removeItem } = useCartLogic()
  const [updatingId, setUpdatingId] = useState(null)

  const handleQuantityChange = async (productId, value) => {
    if (value < 1) return
    setUpdatingId(productId)
    await updateItem(productId, value)
    setUpdatingId(null)
  }

  if (loading) return <LoadingSpinner />
  if (!cart.items.length) return <EmptyState message="Your cart is empty. Start shopping now!" />

  const subtotal = cart.items.reduce((acc, i) => acc + i.product.price * i.quantity, 0)
  const shipping = subtotal > 0 ? 200 : 0
  const total = subtotal + shipping

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-extrabold mb-8 text-gray-900">Your Cart</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <div className="hidden lg:block border rounded-xl shadow-sm">
            <table className="w-full text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2">Product</th>
                  <th className="px-4 py-2">Price</th>
                  <th className="px-4 py-2">Quantity</th>
                  <th className="px-4 py-2">Subtotal</th>
                  <th className="px-4 py-2">Remove</th>
                </tr>
              </thead>
              <tbody>
                {cart.items.map(({ product, quantity }) => (
                  <tr key={product._id} className="border-b">
                    <td className="px-4 py-3 flex items-center gap-4">
                      <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded" />
                      <span>{product.name}</span>
                    </td>
                    <td className="px-4 py-3">Rs. {product.price}</td>
                    <td className="px-4 py-3">
                      <Input type="number" min="1" max={product.stock} value={quantity} onChange={e => handleQuantityChange(product._id, parseInt(e.target.value))} className="w-20 text-center border rounded" />
                    </td>
                    <td className="px-4 py-3">Rs. {(product.price * quantity).toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <Button onClick={() => removeItem(product._id)} loading={updatingId === product._id} className="bg-red-500 hover:bg-red-600 px-3 py-1 text-white rounded">
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="lg:hidden flex flex-col gap-4">
            {cart.items.map(({ product, quantity }) => (
              <div key={product._id} className="border rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex-1">
                  <h2 className="font-semibold text-lg">{product.name}</h2>
                  <p className="text-gray-600">Price: Rs. {product.price}</p>
                  <p className="text-gray-600">Stock: {product.stock}</p>
                  <p className="text-gray-700 mt-1">Subtotal: Rs. {(product.price * quantity).toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-3 mt-2 sm:mt-0">
                  <Input type="number" min="1" max={product.stock} value={quantity} onChange={e => handleQuantityChange(product._id, parseInt(e.target.value))} className="w-20 text-center border rounded" />
                  <Button onClick={() => removeItem(product._id)} loading={updatingId === product._id} className="bg-red-500 hover:bg-red-600 px-4 py-2 text-white rounded">
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:w-1/3 sticky top-20 self-start border rounded-xl p-6 shadow-lg bg-white">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>Rs. {subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Shipping</span>
            <span>Rs. {shipping.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg mb-4">
            <span>Total</span>
            <span>Rs. {total.toFixed(2)}</span>
          </div>
          <Button className="w-full bg-green-600 hover:bg-green-700 px-6 py-3 text-white rounded-2xl shadow-lg">
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CartPage