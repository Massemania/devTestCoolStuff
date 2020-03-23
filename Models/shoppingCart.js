//Mongoose model item

'use strict'

const mongoose = require('mongoose')

//Create a schema
const shoppingCartSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, minlength: 1 },
  quantity: { type: Number, required: true, default: false},
  category: { type: String, required: true }
}, {
  timestamps: true
})

//Create a model using the schema
const ShoppingCart = mongoose.model('ShoppingCart', shoppingCartSchema)

//Exports
module.exports = ShoppingCart