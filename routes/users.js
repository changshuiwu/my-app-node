const express = require('express');
const { validationResult} = require('express-validator')
const router = express.Router();
const userController = require('../controller/userController')
const userValidator = require('../middleware/validator/userValidator')
const {verifyToken} = require('../utils/jwt')
const multer = require('multer')
const upload = multer({dest: 'public/images'})


// console.log(userValidator.register)

router.post('/register', userValidator.register,userController.register)
      .post('/login',userValidator.login, userController.login)
      .get('/list', verifyToken, userController.list)
      .put('/', verifyToken, userValidator.update,userController.update)
      .post('/uploadImg', verifyToken, upload.single('avatar'),userController.uploadImg)

module.exports = router;
