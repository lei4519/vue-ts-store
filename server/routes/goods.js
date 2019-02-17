const express = require('express')
const router = express.Router()
const goods_db = require('../db/db-goods')
const users_db = require('../db/db-users')

router.get('/goodsList', async (req, res) => {
  try {
    let page = parseInt(req.query.page, 10)
    let limit = parseInt(req.query.pageSize)
    let skip = (page - 1) * limit
    let order = parseInt(req.query.sort) > 0 ? 'salePrice DESC' : 'salePrice ASC'
    let params = {
      order,
      limit,
      skip
    }
    if (Boolean(parseInt(req.query.$lte, 10))) {
      params.where = {
        salePrice: {
          between: [parseInt(req.query.$gte, 10), parseInt(req.query.$lte, 10)]
        }
      }
    }
    let goodsList = await goods_db.getAllList(params)
    res.json({
      status: '0',
      msg: '',
      result: {
        count: goodsList.length,
        list: goodsList
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
      const productId = req.body.productId
      const userDoc = await users_db.queryUserById(req.cookies.userId)
      if (!userDoc.id) {
        return res.json({
          status: '1',
          msg: '查询用户信息失败'
        })
      }
      let [productDoc] = await goods_db.queryProductById({"where":{productId}})
      if (!productDoc) {
        return res.json({
          status: '1',
          msg: '查询商品信息失败'
        })
      }
      let cartListItem =  userDoc.cartList.find(item => item.productId === productId)
      if (cartListItem) {
        cartListItem.productNum++
      } else {
        productDoc.productNum = 1
        productDoc.checked = 1
        userDoc.cartList.push(productDoc)
      }
      await users_db.addUserInfo(userDoc.id, userDoc)
      res.json({
        status: '0',
        msg: '加入购物车成功',
        result: userDoc
      })
    } catch (err) {
      res.json({
        status: '1',
        msg: err.message
      })
    }
  })

module.exports = router
