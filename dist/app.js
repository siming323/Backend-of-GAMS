"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const accessory_1 = __importDefault(require("./routes/accessory"));
const category_1 = __importDefault(require("./routes/category"));
const users_1 = __importDefault(require("./routes/users"));
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('./model/index');
var MongoClient = require('mongodb').MongoClient;
var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use('/', indexRouter);
//app.use('/users', usersRouter);
app.use('/api/accessories', accessory_1.default);
app.use('/api/categories', category_1.default);
//app.use('/api/borrows', BorrowRouter)
app.use('/api/users', users_1.default);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});
app.listen('3005', () => {
    console.log('server start at 3005');
});
module.exports = app;
