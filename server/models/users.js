const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
  'userId': String,
  'userName': String,
  'userPwd': String,
  'orderList': Array,
  'cartList': [
    {
      "productId" : String,
      "productName" : String,
      "salePrice" : String,
      "productImage" : String,
      "productNum" : Number,
      "checked" : Number
    }
  ],
  'addressList': Array
})

module.exports = mongoose.model('User', UserSchema)
