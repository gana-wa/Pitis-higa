const db = require('../config/dbConfig');

const userModel = {
   updateUser: (id, body) => {
      return new Promise((resolve, reject) => {
         const queryUpdate = `UPDATE tb_user_detail SET ? WHERE tb_user_detail.user_id ='${id}'`;
         db.query(queryUpdate, body, (err, data) => {
            if (!err) {
               resolve(data);
            } else {
               reject(err);
            }
         });
      });
   },
   // select all user except current user
   selectAllUser: (id) => {
      return new Promise((resolve, reject) => {
         const querySelect = `SELECT * FROM tb_user_detail WHERE user_id <> '${id}'`;
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