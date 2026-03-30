const Cart = require('../models/Cart')
const Product = require('../models/Product')

const getCart = async (req, res, next) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id }).populate('items.product')
    if (!cart) {
      cart = await Cart.create({ user: req.user._id, items: [] })
    }
    res.status(200).json(cart)
  } catch (err) {
    next(err)
  }
}

const addToCart = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body

    const product = await Product.findById(productId)
    if (!product) return res.status(404).json({ message: 'Product not found' })
    if (product.stock < quantity) return res.status(400).json({ message: 'Insufficient stock' })

    let cart = await Cart.findOne({ user: req.user._id })
    if (!cart) cart = await Cart.create({ user: req.user._id, items: [] })

    const itemIndex = cart.items.findIndex(i => i.product.toString() === productId)
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity
      if (cart.items[itemIndex].quantity > product.stock) cart.items[itemIndex].quantity = product.stock
    } else {
      cart.items.push({ product: productId, quantity })
    }

    await cart.save()
    const populatedCart = await cart.populate('items.product')
    res.status(200).json(populatedCart)
  } catch (err) {
    next(err)
  }
}

const updateCart = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body

    const product = await Product.findById(productId)
    if (!product) return res.status(404).json({ message: 'Product not found' })
    if (quantity < 1) return res.status(400).json({ message: 'Quantity must be at least 1' })
    if (quantity > product.stock) return res.status(400).json({ message: 'Exceeds stock' })

    const cart = await Cart.findOne({ user: req.user._id })
    if (!cart) return res.status(404).json({ message: 'Cart not found' })

    const itemIndex = cart.items.findIndex(i => i.product.toString() === productId)
    if (itemIndex === -1) return res.status(404).json({ message: 'Item not in cart' })

    cart.items[itemIndex].quantity = quantity
    await cart.save()
    const populatedCart = await cart.populate('items.product')
    res.status(200).json(populatedCart)
  } catch (err) {
    next(err)
  }
}

const removeFromCart = async (req, res, next) => {
  try {
    const { productId } = req.params

    const cart = await Cart.findOne({ user: req.user._id })
    if (!cart) return res.status(404).json({ message: 'Cart not found' })

    cart.items = cart.items.filter(i => i.product.toString() !== productId)
    await cart.save()

    const populatedCart = await cart.populate('items.product')
    res.status(200).json(populatedCart)
  } catch (err) {
    next(err)
  }
}

module.exports = { getCart, addToCart, updateCart, removeFromCart }