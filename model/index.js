const mongoose = require('mongoose')


async  function main () {
    await mongoose.connect('mongodb://localhost:27017/express-video')
}

main().then(res => {
    console.log('数据库连接成功！')
})

module.exports = {
    User: mongoose.model('User', require('./userModel.js'))
}