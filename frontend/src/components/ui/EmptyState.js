const EmptyState = ({ message = "Nothing to display here." }) => {
  return (
    <div className="flex flex-col justify-center items-center py-16 text-center">
    <svg
        className="w-24 h-24 text-gray-400 mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-6h6v6m2 4H7a2 2 0 01-2-2V7a2 2 0 012-2h4l2-2h4a2 2 0 012 2v12a2 2 0 01-2 2z"></path>
      </svg>

      <p className="text-gray-500 text-lg">{message}</p>
    </div>
  )
}

export default EmptyState