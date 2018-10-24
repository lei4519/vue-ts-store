const express = require('express')
const router = express.Router()
const User = require('../models/users')
require('../util/util')

router.post('/login', async (req, res) => {
  try {
    const params = {
      userName: req.body.userName,
      userPwd: req.body.userPwd
    }
    const doc = await User.findOne(params)
    res.cookie('userId', doc.userId, {
      path: '/',
      maxAge: 1000 * 60 * 60
    })
    res.cookie('userName', doc.userName, {
      path: '/',
      maxAge: 1000 * 60 * 60
    })
    if (doc) {
      res.json({
        status: '0',
        msg: '',
				userName: doc.userName,
				cartCount: doc.cartList.length
      })
    } else {
      res.json({
        status: '1',
        msg: '账号密码错误'
      })
    }

  } catch (err) {
    res.json({
      status: '1',
      msg: err.message
    })
  }
})
  .post('/logout', (req, res) => {
    res.cookie('userId', '', {
      path: '/',
      maxAge: -1
    })
    res.cookie('userName', '', {
      path: '/',
      maxAge: -1
    })
    res.json({
      status: '0',
      msg: '',
      result: ''
    })
  })
  .get('/checkLogin', async (req, res) => {
    if (req.cookies.userId) {
			const cartListDoc = await User.findOne({
          userId: req.cookies.userId,
        })
      res.json({
        status: '0',
        msg: '',
        result: {
					userName: req.cookies.userName || '',
					cartCount: cartListDoc.cartList.length
        }
      })
    } else {
      res.json({
        status: '1',
        msg: '未登录',
        result: ''
      })
    }
  })
  .get('/cartList', async (req, res) => {
    try {
      if (req.cookies.userId) {
        const cartListDoc = await User.findOne({
          userId: req.cookies.userId,
        })
        res.json({
          status: '0',
          msg: '',
          result: cartListDoc.cartList
        })
      } else {
        res.json({
          status: '1001',
          msg: '未登录',
          result: ''
        })
      }
    } catch (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    }
  })
  .post('/cartDel', async (req, res) => {
    try {
      const productId = req.body.productId
      const userId = req.cookies.userId
      await User.update({userId}, {$pull: {cartList: {productId}}})
      res.json({
        status: '0',
        msg: '删除成功',
        result: 'suc'
      })
    } catch (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    }
  })
  .post('/cartEdit', async (req, res) => {
    try {
      const userId = req.cookies.userId
      const productId = req.body.productId
      const productNum = req.body.productNum
      const checked = req.body.checked
      await User.update({'userId': userId, 'cartList.productId': productId},
        {'cartList.$.productNum': productNum, 'cartList.$.checked': checked})
      res.json({
        status: '0',
        msg: '',
        result: ''
      })
    } catch (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    }
  })
  .post('/editCheckAll', async (req, res) => {
    try {
      const userId = req.cookies.userId
      const checked = req.body.checked
      const userDoc = await User.findOne({userId})
      userDoc.cartList.forEach(item => item.checked = checked)
      await userDoc.save()
      res.json({
        status: '0',
        msg: '',
        result: ''
      })

    } catch (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    }
  })
  .get('/addressList', async (req, res) => {
    try {
      if (req.cookies.userId) {
        const addressListDoc = await User.findOne({
          userId: req.cookies.userId,
        })
        res.json({
          status: '0',
          msg: '',
          result: addressListDoc.addressList
        })
      } else {
        res.json({
          status: '1001',
          msg: '未登录',
          result: ''
        })
      }
    } catch (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    }
  })
  .post('/addAddress', async (req, res) => {
    try {
      if (req.cookies.userId) {
        const addressListDoc = await User.findOne({
          userId: req.cookies.userId,
        })
        addressListDoc.addressList.push(req.body.addressInfo)
        await addressListDoc.save()
        res.json({
          status: '0',
          msg: '',
          result: '添加成功'
        })
      } else {
        res.json({
          status: '1001',
          msg: '未登录',
          result: ''
        })
      }
    } catch (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    }
  })
  .post('/setDefault', async (req, res) => {
    try {
      if (req.cookies.userId) {
        const addressId = req.body.addressId
        const addressListDoc = await User.findOne({
          userId: req.cookies.userId,
        })
        let defaultIndex = 0
        addressListDoc.addressList.forEach((item, i) => {
          item.isDefault = (item.addressId === addressId)
          if (item.addressId === addressId) {
            defaultIndex = i
          }
        })
        addressListDoc.addressList.unshift(addressListDoc.addressList.splice(defaultIndex, 1)[0])
        await addressListDoc.save()
        res.json({
          status: '0',
          msg: '',
          result: '设置成功'
        })
      } else {
        res.json({
          status: '1001',
          msg: '未登录',
          result: ''
        })
      }
    } catch (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    }
  })
  .post('/delAddress', async (req, res) => {
    try {
      if (req.cookies.userId) {
        const addressId = req.body.addressId
        const addressListDoc = await User.findOne({
          userId: req.cookies.userId,
        })
        const delAddressIndex = addressListDoc.addressList.findIndex(item => item.addressId === addressId)
        addressListDoc.addressList.splice(delAddressIndex, 1)
        await addressListDoc.save()
        res.json({
          status: '0',
          msg: '',
          result: '删除成功'
        })
      } else {
        res.json({
          status: '1001',
          msg: '未登录',
          result: ''
        })
      }
    } catch (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    }
  })
  .get('/checkedCartList', async (req, res) => {
    try {
      if (req.cookies.userId) {
        const cartListDoc = await User.findOne({userId: req.cookies.userId})
        let checkedCartList = cartListDoc.cartList.filter(item => item.checked === 1)
        res.json({
          status: '0',
          msg: '',
          result: checkedCartList
        })
      } else {
        res.json({
          status: '1001',
          msg: '未登录',
          result: ''
        })
      }
    } catch (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    }
  })
  .post('/payMent', async (req, res) => {
    try {
      if (req.cookies.userId) {
				const platfrom = '622'
				const r1 = Math.floor(Math.random() * 10)
				const r2 = Math.floor(Math.random() * 10)
				const sysDate = new Date().Format('yyyyMMddhhmmss')
				const createDate = new Date().Format('yyyy-MM-dd hh:mm:ss')
				const orderId = platfrom + r1 + sysDate + r2
				const orderTotal = req.body.orderTotal
				const addressId = req.body.addressId
				const userDoc = await User.findOne({userId: req.cookies.userId})
				const addressInfo = userDoc.addressList.find(item => item.addressId === addressId)
				if (!addressInfo) {
					res.json({
          status: '1',
          msg: '查询用户配送地址失败',
          result: ''
        })
				}
				const goodsList = userDoc.cartList.filter(item => item.checked === 1)
				if (!goodsList) {
					res.json({
          status: '1',
          msg: '查看用户商品列表失败',
          result: ''
        })
				}
				

				const orderInfo = {
					orderId,
					orderTotal,
					addressInfo,
					goodsList,
					orderStatus: '1',
					createDate
				}
				userDoc.orderList.push(orderInfo)
				await userDoc.save()
        res.json({
          status: '0',
          msg: '',
          result: {
						orderId,
						orderTotal
					}
        })
      } else {
        res.json({
          status: '1001',
          msg: '未登录',
          result: ''
        })
      }
    } catch (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    }
  })
module.exports = router
