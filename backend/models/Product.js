const mongoose = require('mongoose')

const productSchema = mongoose.Schema(

  {
    name: { type: String, required: true },
    price: { type: Number,  required: true },
    category: { type: String, required: true },
    
    stock: { type: Number,  required: true, min: 0 },
    description: { type: String, required: true },
    image: { type: String, required: false },
  },

  { timestamps: true }
)

module.exports = mongoose.model('Product',  productSchema)