const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const rateLimit = require('express-rate-limit');
const xss = require('x-xss-protection');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const hpp = require('hpp');
const compression = require('compression');
const favicon = require('serve-favicon');

const AppError = require('./utils/appError');
const viewsRouter = require('./routes/views-routes');
const candidateRouter = require('./routes/candidate-routes');

const app = express();
app.use(favicon(path.join(__dirname, 'public', 'img', 'favicon.png')));

// view engine setup
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(compression());
app.use(helmet());

const limiter = rateLimit({
  max: 100, //max number of requests
  windowMs: 60 * 60 * 1000, //window period for requests
  message: 'Too many requests from this IP, please try again in an hour',
});

app.use('/api', limiter);

app.use(logger('dev'));

app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(
  express.json({
    limit: '10kb',
  })
);
app.use(cookieParser());

app.use(mongoSanitize());

app.use(xss());

app.use(hpp());

app.use('/', viewsRouter);
app.use('/api/v1/candidates', candidateRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

module.exports = app;
