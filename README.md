# E-Commerce Platform (Full Stack)

A full-stack e-commerce platform built with **React**, **Node.js + Express**, and **MongoDB Atlas**. Users can browse products, manage carts, place orders, and the system supports role-based access for admin and customer users.

---

## Table of Contents

- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Folder Structure](#folder-structure)  
- [Setup Instructions](#setup-instructions)  
- [Core Features & Logic](#core-features--logic)  
- [State Management](#state-management)  
- [Advanced Features](#advanced-features)  
- [Demo](#demo)  
- [License](#license)  

---

## Features

### Authentication
- JWT-based authentication
- User registration & login
- Role-based access: Admin / Customer
- Protected API routes

### Product Management
- Admin: Create, update, delete products
- Product fields: name, price, category, stock, description
- Customer: Browse products, view details, filter by category, search

### Cart System
- Add/remove products
- Update quantity
- Cart stored per authenticated user

### Checkout System
- Stock validation
- Total calculation
- Discounts:
  - Total > 5000 → discount
  - Quantity > 3 → bulk discount
- Shipping logic:
  - Free above threshold
  - Fixed shipping fee otherwise
- Order creation

### Order Management
- Customer: View order history
- Admin: View all orders
- Track products, total price, status

### UI/UX
- Responsive design (mobile → desktop)
- Tailwind CSS styling
- Clean layout
- Loading and empty states

---

## Tech Stack

**Frontend:**  
- React  
- React Router  
- Context API for state management  
- Tailwind CSS  

**Backend:**  
- Node.js  
- Express.js  
- JWT authentication  
- MongoDB Atlas  

**Other Tools:**  
- Axios for API requests  
- bcrypt for password hashing  

---

## Folder Structure


ecommerce-platform/
│
├── backend/
│ ├── config/ # DB & environment config
│ ├── controllers/ # API logic
│ ├── models/ # MongoDB models
│ ├── routes/ # API routes
│ ├── middleware/ # Auth & error handling
│ └── server.js
│
├── frontend/
│ ├── src/
│ │ ├── components/ # UI components
│ │ ├── pages/ # Page components
│ │ ├── context/ # State management
│ │ ├── hooks/ # Custom hooks (useCartLogic / useCheckoutLogic)
│ │ ├── services/ # API calls
│ │ └── App.js
│ └── tailwind.config.js
│
├── .env # Environment variables
├── package.json
└── README.md


