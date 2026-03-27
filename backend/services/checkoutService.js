const Cart = require('../models/Cart')
const Product = require('../models/Product')
const Order = require('../models/Order')
const { calculatePrices } = require('../utils/priceCalculator')

const checkout = async (userId) => {
    
  const cart = await Cart.findOne({ user: userId }).populate('items.product')

  if (!cart || cart.items.length === 0) {
    throw new Error('Cart is empty')
  }

  const orderItems = []


  for (const item of cart.items) {
    const product = item.product

    if (!product) {

      throw new Error('Product not found')
    }

    if (product.stock < item.quantity) {

      throw new Error(`Insufficient stock for ${product.name}`)
    }

    orderItems.push({
      product: product._id,
      name: product.name,

      price: product.price,
      quantity: item.quantity,
    })
  }

  const { subtotal, discount, shipping, total } = calculatePrices(orderItems)

  const order = await Order.create({
    user: userId,
    items: orderItems,
    subtotal,

    discount,
    shipping,
    total,
  })

 for (const item of cart.items) {

    const product = await Product.findById(item.product._id)
    product.stock -= item.quantity
    await product.save()
  }

  cart.items = []

  await cart.save()

  return order
}

module.exports = { checkout }