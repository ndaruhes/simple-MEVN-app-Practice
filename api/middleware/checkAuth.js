const jwt = require('jsonwebtoken')
// require('dotenv').config()
module.exports = (req, res, next) => {
    const token = req.headers['authorization']
    // if(token){
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if(err){
                res.status(401).json({error: err.message, message: 'Problem with token', status: false})
            }else{
                req.decoded = decoded
                next()
            }

            // if(decoded.exp <= Date.now()/1000){
            //     return res.status(401).json({
            //         date: Date.now()/100,
            //         exp: decoded.exp,
            //         message: 'Token was expired',
            //         status: false
            //     })
            // }
        })
    // }else{
    //     res.status(403).json({
    //         message: 'Token Not Available',
    //         status: false
    //     })
    // }
}