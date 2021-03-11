const jwt = require('jsonwebtoken')
module.exports = (req, res, next) => {
    const token = req.headers['authorization']
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err){
            res.status(401).json({error: err.message, message: 'Problem with token', status: false})
        }else{
            req.decoded = {
                id: decoded.id,
                name: decoded.name,
                email: decoded.email
            }
            next()
        }
    })
}