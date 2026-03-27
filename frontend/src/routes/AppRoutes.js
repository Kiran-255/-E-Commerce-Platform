import { Routes, Route } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Landing from '../pages/Landing'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Shop from '../pages/Shop'
import AdminProducts from '../pages/AdminProducts'
import ProtectedRoute from '../components/ProtectedRoute'
import ProductDetails from '../pages/ProductDetails'
import CartPage from '../pages/CartPage'

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
        <Route path="/cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
        
      </Routes>
    </>
  )
}

export default AppRoutes