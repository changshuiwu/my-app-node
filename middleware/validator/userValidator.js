
const {body} = require('express-validator')
const validate = require('./errorBack')
const {User} = require('../../model')

module.exports.register = validate([
    body('username').notEmpty().withMessage('用户名不能为空！').bail().isLength({min: 3}).withMessage('用户名长度不能小于3').bail(),
    body('email').notEmpty().withMessage('邮箱不能为空!').bail().isEmail().withMessage('邮箱格式不正确！').bail()
        .custom(async val => {
            const user = await User.findOne({email: val})
            if (user) {
                return Promise.reject('邮箱已经被注册')
            }
        })
])

module.exports.login = validate([
    body('email').notEmpty().withMessage('邮箱不能为空!').bail().isEmail().withMessage('邮箱格式不正确！').bail(),
    body('password').notEmpty().withMessage('密码不能为空!').bail()     
])
module.exports.update = validate([
    body('email').isEmail().withMessage('邮箱格式不正确！').bail()
        .custom(async val => {
            const user = await User.findOne({email: val})
            if (user) {
                return Promise.reject('邮箱已经被注册')
            }
        })  
        .bail(),
    body('username')
    .custom(async val => {
        const user = await User.findOne({username: val})
        if (user) {
            return Promise.reject('用户名已经被注册')
        }
    })  
    .bail(),
    body('phone')
    .custom(async val => {
        const user = await User.findOne({phone: val})
        if (user) {
            return Promise.reject('手机号已经被注册')
        }
    })  
    .bail(),
])