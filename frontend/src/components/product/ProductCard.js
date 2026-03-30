import { Link } from 'react-router-dom'

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-1 hover:scale-105 p-6 flex flex-col duration-300">
      <div className="overflow-hidden rounded-2xl mb-5 relative group">
        <img
          src={product.image || '/placeholder.png'}
          alt={product.name}
          className="h-60 w-full object-cover rounded-2xl transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
      </div>
      <h3 className="font-bold text-xl text-gray-900 mb-1 line-clamp-2 hover:text-green-600 transition-colors cursor-pointer">
        {product.name}
      </h3>
      <p className="text-gray-900 font-semibold text-lg mb-2">Rs. {product.price}</p>
      <p className="text-gray-600 text-sm mb-4 line-clamp-3">{product.description}</p>
      <div className="mt-auto flex gap-3">
        <Link
          to={`/product/${product._id}`}
          className="flex-1 text-center py-2 rounded-xl bg-gray-900 text-white font-medium shadow-md hover:bg-green-700 transition-all duration-300 hover:scale-105"
        >
          View Details
        </Link>
        {onAddToCart && (
          <button
            onClick={() => onAddToCart(product)}
            className="flex-1 text-center py-2 rounded-xl bg-green-600 text-white font-medium shadow-md hover:bg-green-700 transition-all duration-300 hover:scale-105"
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  )
}

export default ProductCard