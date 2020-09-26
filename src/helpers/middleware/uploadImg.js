const e = require('express');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, './public/images');
   },
   filename: (req, file, cb) => {
      const nameFormat = `${Date.now()}-${req.body.first_name.replace(/ /g, "_")}_${req.body.last_name.replace(/ /g, "_")}${path.extname(file.originalname)}`;
      cb(null, nameFormat);
   },
});

const limits = {
   fileSize: 2 * 1000 * 1000 //MB
};

const fileFilter = (req, file, cb) => {
   const fileTypes = /jpg|jpeg|png|gif/;
   const extname = fileTypes.test(path.extname(file.originalname).toLocaleLowerCase());
   if (extname) {
      cb(null, true);
   } else {
      cb("Error: Image only..!");
   }
};

const upload = multer({
   storage,
   limits,
   fileFilter,
});

const uploadImg = {
   singleUpload: (req, res, next) => {
      const singleUpload = upload.single("photo");
      singleUpload(req, res, (err) => {
         if (err) {
            res.json({ msg: err });
         } else {
            try {
               req.body.photo = `/images/${req.file.filename}`;
            }
            catch {
               console.log(err);
            }
            finally {
               next();
            }
         }
      });
   },
};

module.exports = uploadImg;