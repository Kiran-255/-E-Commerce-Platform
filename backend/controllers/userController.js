const User = require('../models/User')

const getAllUsers = async (req, res, next) => {
  try {
  const users = await User.find({ _id: { $ne: req.user._id } })
      .select('-password')
      .sort({ createdAt: -1 })



    res.json(users)
  } 
  
  catch (err) {
    next(err)
  }
}

const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password')
if (!user) return res.status(404).json({ message: 'User not found' })
    res.json(user)

  } 
  catch (err) 
  {
    next(err)
  }
}


const toggleBlockUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)

    if (!user) return res.status(404).json({ message: 'User not found' })


if (req.user._id.toString() === user._id.toString()) {
      return res.status(400).json({ message: 'You cannot block yourself' })
    }

    user.isBlocked = !user.isBlocked
    user.blockedAt = user.isBlocked ? new Date() : null

    await user.save()

    res.json({

      message: user.isBlocked ? 'User blocked' : 'User unblocked',
      user
    })
  } catch (err) {
    next(err)
  }
}


module.exports = { getAllUsers, getUserById, toggleBlockUser}