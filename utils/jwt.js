const jwt = require('jsonwebtoken')
const {promisify} = require('util')

const toToken = promisify(jwt.sign)
const verify = promisify(jwt.verify)

const PRIVATE_KEY = '480e2c68a7be2280c6275777b4b22ab1'

module.exports.verifyToken = async (req, res, next) => {
    const {jwt} = req.headers
    if (!jwt) {
        res.status(401).json({error: 'jwt不能为空！'})
    }
    try {
        const userInfo = await verify(jwt,PRIVATE_KEY)
        req.userInfo = userInfo
        next()
    } catch (error) {
        res.status(402).json({error: 'jwt失效'})
    }
    // next()
}

module.exports.createToken = async (userInfo) => {
    return await toToken(
        userInfo,
        PRIVATE_KEY,
        {
            expiresIn: 60 * 60
        }
    )
}
