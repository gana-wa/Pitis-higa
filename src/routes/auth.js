const authRouter = require('express').Router();
const authController = require('../controllers/auth');

authRouter.post('/register', authController.register);
authRouter.post('/login', authController.login);
authRouter.patch('/pin/:id', authController.updatePin);
authRouter.patch('/password/:id', authController.changePassword);
authRouter.post('/email', authController.selectEmail);
authRouter.post('/sendemail', authController.sendEmail);

module.exports = authRouter;