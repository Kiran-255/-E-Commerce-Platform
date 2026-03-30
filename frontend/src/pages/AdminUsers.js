import { useState, useEffect } from 'react'
import api from '../api/axios'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import { toast } from 'react-toastify'

const AdminUsers = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const { data } = await api.get('/users')
      setUsers(data || [])

    } catch (err) {
      setError(err.response?.data?.message || err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchUsers() }, [])

  const toggleBlockUser = async (user) => {
    try {
      const { data } = await api.put(`/users/${user._id}/block`)
      setUsers(prev =>

        prev.map(u => u._id === user._id ? { ...u, isBlocked: data.user.isBlocked } : u)
      )
      toast.success(data.user.isBlocked ? 'User blocked' : 'User unblocked');
    } catch (err) {
      toast.error(err.response?.data?.message || err.message)
    }
  }

  const filteredUsers = users.filter(u =>
    
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  )
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <div className="container mx-auto p-6 space-y-8">
 
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
        <div>

          <h1 className="text-3xl md:text-4xl font-bold text-green-600">All Users List</h1>

          <p className="text-gray-500 mt-1">Manage all registered users, block or unblock accounts.</p>
        </div>
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1) }}
          className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2
           focus:ring-green-600 transition w-full md:w-64"
        />
      </div>
      {loading ? (
      
      
      <div className="flex justify-center items-center h-[60vh]"><LoadingSpinner /></div>
      ) : error ? (
        <p className="text-red-500 font-medium">{error}</p>
      ) : (
        <>
          <div className="overflow-x-auto rounded-2xl shadow-md border">
            <table className="min-w-full divide-y divide-gray-200 bg-white">
              <thead className="bg-green-600 text-white">
                <tr className="text-left text-sm md:text-base">

                  <th className="py-3 px-6">Name</th>
                  <th className="py-3 px-6">Email</th>
                  <th className="py-3 px-6">Status</th>
                  <th className="py-3 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedUsers.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-10 text-gray-400">No users found</td>
                  </tr>
                ) : (

                  paginatedUsers.map(u => (
                    <tr key={u._id} className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="py-3 px-6 font-medium text-gray-900">{u.name}</td>
                      <td className="py-3 px-6 text-gray-600">{u.email}</td>
                      <td className="py-3 px-6">
                    <span className={`px-3 py-1 text-xs md:text-sm rounded-full font-semibold 
                          ${u.isBlocked ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                          {u.isBlocked ? 'Blocked' : 'Active'}
                        </span>
                      </td>
                      <td className="py-3 px-6 text-right">

                        <button
                          onClick={() => toggleBlockUser(u)}
                          className={`px-3 py-1 md:px-4 md:py-2 rounded-full font-medium shadow-sm transition duration-150
                            ${u.isBlocked
                              ? 'bg-white border border-green-600 text-green-600 hover:bg-green-50'
                              : 'bg-red-600 text-white hover:bg-red-700'}`}
                        >
                          {u.isBlocked ? 'Unblock' : 'Block'}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {totalPages > 1 && (
           
           <div className="flex justify-center mt-6 gap-2 flex-wrap">
              {[...Array(totalPages)].map((_, idx) => (
            
            <button
                  key={idx}

                  onClick={() => setCurrentPage(idx + 1)}
                  className={`px-4 py-2 rounded-lg font-medium transition
                    ${currentPage === idx + 1 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default AdminUsers