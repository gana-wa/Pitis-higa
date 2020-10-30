const authModel = require('../models/auth');
const formRespone = require('../helpers/form/formRespone');
const nodemailer = require('nodemailer');

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
   },
   updatePin: (req, res) => {
      authModel
         .updatePin(req.params.id, req.body)
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
   changePassword: (req, res) => {
      authModel
         .changePassword(req.params.id, req.body)
         .then((data) => {
            const responeObj = {
               msg: 'Successfully updated',
               // ...req.body,
            }
            formRespone.success(res, responeObj);
         })
         .catch((err) => {
            formRespone.error(res, err);
         })
   },
   selectEmail: (req, res) => {
      authModel
         .selectEmail(req.body)
         .then((data) => {
            formRespone.success(res, data);
         })
         .catch((err) => {
            formRespone.error(res, err);
         })
   },
   sendOtpEmail: (req, res) => {
      authModel
         .sendOtpEmail(req.body)
         .then((data) => {
            const transporter = nodemailer.createTransport({
               service: "gmail",
               auth: {
                  user: process.env.EMAIL,
                  pass: process.env.EMAIL_PASS,
               },
            })

            console.log(`email: ${data.email}, otp: ${data.otp}`);
            const mailOptions = {
               from: process.env.EMAIL,
               to: data.email,
               subject: "Reset Password",
               text: `Please do not tell your otp to everyone, your otp is ${data.otp}`,
            };

            transporter.sendMail(mailOptions, (err, info) => {
               if (err) {
                  console.log(err);
               } else {
                  console.log(`Email sent: ${info.response}`);
               }
            });
            formRespone.success(res, data);
         })
         .catch((err) => {
            formRespone.error(res, err);
         })
   },
};

module.exports = authController;