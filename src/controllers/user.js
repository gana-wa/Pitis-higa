const userModel = require('../models/user');
const formRespone = require('../helpers/form/formRespone');

const userController = {
   editUser: (req, res) => {
      userModel
         .updateUser(req.params.id, req.body)
         .then((data) => {
            const responeObj = {
               msg: 'Successfully updated',
               ...req.body,
            }
            formRespone.success(res, responeObj);
         })
         .catch((err) => {
            formRespone.error(res, err);
         })
   },
   selectAllUser: (req, res) => {
      userModel
         .selectAllUser(req.params.id)
         .then((data) => {
            formRespone.success(res, data);
         })
         .catch((err) => {
            formRespone.error(res, err);
         })
   },
   searchUser: (req, res) => {
      userModel
         .searchUser(req.body)
         .then((data) => {
            formRespone.success(res, data);
         })
         .catch((err) => {
            formRespone.error(res, err);
         })
   },
   fetchBalance: (req, res) => {
      userModel
         .fetchBalance(req.params.id)
         .then((data) => {
            formRespone.success(res, data);
         })
         .catch((err) => {
            formRespone.error(res, err);
         })
   },
};

module.exports = userController;