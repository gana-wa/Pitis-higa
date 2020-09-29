const db = require('../config/dbConfig');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authModel = {
   registerUser: (body) => {
      return new Promise((resolve, reject) => {
         const querySelect = 'SELECT email FROM tb_user WHERE email = ?';
         db.query(querySelect, [body.email], (err, data) => {
            if (data.length) {
               reject({
                  msg: "This email is already registered"
               })
            } else {
               const saltRounds = 10
               bcrypt.genSalt(saltRounds, (err, salt) => {
                  if (err) {
                     reject(err);
                  }
                  const { email, username, password, pin } = body;
                  bcrypt.hash(password, salt, (err, hashedPassword) => {
                     if (err) {
                        reject(err);
                     }
                     const newBody = { ...body, password: hashedPassword };
                     const queryString = 'INSERT INTO tb_user SET ?;INSERT INTO tb_user_detail SET user_id=LAST_INSERT_ID(), first_name = ? ;INSERT INTO tb_balance SET user_id=LAST_INSERT_ID()';
                     db.query(queryString, [newBody, body.username], (err, dataInsert) => {
                        if (err) {
                           reject(err);
                        } else {
                           const payload = {
                              username,
                              email,
                           };
                           const token = jwt.sign(
                              payload,
                              process.env.SECRET_KEY,
                              // { expiresIn: "6h" },
                           );
                           const msg = 'Successfully registered';
                           const id = dataInsert[0].insertId;
                           resolve({ msg, username, email, token, id });
                        }
                     });
                  });
               });
            }
         });
      });
   },
   loginUser: (body) => {
      return new Promise((resolve, reject) => {
         const queryString = 'SELECT *, tb_balance.balance, tb_user_detail.first_name, tb_user_detail.last_name, tb_user_detail.phone, tb_user_detail.photo FROM tb_user JOIN tb_balance ON tb_user.user_id = tb_balance.user_id JOIN tb_user_detail ON tb_user.user_id = tb_user_detail.user_id WHERE email=?;';
         db.query(queryString, body.email, (err, data) => {
            if (err) {
               reject(err);
            }
            if (data.length) {
               bcrypt.compare(body.password, data[0].password, (err, result) => {
                  if (result) {
                     const { email } = body;
                     const { user_id, username, balance, first_name, last_name, phone, photo, pin } = data[0];
                     const payload = {
                        email,
                        // username,
                     };
                     const token = jwt.sign(
                        payload,
                        process.env.SECRET_KEY,
                        // { expiresIn: "6h" },
                     );
                     const msg = 'Login successfull';
                     resolve({
                        msg,
                        user_id,
                        // email,
                        username,
                        balance,
                        first_name,
                        last_name,
                        phone,
                        photo,
                        token,
                        pin
                     });
                  }
                  if (!result) {
                     reject({ msg: 'Username or password is wrong!' });
                  }
                  if (err) {
                     reject(err);
                  }
               });
            } else {
               reject({ msg: `This email isn't registered` });
            }
         });
      });
   },
   updatePin: (id, body) => {
      return new Promise((resolve, reject) => {
         const queryUpdate = `UPDATE tb_user SET ? WHERE user_id ='${id}'`;
         db.query(queryUpdate, body, (err, data) => {
            if (!err) {
               resolve(data);
            } else {
               reject(err);
            }
         });
      });
   },
};

module.exports = authModel;