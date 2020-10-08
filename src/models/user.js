const db = require('../config/dbConfig');

const userModel = {
   updateUser: (id, body) => {
      return new Promise((resolve, reject) => {
         const queryCheckPhone = `SELECT phone from tb_user_detail WHERE tb_user_detail.phone = '${body.phone}'`
         db.query(queryCheckPhone, body.phone, (err, dataPhone) => {
            if (err) {
               reject(err);
            }
            if (dataPhone.length) {
               reject({ msg: 'This phone number is already registered..!' });
            } else {
               const queryUpdate = `UPDATE tb_user_detail SET ? WHERE tb_user_detail.user_id ='${id}'`;
               db.query(queryUpdate, body, (err, data) => {
                  if (!err) {
                     resolve(data);
                  } else {
                     reject(err);
                  }
               });
            }
         });
      });
   },
   // select all user except current user
   selectAllUser: (id) => {
      return new Promise((resolve, reject) => {
         const querySelect = `SELECT * FROM tb_user_detail WHERE user_id <> '${id}' AND phone IS NOT NULL`;
         db.query(querySelect, (err, data) => {
            if (!err) {
               resolve(data);
            } else {
               reject(err);
            }
         });
      });
   },
   searchUser: (query) => {
      return new Promise((resolve, reject) => {
         const querySelect = `SELECT * FROM tb_user_detail WHERE first_name LIKE '%${query.first_name}%' AND user_id <> '${query.user_id}' AND phone IS NOT NULL`;
         db.query(querySelect, (err, data) => {
            if (!err) {
               resolve(data);
            } else {
               reject(err);
            }
         });
      });
   },
   fetchBalance: (id) => {
      return new Promise((resolve, reject) => {
         const querySelect = `SELECT balance FROM tb_balance WHERE user_id = '${id}'`;
         db.query(querySelect, (err, data) => {
            if (!err) {
               resolve(data);
            } else {
               reject(err);
            }
         });
      });
   },
};

module.exports = userModel;