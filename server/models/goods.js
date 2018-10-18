const mongoose = require('mongoose')
const Schema = mongoose.Schema

let productSchema = new Schema({
  "productId" : String,
  "productName" : String,
  "salePrice" : Number,
  "productImage" : String,
  "productUrl" : String,
  "productNum" : Number,
  "checked" : Number
})

module.exports = mongoose.model('Good', productSchema)
