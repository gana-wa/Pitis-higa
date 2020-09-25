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
};

module.exports = userController;