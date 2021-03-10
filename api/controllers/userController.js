const {User} = require('../models')
const { JWT_SECRET, JWT_SECRET_EXPIRES } = process.env;
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
module.exports = {
    login: async (req, res) => {
        let user = await User.findOne({where: {email: req.body.email}})
        if(!user) res.status(404).json({email: req.body.email, message: 'User tidak terdaftar', status: false})
        if(!verifyPassword(req.body.password, user.password)) res.json({message: 'Kombinasi email dan password gk sesuai', status: false})

        const token = jwt.sign(user.toJSON(), JWT_SECRET, {
            expiresIn: JWT_SECRET_EXPIRES
        })

        res.json({
            data: {
                id: user._id,
                name: user.name
            },
            message: 'Berhasil Login',
            request: {
                method: req.method,
                url: process.env.BASE_URL + '/login'
            },
            status: true,
            token: token,
        })
    },
    register: async (req, res) => {
        let user = await User.findOne({where: {email: req.body.email}})
        if(user){
            res.json({email: req.body.email, message: 'Alamat email sudah digunakan', status: false})
        }else{
            try{
                const newUser = await User.create({
                    name: req.body.name,
                    email: req.body.email,
                    password: hashPassword(req.body.password)
                })
                res.status(201).json({
                    data: {
                        id: newUser.id,
                        name: newUser.name,
                        email: newUser.email
                    },
                    message: 'Berhasil Register',
                    request: {
                        method: req.method,
                        url: process.env.BASE_URL + '/register'
                    },
                    status: true
                })
            }catch(err){
                res.status(400).json({
                    error: err.message,
                    message: 'Gagal Register',
                    status: false
                })
            }
        }
    },
}

function hashPassword(password){
    return bcrypt.hashSync(password, 10, null)
}

function verifyPassword(password, hashPassword){
    return bcrypt.compareSync(password, hashPassword)
}