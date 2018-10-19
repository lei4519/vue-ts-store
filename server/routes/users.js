const express = require('express')
const router = express.Router()
const User = require('../models/users')

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
        userName: doc.userName
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
        status: '1',
        msg: '未登录',
        result: ''
      })
    }
  })

module.exports = router
