const userRouter = require('express').Router();
const userController = require('../controllers/user');

userRouter.patch("/edit/:id", userController.editUser);

module.exports = userRouter;