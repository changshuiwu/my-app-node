
const {validationResult} = require('express-validator')

module.exports = validate => {
    return async (req, res, next) => {
        await Promise.all(validate.map(v => v.run(req)))
        const errors = validationResult(req)
        if (!errors.isEmpty()){
            return res.status(400).json({error: errors.array()})
        }
        next()
    }
}