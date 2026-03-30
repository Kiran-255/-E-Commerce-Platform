const Order = require('../models/Order')
const Product = require('../models/Product')
const User = require('../models/User')

const getDashboardStats = async (req, res, next) => {
  try {
    const totalOrders = await Order.countDocuments()

    const totalProducts = await Product.countDocuments()
    const totalUsers = await User.countDocuments()
    

    const revenueData = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$total' }
        }
      }
    ])

    const totalRevenue = revenueData[0]?.totalRevenue || 0
    const pendingOrders = await Order.countDocuments({ status: 'pending' })


    const lowStock = await Product.countDocuments({ stock: { $lte: 5 } })

    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('user', 'name')

    res.json({
      
        totalOrders,
      totalProducts,
      totalUsers,
      totalRevenue,
      pendingOrders,
      lowStock,
      recentOrders
    })
  } catch (err) {
    next(err)
  }
}

module.exports = { getDashboardStats }