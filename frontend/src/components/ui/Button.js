const Button = ({ type = 'button', children, loading = false, className = '' }) => (
  <button
    type={type}
    disabled={loading}
    className={`w-full py-3 px-4 rounded-lg font-semibold text-white shadow-sm transition-colors duration-200
      ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}
      ${className}`}
  >
    {loading ? 'Processing...' : children}
  </button>
)

export default Button