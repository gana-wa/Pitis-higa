const authModel = require('../models/auth');
const formRespone = require('../helpers/form/formRespone');

const authController = {
   register: (req, res) => {
      authModel
         .registerUser(req.body)
         .then((data) => {
            formRespone.success(res, data);
         })
         .catch((err) => {
            formRespone.error(res, err);
         })
   },
   login: (req, res) => {
      authModel
         .loginUser(req.body)
         .then((data) => {
            formRespone.success(res, data);
         })
         .catch((err) => {
            formRespone.error(res, err);
         })
   }
};

module.exports = authController;