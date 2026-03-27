const Order = require('../models/Order')
const Cart = require('../models/Cart')
const Product = require('../models/Product')
const { checkout } = require('../services/checkoutService')
const { calculatePrices } = require('../utils/priceCalculator')

const createOrder = async (req, res, next) => {
  try {
    const order = await checkout(req.user._id)
    res.status(201).json(order)
  } catch (err) {
    next(err)
  }
}

const previewOrder = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product')

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' })
    }

    const orderItems = cart.items.map(item => {
      const product = item.product
      if (!product) throw new Error(`Product not found for ${item.product}`)
      return {
        product: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity
      }
    })

    const { subtotal, discount, shipping, total } = calculatePrices(orderItems)

    res.status(200).json({
      items: orderItems,
      subtotal,
      discount,
      shipping,
      total
    })
  } catch (err) {
    next(err)
  }
}

const getUserOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 })
    res.json(orders)
  } catch (err) {
    next(err)
  }
}

const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().populate('user', 'name email')
    res.json(orders)
  } catch (err) {
    next(err)
  }
}

module.exports = { createOrder, previewOrder, getUserOrders, getAllOrders }