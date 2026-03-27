const express = require('express')
const router = express.Router()

const { createOrder, previewOrder, getUserOrders, getAllOrders } = require('../controllers/orderController')

const { protect, admin } = require('../middleware/authMiddleware')

router.get('/preview', protect, previewOrder)
router.post('/checkout', protect, createOrder)

router.get('/my', protect, getUserOrders)

router.get('/', protect, admin, getAllOrders)

module.exports = router