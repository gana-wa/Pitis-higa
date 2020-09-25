const express = require('express');

const authRouter = require('./auth');
const userRouter = require('./user');

// Declaration
const indexRouter = express.Router();
// Implementation
indexRouter.use('/auth', authRouter);
indexRouter.use('/user', userRouter);

module.exports = indexRouter;