🛒 E-Commerce Platform (Full Stack)
📌 Project Overview

This project is a complete full-stack E-Commerce Platform built as part of an evaluation assignment. It allows users to browse products, manage their cart, and place orders, while providing admins with full control over products, users, and orders.

🚀 Tech Stack
Frontend
React.js
React Router
Context API (State Management)
Tailwind CSS
Backend
Node.js
Express.js
MongoDB Atlas
JWT Authentication
🔐 Authentication & Authorization
JWT-based authentication system
Role-based access control:
Admin
Customer
Protected routes for both frontend and backend
APIs
Register User
Login User
👥 Roles & Permissions
Admin
Manage Products (CRUD)
Manage Users
Manage Orders
Customer
Browse Products
Add to Cart
Place Orders
📦 Features
🛍️ Product Management
Create, Update, Delete Products (Admin only)
View all products
View single product details
Search and filter by category
🛒 Cart System
Add to cart
Remove from cart
Update product quantity
Cart linked to authenticated user
💳 Checkout System
Stock validation
Total price calculation
Discount application
Shipping cost calculation
Order creation
📊 Pricing Logic
Discount applied if total > 5000
Bulk discount if quantity > 3
Prevent negative stock
Reject checkout if stock is insufficient
🚚 Shipping Logic
Free shipping above threshold
Fixed shipping fee otherwise
📦 Order Management
Create Order
Get User Orders
Get All Orders (Admin)
🧠 State Management

Managed using Context API:

Products Context
Cart Context
Orders Context
🔍 Search & Filters
Search products by name
Filter products by category
⚙️ Hooks Used
useState
useEffect
useMemo
Custom Hooks
useCartLogic
useCheckoutLogic
🎨 UI/UX
Fully responsive design (Mobile → Desktop)
Built with Tailwind CSS
Clean and modern layout
Loading states
Empty states
⭐ Advanced Features
Cart persistence using localStorage
Order status updates
