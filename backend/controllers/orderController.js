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
    let { page = 1, limit = 8, search = '', sortBy = 'createdAt', order = 'desc' } = req.query
    page = parseInt(page)
    limit = parseInt(limit)

    const query = {}
    if (search) {
      query.$or = [
        { 'user.name': { $regex: search, $options: 'i' } },
        { 'user.email': { $regex: search, $options: 'i' } }
      ]
    }

    const sortOrder = order === 'asc' ? 1 : -1

    const totalOrders = await Order.countDocuments()
    const totalPages = Math.ceil(totalOrders / limit)

    const orders = await Order.find(query)
      .populate('user', 'name email')
      .sort({ [sortBy]: sortOrder })
      .skip((page - 1) * limit)
      .limit(limit)

    res.json({ orders, totalPages, currentPage: page })
  } catch (err) {
    next(err)
  }
}


const updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body

    const order = await Order.findById(req.params.id)

if (!order) return res.status(404).json({ message: 'Order not found' })

    order.status = status
const updated = await order.save()

    res.json(updated)
  } 
  catch (err) {
    next(err)
  }
}

module.exports = { createOrder, previewOrder, getUserOrders, getAllOrders,updateOrderStatus }