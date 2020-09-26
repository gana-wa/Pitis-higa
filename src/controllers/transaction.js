const formRespone = require('../helpers/form/formRespone');
const transactionModel = require('../models/transaction');

const transactionController = {
   transaction: (req, res) => {
      transactionModel
         .transaction(req.body)
         .then((data) => {
            formRespone.success(res, data);
         })
         .catch((err) => {
            formRespone.error(res, err);
         })
   },
   topUp: (req, res) => {
      transactionModel
         .topUp(req.body)
         .then((data) => {
            formRespone.success(res, data);
         })
         .catch((err) => {
            formRespone.error(res, err);
         })
   },
   history: (req, res) => {
      transactionModel
         .history(req.params.id)
         .then((data) => {
            formRespone.success(res, data);
         })
         .catch((err) => {
            formRespone.error(res, err);
         })
   },
};

module.exports = transactionController