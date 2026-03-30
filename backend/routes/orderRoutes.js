const express = require('express')
const router = express.Router()

const { createOrder, previewOrder, getUserOrders, getAllOrders,updateOrderStatus } = require('../controllers/orderController')

const { protect, admin } = require('../middleware/authMiddleware')

router.get('/preview', protect, previewOrder)
router.post('/checkout', protect, createOrder)

router.get('/my', protect, getUserOrders)

router.get('/', protect, admin, getAllOrders)

router.put('/:id/status', protect, admin, updateOrderStatus)

module.exports = router