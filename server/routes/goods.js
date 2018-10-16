const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Goods = require('../models/goods.js')

mongoose.connect('mongodb://127.0.0.1:27017/vue_db', {
  useNewUrlParser: true
})

mongoose.connection.on('connected', () => console.log('MongoDB connected success.'))

mongoose.connection.on('error', () => console.log('MongoDB connected fail.'))

mongoose.connection.on('disconnected', () => console.log('MongoDB connected disconnected.'))

router.get('/', async (req, res, next) => {
  try {
    let params = req.param('salePriceFilter') ? req.param('salePriceFilter') : {}
    let page = parseInt(req.param('page'), 10)
    let pageSize = parseInt(req.param('pageSize'))
    let sort = parseInt(req.param('sort'))
    let skip = (page - 1) * pageSize

    let goodsModel = Goods.find(params)
    goodsModel.sort({salePrice: sort}).skip(skip).limit(pageSize)

    let doc = await goodsModel.exec()
    res.json({
      req: req.query,
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

module.exports = router
