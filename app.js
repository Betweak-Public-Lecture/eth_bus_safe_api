var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

const apiRouter = require('./routes/api');

var app = express();

// view engine setup
// view engine 사용 X
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// MiddleWare

// Memory 기반 세션
// app.use(
//   session({
//     secret: "ether",
//     resave: false,
//     saveUninitialized: true,
//   })
// );

// Database 기반 세션 (Persistent Session)
const MySQLStore = require('express-mysql-session')(session);
const mySqlOptions = {
  host: "localhost", // db가 위차한 host(ip 주소)
  port: "3306", // db에 접근할 수 있는 port
  user: 'root', // database user
  password: 'admin1234', // user pwd 
  database: 'bus_safe' // db이름
}
const sessionStore = new MySQLStore(mySqlOptions);

app.use(
  session({
    secret: "ether",
    resave: true,
    saveUninitialized: true,
    store: sessionStore
  })
);

app.use('/api', apiRouter);



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
