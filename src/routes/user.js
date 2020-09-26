const userRouter = require('express').Router();
const userController = require('../controllers/user');
const uploadImg = require('../helpers/middleware/uploadImg');

userRouter.patch("/edit/:id", uploadImg.singleUpload, userController.editUser);

module.exports = userRouter;