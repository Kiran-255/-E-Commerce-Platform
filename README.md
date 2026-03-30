# 🛒 E-Commerce Platform (Full Stack)

A production-style full-stack e-commerce application built to demonstrate strong architecture, real business logic, and clean UI/UX.

---

## ⚡ Features

- JWT Authentication (Register/Login)
- Role-Based Access Control (Admin / Customer)
- Product Management (CRUD)
- Cart System (per user)
- Checkout with stock validation
- Order Management
- Search & Category Filters
- Responsive UI

---

## 🧱 Tech Stack

### Frontend
- React
- React Router
- Context API
- Tailwind CSS

### Backend
- Node.js
- Express.js

### Database
- MongoDB Atlas

### Authentication
- JSON Web Tokens (JWT)

---

## 🔐 Authentication & Authorization

- Secure login and registration
- Token-based authentication
- Protected routes (frontend + backend)
- Role-based middleware

| Role     | Permissions |
|----------|------------|
| Admin    | Manage products, users, orders |
| Customer | Browse, cart, orders |

---

## 📦 Product Management

### Admin
- Create product
- Update product
- Delete product

### Public
- Get all products
- Get single product

### Product Fields
- Name
- Price
- Category
- Stock
- Description

---

## 🛒 Cart System

- Add to cart
- Remove from cart
- Update quantity
- Stored per authenticated user

---

## 💳 Checkout System

### Validations
- Stock check before order
- Prevent negative stock
- Reject if insufficient stock

### Pricing Logic
- Discount if total > 5000
- Bulk discount if quantity > 3

### Shipping
- Free above threshold
- Fixed fee otherwise

---

## 📦 Order System

- Create order
- Get user orders
- Admin: get all orders

### Order Data
- Products
- Total price
- Status

---

## 🧠 State Management

Using Context API:
- Product Context
- Cart Context
- Order Context

---

## 🔍 Search & Filters

- Search by product name
- Filter by category

---

## ⚙️ Hooks

- useState
- useEffect
- useMemo

### Custom Hooks
- useCartLogic
- useCheckoutLogic

---

## 🎨 UI / UX

- Fully responsive (mobile → desktop)
- Clean layout
- Loading states
- Empty states
- Tailwind CSS styling

---

## ⭐ Advanced Features

- Cart persistence (localStorage)
- Coupon/discount system
- Order status updates

---
# 🛒 E-Commerce Platform (Full Stack)

A production-style full-stack e-commerce application built to demonstrate strong architecture, real business logic, and clean UI/UX.

---

## ⚡ Features

- JWT Authentication (Register/Login)
- Role-Based Access Control (Admin / Customer)
- Product Management (CRUD)
- Cart System (per user)
- Checkout with stock validation
- Order Management
- Search & Category Filters
- Responsive UI

---

## 🧱 Tech Stack

### Frontend
- React
- React Router
- Context API
- Tailwind CSS

### Backend
- Node.js
- Express.js

### Database
- MongoDB Atlas

### Authentication
- JSON Web Tokens (JWT)

---

## 🔐 Authentication & Authorization

- Secure login and registration
- Token-based authentication
- Protected routes (frontend + backend)
- Role-based middleware

| Role     | Permissions |
|----------|------------|
| Admin    | Manage products, users, orders |
| Customer | Browse, cart, orders |

---

## 📦 Product Management

### Admin
- Create product
- Update product
- Delete product

### Public
- Get all products
- Get single product

### Product Fields
- Name
- Price
- Category
- Stock
- Description

---

## 🛒 Cart System

- Add to cart
- Remove from cart
- Update quantity
- Stored per authenticated user

---

## 💳 Checkout System

### Validations
- Stock check before order
- Prevent negative stock
- Reject if insufficient stock

### Pricing Logic
- Discount if total > 5000
- Bulk discount if quantity > 3

### Shipping
- Free above threshold
- Fixed fee otherwise

---

## 📦 Order System

- Create order
- Get user orders
- Admin: get all orders

### Order Data
- Products
- Total price
- Status

---

## 🧠 State Management

Using Context API:
- Product Context
- Cart Context
- Order Context

---

## 🔍 Search & Filters

- Search by product name
- Filter by category

---

## ⚙️ Hooks

- useState
- useEffect
- useMemo

### Custom Hooks
- useCartLogic
- useCheckoutLogic

---

## 🎨 UI / UX

- Fully responsive (mobile → desktop)
- Clean layout
- Loading states
- Empty states
- Tailwind CSS styling

---

## ⭐ Advanced Features

- Cart persistence (localStorage)
- Coupon/discount system
- Order status updates

---

## 📁 Folder Structure
📦 ecommerce-platform
├── 📁 client
│   ├── 📁 components
│   ├── 📁 pages
│   ├── 📁 context
│   ├── 📁 hooks
│   └── 📁 api
│
├── 📁 server
│   ├── 📁 controllers
│   ├── 📁 models
│   ├── 📁 routes
│   ├── 📁 middleware
│   └── 📁 config
│
├── 📄 README.md
├── 📄 package.json
└── 📄 .gitignore


