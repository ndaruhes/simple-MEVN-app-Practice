const {User} = require('../models')
const { JWT_SECRET, JWT_SECRET_EXPIRES } = process.env;
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Validator = require('fastest-validator')
const validatorMessage = require('../config/validatorMessage')

module.exports = {
    login: async (req, res) => {
        const userRequest = {
            email: req.body.email,
            password: req.body.password
        }
        if(userValidation(userRequest, req.url) == null){
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
        }else{
            res.send(userValidation(userRequest, req.url))
        }
    },
    register: async (req, res) => {
        let user = await User.findOne({where: {email: req.body.email}})
        const userRequest = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword
        }

        if(userValidation(userRequest, req.url) == null){
            if(user){
                res.json({email: req.body.email, message: 'Alamat email sudah digunakan', status: false})
            }else{
                try{
                    const newUser = await User.create({
                        name: userRequest.name,
                        email: userRequest.email,
                        password: hashPassword(userRequest.password)
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
        }else{
            res.send(userValidation(userRequest, req.url))
        }
    },
}

function userValidation(dataRequest, url){
    let schema
    if(url == '/register'){
        schema = {
            name: 'string|empty:false|required',
            email: 'email|empty:false',
            password: 'string|empty:false|min:5',
            confirmPassword: { type: "equal", field: "password" }
        }
    }else{
        schema = {
            email: 'email|empty:false',
            password: 'string|empty:false|min:5'
        }
    }

    const v = new Validator(validatorMessage)
    const validationResponse = v.validate(dataRequest, schema)
    if(validationResponse.length > 0){
        return {
            message: "Harap isi form dengan benar",
            errors: validationResponse
        }
    }
}

function hashPassword(password){
    return bcrypt.hashSync(password, 10, null)
}

function verifyPassword(password, hashPassword){
    return bcrypt.compareSync(password, hashPassword)
}