const Product = require('../models/Product')

const getProducts = async (req, res, next) => {
  try {
    let { page, limit, sortBy, order, category, search } = req.query
    page = parseInt(page) || 1
    limit = Math.min(parseInt(limit) || 8, 50)
    order = order === 'desc' ? -1 : 1


    const filter = {}

    if (category) {
      filter.category = category
    }

    if (search) {
      filter.name = { $regex: search, $options: 'i' }
    }

    
    const allowedSortFields = ['price', 'name', 'createdAt']
    const sortObj = {}

    if (sortBy && allowedSortFields.includes(sortBy)) {
      sortObj[sortBy] = order
    } else {
      sortObj.createdAt = -1 
    }

    const totalProducts = await Product.countDocuments(filter)
    const totalPages = Math.ceil(totalProducts / limit)

    if (page > totalPages && totalPages > 0) {
      page = totalPages
    }

    const products = await Product.find(filter)
      .sort(sortObj)
      .skip((page - 1) * limit)
      .limit(limit)

    res.status(200).json({
      products,
      page,
      totalPages,
      totalProducts,
    })
  } catch (err) {
    next(err)
  }
}

const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) {
      res.status(404)

      throw new Error('Product not found')
    }
    res.json(product)
  } 
  catch (error) {
    next(error)
  }
}

const createProduct = async (req, res, next) => {
  try {
    const { name, price, category, stock, description, image } = req.body
    const product = new Product({ name, price, category, stock, description, image })
    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
  } catch (error) {
    next(error)
  }
}

const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)

    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }

    const allowedFields = ['name','price','category','stock','description','image']

    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        product[field] = req.body[field]
      }
    })

    const updatedProduct = await product.save()

    res.json(updatedProduct)
  } catch (error) {
    next(error)
  }
}

const deleteProduct = async (req, res, next) => {
  try {
   const product = await Product.findByIdAndDelete(req.params.id)
if (!product) return res.status(404).json({ message: 'Product not found' })
res.status(200).json({ message: 'Product deleted successfully' })

  } 
  catch (error) {
    next(error)
  }
}

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct }