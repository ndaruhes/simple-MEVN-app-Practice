const {Blog, User} = require('../models')
const validatorMessage = require('../config/validatorMessage')
const fs = require('fs')
const path = require('path')
const sharp = require('sharp')
const Validator = require('fastest-validator')

module.exports = {
    index: async (req, res) => {
        try{
            blogs = await Blog.findAll({
                include: {
                    model: User,
                    as: 'user'
                }
            })
            if(blogs.length > 0){
                res.json({
                    blogs: blogs.map(blog => {
                        return {
                            id: blog.id,
                            title: blog.title,
                            content: blog.content,
                            cover: blog.cover,
                            slug: blog.slug,
                            user: {
                                id: blog.user.id,
                                name: blog.user.name,
                                email: blog.user.email,
                            }
                        }
                    }),
                    request: {
                        method: req.method,
                        url: process.env.BASE_URL + '/blogs'
                    },
                    status: true
                })
            }else{
                res.json({
                    message: 'Blog kosong',
                    request: {
                        method: req.method,
                        url: process.env.BASE_URL + '/blogs'
                    },
                    status: true
                })
            }
        }catch(err){
            res.status(500).json({
                error: err.message,
                status: false
            })
        }
    },
    show: async (req, res) => {
        try{
            let blog = await Blog.findOne({
                where: {slug: req.params.slug},
                include: {
                    model: User,
                    as: 'user'
                }
            })
            if(blog != null){
                res.json({
                    blog: {
                        id: blog.id,
                        title: blog.title,
                        content: blog.content,
                        cover: blog.cover,
                        slug: blog.slug,
                        createdAt: blog.createdAt,
                        user_id: blog.user.id,
                        user_name: blog.user.name,
                        user_email: blog.user.email,
                    },
                    request: {
                        method: req.method,
                        url: process.env.BASE_URL + '/blogs/' + req.params.slug
                    },
                    status: true
                })
            }else{
                res.status(404).json({message: 'Cannot find blog', status: false})
            }
        }catch(err){
            res.status(500).json({
                error: err.message,
                message: 'gk tau',
                status: false
            })
        }
    },
    store: async (req, res) => {
        let blogRequest
        if(!req.file){
            blogRequest = {
                title: req.body.title,
                content: req.body.content,
                slug: createSlug(req.body.title),
                user_id: req.decoded.id
            }
        }else{
            blogRequest = {
                title: req.body.title,
                content: req.body.content,
                cover: req.file.filename,
                slug: createSlug(req.body.title),
                user_id: req.decoded.id
            } 
        }

        if(blogErrors(blogRequest, req.method) == null){
            try{
                let blog =  await Blog.create(blogRequest)
                res.json({
                    data: {
                        id: blog.id,
                        title: blog.title,
                        slug: blog.slug,
                    },
                    message: 'Blog berhasil ditambah',
                    request: {
                        method: req.method,
                        url: process.env.BASE_URL + '/blogs'
                    },
                    status: true
                })
            }catch(err){
                res.status(400).json({
                    error: err.message,
                    message: 'Blog gagal ditambah',
                    status: false
                })
            }
        }else{
            res.send(blogErrors(blogRequest))
        }
    },
    update: async (req, res) => {
        const blog = await Blog.findOne({where: {slug: req.params.slug}})
        const filePath = path.join(__dirname, '../public/images/'+blog.cover)
        let blogRequest

        if(req.file){
            if(fs.existsSync(filePath)){
                fs.unlinkSync(filePath)
            }
            blogRequest = {
                title: req.body.title,
                content: req.body.content,
                cover: req.file.filename
            }
        }else{
            blogRequest = {
                title: req.body.title,
                content: req.body.content
            }
        }

        if(blogErrors(blogRequest, req.method) == null){
            if(blog != null){
                try{
                    blog.update(blogRequest)
                    res.json({
                        data: {
                            id: blog.id,
                            title: blog.title,
                            content: blog.content,
                        },
                        message: 'Blog berhasil diubah',
                        request: {
                            method: req.method,
                            url: process.env.BASE_URL + '/blogs/' + req.params.slug
                        },
                        status: true
                    })
                }catch(err){
                    res.status(400).json({
                        error: err.message,
                        message: 'Blog gagal diubah',
                        status: false
                    })
                }
            }else{
                res.status(404).json({message: 'Cannot find blog', status: false})
            }
        }else{
            res.send(blogErrors(blogRequest))
        }
    },
    delete: async (req, res) => {
        const blog = await Blog.findOne({where: {slug: req.params.slug}})
        const filePath = path.join(__dirname, '../public/images/'+blog.cover)
        if(blog != null){
            try{
                if(fs.existsSync(filePath)){
                    fs.unlinkSync(filePath)
                }
                blog.destroy()
                res.json({
                    data: {
                        title: blog.title,
                    },
                    message: 'Blog berhasil dihapus',
                    request: {
                        method: req.method,
                        url: process.env.BASE_URL + '/blogs/' + req.params.slug
                    },
                    status: true
                })
            }catch(err){
                res.status(400).json({
                    error: err.message,
                    message: 'Blog gagal dihapus',
                    status: false
                })
            }
        }else{
            res.status(404).json({message: 'Cannot find blog', status: false})
        }
    }
}

function blogErrors(dataRequest, method){
    let schema
    if(method === 'PUT'){
        schema = {
            title: 'string|empty:false|min:3',
            content: 'string|empty:false|min:10'
        }
    }else{
        schema = {
            title: 'string|empty:false|min:3',
            content: 'string|empty:false|min:10',
            cover: 'string|empty:false'
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

function createSlug (string){
    const dateFormat = new Date().getTime()
    return string
            .toString()
            .trim()
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^\w\-]+/g, "")
            .replace(/\-\-+/g, "-")
            .replace(/^-+/, "")
            .replace(/-+$/, "")+'-'+dateFormat
}