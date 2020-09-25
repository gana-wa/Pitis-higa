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
                     const queryString = 'INSERT INTO tb_user SET ?;INSERT INTO tb_user_detail SET user_id=LAST_INSERT_ID();INSERT INTO tb_balance SET user_id=LAST_INSERT_ID()';
                     db.query(queryString, newBody, (err, data) => {
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
                           const id = data.insertId;
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
         const queryString = 'SELECT * FROM tb_user WHERE email=?';
         db.query(queryString, body.email, (err, data) => {
            if (err) {
               reject(err);
            }
            if (data.length) {
               bcrypt.compare(body.password, data[0].password, (err, result) => {
                  if (result) {
                     const { email } = body;
                     const { id, username } = data[0];
                     const payload = {
                        email,
                        username,
                     };
                     const token = jwt.sign(
                        payload,
                        process.env.SECRET_KEY,
                        // { expiresIn: "6h" },
                     );
                     const msg = 'Login successfull';
                     resolve({ msg, email, username, token, id });
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
};

module.exports = authModel;