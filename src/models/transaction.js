const db = require('../config/dbConfig');
const { DateTime } = require('luxon');

const transactionModel = {
   transaction: (body) => {
      return new Promise((resolve, reject) => {
         const queryTransaction = 'INSERT INTO tb_transaction SET ?;';
         db.query(queryTransaction, [body, body.sender_id], (err, resultData) => {
            if (err) {
               reject({ msg: `Transaction failed. error: insert trasnsaction(${err})` });
               console.error(err);
            }
            // decrease balance of sender
            const queryBalance = 'SELECT balance from tb_balance WHERE user_id=?;';
            db.query(queryBalance, [body.sender_id], (err, dataSender) => {
               if (err) {
                  reject({ msg: `Transaction failed. error: select balance(${err})` });
                  console.error(err);
               }
               const queryUpdateBalance = 'UPDATE tb_balance SET balance=? WHERE user_id=?;';
               let newBalance = Number(dataSender[0].balance) - Number(body.amount);
               db.query(queryUpdateBalance, [newBalance, body.sender_id], (err, res) => {
                  if (err) {
                     reject({ msg: `Transaction failed. error: update balance(${err})` });
                     console.error(err);
                  }
                  // increase balance of receiver
                  db.query(queryBalance, [body.receiver_id], (err, dataReceiver) => {
                     if (err) {
                        reject({ msg: `Transaction failed. error: select balance(${err})` });
                        console.error(err);
                     }
                     newBalance = Number(dataReceiver[0].balance) + Number(body.amount);
                     db.query(queryUpdateBalance, [newBalance, body.receiver_id], (err, res) => {
                        if (err) {
                           reject({ msg: `Transaction failed. error: update balance(${err})` });
                           console.error(err);
                        }
                        resolve({
                           transaction_id: resultData.insertId,
                           ...body,
                           amount: Number(body.amount),
                           msg: "Transaction Success"
                        });
                     });
                  });
               });
            });
         });
      });
   },
   topUp: (body) => {
      return new Promise((resolve, reject) => {
         const queryTransaction = 'INSERT INTO tb_transaction SET ?;';
         db.query(queryTransaction, body, (err, resData) => {
            if (err) {
               reject({ msg: `Top Up failed. error: insert trasnsaction(${err})` });
               console.error(err);
            }
            const queryBalance = 'SELECT balance from tb_balance WHERE user_id=?;';
            db.query(queryBalance, [body.receiver_id], (err, userData) => {
               if (err) {
                  reject({ msg: `Top Up failed. error: select balance(${err})` });
                  console.error(err);
               }
               const queryUpdateBalance = 'UPDATE tb_balance SET balance=? WHERE user_id=?;';
               let newBalance = Number(userData[0].balance) + Number(body.amount);
               db.query(queryUpdateBalance, [newBalance, body.receiver_id], (err, result) => {
                  if (err) {
                     reject({ msg: `Top Up failed. error: update balance(${err})` });
                     console.error(err);
                  }
                  resolve({
                     transaction_id: resData.insertId,
                     category: body.category,
                     amount: Number(body.amount),
                     msg: 'Top Up Success',
                  })
               });
            });
         });
      });
   },
   history: (id) => {
      return new Promise((resolve, reject) => {
         const startDate = DateTime.local().startOf("week").toISODate();
         const endDate = DateTime.local().startOf("week").plus({ days: 7 }).toISODate();
         // console.log(startDate, endDate);
         const queryHistory = 'SELECT tb_transaction.transaction_id, tb_user_detail.user_id, tb_user_detail.first_name, tb_user_detail.last_name, tb_user_detail.photo, tb_transaction.category, tb_transaction.type, tb_transaction.amount, tb_transaction.date FROM tb_user_detail JOIN tb_transaction ON tb_user_detail.user_id = tb_transaction.receiver_id WHERE tb_transaction.sender_id = ? AND tb_transaction.date BETWEEN ? AND ?;SELECT tb_transaction.transaction_id, tb_user_detail.user_id, tb_user_detail.first_name, tb_user_detail.last_name, tb_user_detail.photo, tb_transaction.category, tb_transaction.type, tb_transaction.amount, tb_transaction.date FROM tb_user_detail RIGHT JOIN tb_transaction ON tb_user_detail.user_id = tb_transaction.sender_id WHERE tb_transaction.receiver_id = ? AND tb_transaction.date BETWEEN ? AND ?;';
         db.query(queryHistory,
            [
               id,
               startDate,
               endDate,
               id,
               startDate,
               endDate
            ], (err, data) => {
               if (err) {
                  reject(err);
                  console.error(err);
               }
               const newHistory = [
                  ...data[0],
                  ...data[1].map((item) => {
                     return { ...item, type: 'in' };
                  }),
               ];
               resolve(newHistory);
            });
      });
   },
};

module.exports = transactionModel;