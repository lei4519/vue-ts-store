var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var history = require('connect-history-api-fallback');

var usersRouter = require('./routes/users');
var goodsRouter = require('./routes/goods');

var app = express();

app.use(history());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// // login verify handle
// app.use((req, res, next) => {
//   const originalUrl = req.originalUrl
//   if (originalUrl === '/users/login' || originalUrl === '/users/logout' || originalUrl.includes('/goods/goodsList')) {
//     return next()
//   }
//   if (!req.cookies.userId) {
//     return res.json({
//       status: '10001',
//       msg: '当前用户未登录',
//       result: ''
//     })
//   }
//   next()
// })
// login verify handle
app.use(express.static(path.join(__dirname, 'public')));
app.use('/users', usersRouter);
app.use('/goods', goodsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
