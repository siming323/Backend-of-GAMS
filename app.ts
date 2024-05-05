import { Request, Response, NextFunction } from "express";
import { User } from "./model";
import AccessoryRouter from "./routes/accessory"
import CategoryRouter from "./routes/category"
import userSchema from "./model/userModel";
import UserRouter from "./routes/users"

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('./model/index')

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
app.use('/api/accessories', AccessoryRouter);
app.use('/api/categories', CategoryRouter);
//app.use('/api/borrows', BorrowRouter)
app.use('/api/users', UserRouter);

// catch 404 and forward to error handler
app.use(function(req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

app.listen('3005', ()=> {
  console.log('server start at 3005');
})

module.exports = app;
