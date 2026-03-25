const Input = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  required = false,
  className = '',
}) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    required={required}
    className={`w-full px-4 py-3 mb-4 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 ${className}`}
  />
)

export default Input