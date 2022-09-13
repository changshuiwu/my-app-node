var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

// 路由
var router = require('./routes')

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// 日记记录
app.use(logger('dev'));

// content-type的格式
app.use(express.json()); // json
app.use(express.urlencoded({ extended: false })); // x-www-urlencoded

// 跨域请求
app.use(cors())

// cookie设置
app.use(cookieParser());
// 静态资源目录设置
app.use(express.static(path.join(__dirname, 'public')));

// 路由
app.use('/api/v1', router);

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
