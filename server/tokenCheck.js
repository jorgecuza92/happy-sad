const jwt = require('jsonwebtoken')
const models = require('./models')


function tokenCheck(req, res, next) {
    let headers = req.headers['authorization']
    if (headers) {
        const token = headers.split(' ')[1]
        console.log(token)
        const decoded = jwt.verify(token, "KRABBYPATTYFORMULA")
        if (decoded) {
            const username = decoded.username
            models.User.findOne({
                where: {
                    username: username
                }
            }) .then((user) => {
                if (user) {
                    next()
                }
                else {
                    res.json({message: 'Pizza is AWESOME, your token is not....'})
                }
            })
        } else {
            res.json({message: 'Token Broken'})
        }
    } else {
        res.json({message: 'You Sending the Token?'})
    }
}

module.exports = tokenCheck