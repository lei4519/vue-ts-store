const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Goods = require('../models/goods.js')
const User = require('../models/users.js')

mongoose.connect('mongodb://127.0.0.1:27017/vue_db', {
  useNewUrlParser: true
})

mongoose.connection.on('connected', () => console.log('MongoDB connected success.'))

mongoose.connection.on('error', () => console.log('MongoDB connected fail.'))

mongoose.connection.on('disconnected', () => console.log('MongoDB connected disconnected.'))

router.get('/goodsList', async (req, res) => {
  try {
    let params = {}
    let page = parseInt(req.param('page'), 10)
    let pageSize = parseInt(req.param('pageSize'))
    let sort = parseInt(req.param('sort'))
    let skip = (page - 1) * pageSize
    if (Boolean(parseInt(req.param('$lte'), 10))) {
      params = {
        salePrice: {
          $gte: parseInt(req.param('$gte'), 10),
          $lte: parseInt(req.param('$lte'), 10)
        }
      }
    }

    let goodsModel = Goods.find(params)
    goodsModel.sort({salePrice: sort}).skip(skip).limit(pageSize)

    let doc = await goodsModel.exec()
    res.json({
      status: '0',
      msg: '',
      result: {
        count: doc.length,
        list: doc
      }
    })
  } catch (err) {
    res.json({
      status: '1',
      msg: err.message
    })
  }
})
  .post('/addCart', async (req, res) => {
    try {
      const userId = '100000077'
      const productId = req.body.productId

      const userDoc = await User.findOne({userId})
      if (!userDoc) {
        return res.json({
          status: '1',
          msg: '查询用户信息失败'
        })
      }
      let productDoc = await Goods.findOne({productId})
      if (!productDoc) {
        return res.json({
          status: '1',
          msg: '查询商品信息失败'
        })
      }
      let cartListItem =  userDoc.cartList.find(item => item.productId === productDoc.productId)
      if (cartListItem) {
        cartListItem.productNum++
      } else {
        productDoc.productNum = 1
        productDoc.checked = 1
        userDoc.cartList.push(productDoc)
      }
      await userDoc.save()
      res.json({
        status: '0',
        msg: '加入购物车成功',
        result: {
          userDoc
        }
      })
    } catch (err) {
      res.json({
        status: '1',
        msg: err.message
      })
    }
  })

module.exports = router
