const express = require('express')
const router = express.Router()
const User = require('../models/users')
const users_db = require('../db/db-users')

router.post('/login', async (req, res) => {
  try {
    const params = {
      userName: req.body.userName,
      userPwd: req.body.userPwd
    }
    const [user] = await users_db.validateUser({"where": params})
    res.cookie('userId', user.id, {
      path: '/',
      maxAge: 1000 * 60 * 60
    })
    res.cookie('userName', user.userName, {
      path: '/',
      maxAge: 1000 * 60 * 60
    })
    if (user.id) {
      res.json({
        status: '0',
        msg: '',
        userName: user.userName
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
  .get('/checkLogin', (req, res) => {
    if (req.cookies.userId) {
      res.json({
        status: '0',
        msg: '',
        result: {
          userName: req.cookies.userName || ''
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
        const {cartList} = await users_db.queryUserById(req.cookies.userId)
        res.json({
          status: '0',
          msg: '',
          result: cartList
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
      const id = req.cookies.userId
      await users_db.delCartInfo(id, productId)
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
      const user = await users_db.queryUserById(userId)
      const product = user.cartList.find(item => item.productId === productId)
      product.productNum = req.body.productNum
      product.checked = req.body.checked
      await users_db.addUserInfo(user.id, user)
      res.json({
        status: '0',
        msg: '',
        result: user
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
      const user = await users_db.queryUserById(userId)
      user.cartList.forEach(item => item.checked = checked)
      await users_db.addUserInfo(user.id, user)
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
        const userId = req.cookies.userId
        const {addressList} = await users_db.queryUserById(userId)
        res.json({
          status: '0',
          msg: '',
          result: addressList
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
        const userId = req.cookies.userId
        const user = await users_db.queryUserById(userId)
        user.addressList.push(req.body.addressInfo)
        await users_db.addUserInfo(user.id, user)
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
        const userId = req.cookies.userId
        const user = await users_db.queryUserById(userId)

        const addressId = req.body.addressId

        let defaultIndex = 0
        user.addressList.forEach((item, i) => {
          item.isDefault = (item.addressId === addressId)
          if (item.addressId === addressId) {
            defaultIndex = i
          }
        })
        user.addressList.unshift(user.addressList.splice(defaultIndex, 1)[0])
        await users_db.addUserInfo(user.id, user)
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
        const userId = req.cookies.userId
        const user = await users_db.queryUserById(userId)
        
        const addressId = req.body.addressId
        
        const delAddressIndex = user.addressList.findIndex(item => item.addressId === addressId)
        user.addressList.splice(delAddressIndex, 1)

        await users_db.addUserInfo(user.id, user)
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
        const userId = req.cookies.userId
        const user = await users_db.queryUserById(userId)

        const checkedCartList = user.cartList.filter(item => item.checked === 1)
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
  .get('/orderList', async (req, res) => {
    try {
      if (req.cookies.userId) {
        const userId = req.cookies.userId
        const {orderList} = await users_db.queryUserById(userId)

        res.json({
          status: '0',
          msg: '',
          result: orderList
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
  .post('/orderSuccess', async (req, res) => {
    try {
      if (req.cookies.userId) {
        const userId = req.cookies.userId
        const user = await users_db.queryUserById(userId)
        user.cartList.forEach((item, i, arr) => {
          if (item.checked) {
            arr.splice(i, 1)
          }
        })
        await users_db.addUserInfo(user.id, user)
        res.json({
          status: '0',
          msg: '',
          result: user
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
