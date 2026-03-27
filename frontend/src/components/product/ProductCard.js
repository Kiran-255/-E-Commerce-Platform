import { Link } from 'react-router-dom'

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition transform hover:scale-105 p-5 flex flex-col">
      <div className="overflow-hidden rounded-xl mb-4">
        <img
          src={product.image || '/placeholder.png'}
          alt={product.name}
          className="h-56 w-full object-cover transition-transform duration-300 hover:scale-105 rounded-xl"
        />
      </div>

      <h3 className="font-extrabold text-lg text-gray-900 mb-2">{product.name}</h3>
      <p className="text-gray-900 font-semibold text-lg mb-2">Rs. {product.price}</p>
      <p className="text-gray-700 text-sm mb-4 line-clamp-3">{product.description}</p>

      <div className="mt-auto flex gap-2">
        <Link
          to={`/product/${product._id}`}
          className="flex-1 bg-gray-900 text-white py-2 rounded-lg shadow hover:bg-green-700 transition text-center font-medium"
        >
          View Details
        </Link>
        {onAddToCart && (
          <button
            onClick={() => onAddToCart(product)}
            className="flex-1 bg-green-600 text-white py-2 rounded-lg shadow hover:bg-green-700 transition font-medium"
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  )
}

export default ProductCard