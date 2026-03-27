const express = require ('express')
const Category = require('../models/Category.js')

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const categories = await Category.find()

    res.json(categories)
  } 
  catch (err) {
    res.status(500).json({ message: err.message })
  }
})


router.post('/', async (req, res) => {
  try {
    const { name } = req.body
    const category = new Category({ name })
    await category.save()
    
    res.status(201).json(category)
  } 
  catch (err) {
    res.status(400).json({ message: err.message })
  }
})

module.exports = router