const {User} = require('../model')
const {createToken} = require('../utils/jwt')

// 用户注册
exports.register = async (req, res) => {
    console.log(req.body)
    const userModel = new User(req.body)
    const result = await userModel.save()
    const handleData = result.toJSON()
    delete handleData.password
    res.json(handleData)
}
// 用户登录
exports.login = async (req, res) => {
    console.log(req.body)
    const user = await User.findOne(req.body)
    if (!user) {
        return res.status(200).json({
            code: '0',
            msg: '用户名或者密码不正确！',
            data: null
        })
    }
    const result = user.toJSON()
    result.token = await createToken(result)
    res.status(200).json(result)
}
// 列表页
exports.list = async (req, res) => {
    res.json(req.userInfo)
}
// 修改用户
exports.update = async (req, res) => {
    // res.send(req.userInfo._id)
    const updateData = await User.findByIdAndUpdate(req.userInfo._id, req.body, {new: true})
    res.json(updateData)
}