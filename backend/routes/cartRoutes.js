const express = require('express')
const { protect } = require('../middleware/authMiddleware')
const { getCart, addToCart, updateCart, removeFromCart } = require('../controllers/cartController')

const router = express.Router()

router.get('/', protect, getCart)
router.post('/add', protect, addToCart)
router.put('/update', protect, updateCart)
router.delete('/remove/:productId', protect, removeFromCart)

module.exports = router