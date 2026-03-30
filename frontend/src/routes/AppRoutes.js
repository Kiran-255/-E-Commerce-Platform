import { Routes, Route } from 'react-router-dom'
import Landing from '../pages/Landing'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Shop from '../pages/Shop'
import AdminProducts from '../pages/AdminProducts'
import ProtectedRoute from '../components/ProtectedRoute'
import ProductDetails from '../pages/ProductDetails'
import CartPage from '../pages/CartPage'
import Checkout from '../pages/Checkout'
import OrderConfirmation from '../pages/OrderConfirmation'
import OrderHistory from '../pages/OrderHistory'
import AdminOrders from '../pages/AdminOrders'
import AdminUsers from '../pages/AdminUsers'
import CustomerLayout from '../components/layout/CustomerLayout'

import AdminLayout from '../components/layout/AdminLayout'

import AdminDashboard from '../pages/AdminDashboard'

const AppRoutes = () => {
  return (
    <>
      
      <Routes>
         <Route element={<CustomerLayout />}>
        <Route path="/" element={<Landing />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        
        <Route path="/cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
        <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
       <Route path="/order-confirmation" element={<ProtectedRoute><OrderConfirmation /></ProtectedRoute>} />
        <Route path="/my-orders" element={<ProtectedRoute><OrderHistory /></ProtectedRoute>} />
      
      </Route>
      <Route path="/admin" element={<ProtectedRoute adminRequired={true}><AdminLayout /></ProtectedRoute>}>
          <Route index element={<AdminDashboard />} /> 
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="users" element={<AdminUsers />} />
        </Route>
      
      </Routes>
    </>
  )
}

export default AppRoutes