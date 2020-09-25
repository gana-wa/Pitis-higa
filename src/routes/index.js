const express = require('express');

const authRouter = require('./auth');

// Declaration
const indexRouter = express.Router();
// Implementation
indexRouter.use('/auth', authRouter);

module.exports = indexRouter;