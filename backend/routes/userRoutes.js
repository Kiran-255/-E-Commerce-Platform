const express = require('express')
const router = express.Router()
const { getAllUsers, getUserById, toggleBlockUser } = require('../controllers/userController')

const { protect, admin } = require('../middleware/authMiddleware')

router.use(protect)
router.use(admin)

router.get('/', getAllUsers)


router.get('/:id', getUserById)


router.put('/:id/block', toggleBlockUser)

module.exports = router