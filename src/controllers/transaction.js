const formRespone = require('../helpers/form/formRespone');
const transactionModel = require('../models/transaction');
const express = require("express");
const http = require("http").createServer(express());
const io = require("socket.io")(http);

const transactionController = {
   transaction: (req, res) => {
      transactionModel
         .transaction(req.body)
         .then((data) => {
            const { sender_name, receiver_id, amount, category } = data;
            const title = `${category} Success`;
            const message = `Hi, ${sender_name} transfer ${amount.toLocaleString('id-ID')} to you!`;
            io.to(receiver_id).emit("transaction", { title, message });
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
            const { receiver_id, amount, category } = data;
            const title = `${category} Success`;
            const message = `Yeay, you got ${amount.toLocaleString('id-ID')} from top-up!`;
            try {
               io.to(receiver_id).emit("transaction", { title, message });
            } catch (err) {
               console.log(err);
            }
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