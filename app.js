const express = require('express');
const path = require('path');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const session = require('express-session');
var multer = require('multer');
fileupload = require("express-fileupload");
const helmet = require('helmet')
const http2 = require('spdy');
const fs = require('fs');
const expressJwt = require('express-jwt')

const app = express();
app.use(bodyParser.json());
app.use(cors());

const urlencodedParser = bodyParser.urlencoded({ extended: false });

const routes = require('./src/routes/routes');

app.use('/', urlencodedParser, routes);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/images', express.static(__dirname + '/Images'));
app.use(express.static(path.resolve(__dirname + '/')));
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
})

app.use(express.static(path.join(__dirname, 'public')));

app.use(cors({
  origin: function (origin, callback) {
    return callback(null, true);
  },
  optionsSuccessStatus: 200,
  credentials: true,
  // disableHostCheck: true,
}));

app.use((req, res, next) => {
  next(createError(404));
});


// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err;
  res.locals.error = req.app.get('env') === 'development'
    ? err
    : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3300, () => console.log('server running at -------------> 3300'));

module.exports = app;
