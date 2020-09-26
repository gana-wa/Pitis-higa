const transactionRouter = require('express').Router();
const transactionController = require('../controllers/transaction');

transactionRouter.post("/transfer", transactionController.transaction);
transactionRouter.post("/topup", transactionController.topUp);

module.exports = transactionRouter;