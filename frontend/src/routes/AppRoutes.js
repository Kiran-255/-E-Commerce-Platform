import { Routes, Route } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Landing from '../pages/Landing'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Shop from '../pages/Shop'
import AdminProducts from '../pages/AdminProducts'
import ProtectedRoute from '../components/ProtectedRoute'
import ProductDetails from '../pages/ProductDetails'

const AppRoutes = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route
        
          path="/admin/products"
          element={
            <ProtectedRoute adminRequired={true}>
              <AdminProducts />
            </ProtectedRoute>
          }
        />
        
      </Routes>
    </>
  )
}

export default AppRoutes