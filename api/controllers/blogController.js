const {Blog, User} = require('../models')
const validatorMessage = require('../config/validatorMessage')
const fs = require('fs')
const path = require('path')
const Validator = require('fastest-validator')
const blogPath = path.join(__dirname, '../public/images/proposal/')
const imagemin = require("imagemin");
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require("imagemin-pngquant");
const imageminGiflossy = require('imagemin-giflossy');
const imageminSvgo = require('imagemin-svgo');
const {extendDefaultPlugins} = require('svgo');
const sharp = require('sharp')

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
                        created_at: dateFormat(blog.createdAt),
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
        if(!req.file){
            res.status(400).json({
                message: 'Harap isi form dengan benar',
                errors: [{message: 'Cover wajib diisi'}]
            })
        }

        let blogRequest = {
            title: req.body.title,
            content: req.body.content,
            cover: req.file.filename,
            slug: createSlug(req.body.title),
            user_id: req.decoded.id
        }

        let checkSlug = await Blog.findOne({where: {slug: blogRequest.slug}})
        if(checkSlug){
            blogRequest.slug = createSlug(req.body.title) + '-'+new Date().getTime()
        }

        if(blogValidation(blogRequest, req.method) == null){
            try{
                let blog =  await Blog.create(blogRequest)
                let uploadPath = path.join(__dirname, '../public/images/uploads/'+req.file.filename)

                if(!fs.existsSync(blogPath)){
                    fs.mkdirSync(blogPath);
                }

                await imagemin(['public/images/uploads/'+req.file.filename], {
                    destination: blogPath,
                    plugins: [
                        imageminMozjpeg({quality: [20]}),
                        imageminPngquant({quality: [0.6, 0.8]}),
                        imageminGiflossy({ lossy: 80 }),
                        imageminSvgo({
                            plugins: extendDefaultPlugins([
                                {name: 'removeViewBox', active: false}
                            ])
                        }),
                    ]
                })
                .then(() => {
                    if(fs.existsSync(uploadPath)){
                        fs.unlinkSync(uploadPath);
                    }
                })

                // await sharp(uploadPath).resize(640,480).toFile(blogPath+req.file.filename).then(() => {
                //     if(fs.existsSync(uploadPath)){
                //         fs.unlinkSync(uploadPath);
                //     }
                // })

                res.json({
                    data: {
                        id: blog.id,
                        title: blog.title,
                        slug: blog.slug,
                    },
                    message: 'Blog berhasil ditambah',
                    request: {
                        method: req.method,
                        url: process.env.BASE_URL + 'blogs'
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
            res.send(blogValidation(blogRequest, req.method))
        }
    },
    update: async (req, res) => {
        const blog = await Blog.findOne({where: {slug: req.params.slug}})
        if(req.file){
            let blogRequest = {
                title: req.body.title,
                content: req.body.content,
                cover: req.file.filename
            }

            if(blogValidation(blogRequest, req.method) == null){
                if(blog != null){
                    try{
                        // Check File Exists
                        const existsBlogPath = blogPath + blog.cover
                        if(fs.existsSync(existsBlogPath)){
                            fs.unlinkSync(existsBlogPath)
                        }

                        blog.update(blogRequest)

                        const uploadPath = 'public/images/uploads/'+req.file.filename
                        await imagemin([uploadPath], {
                            destination: blogPath,
                            plugins: [
                                imageminMozjpeg({quality: [20]}),
                                imageminPngquant({quality: [0.6, 0.8]}),
                                imageminGiflossy({ lossy: 80 }),
                                imageminSvgo({
                                    plugins: extendDefaultPlugins([
                                        {name: 'removeViewBox', active: false}
                                    ])
                                }),
                            ]
                        });

                        if(fs.existsSync(uploadPath)){
                            fs.unlinkSync(uploadPath);
                        }

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
                res.send(blogValidation(blogRequest, req.method))
            }
        }else{
            let blogRequest = {
                title: req.body.title,
                content: req.body.content
            }

            if(blogValidation(blogRequest, req.method) == null){
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
                res.send(blogValidation(blogRequest, req.method))
            }
        }
    },
    delete: async (req, res) => {
        const blog = await Blog.findOne({where: {slug: req.params.slug}})
        const existsBlogPath = blogPath + blog.cover
        if(blog != null){
            try{
                if(fs.existsSync(existsBlogPath)){
                    fs.unlinkSync(existsBlogPath)
                }
                blog.destroy()
                res.json({
                    data: {
                        title: blog.title,
                    },
                    message: 'Blog berhasil dihapus',
                    request: {
                        method: req.method,
                        url: process.env.BASE_URL + 'blogs/' + req.params.slug
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

function blogValidation(dataRequest, method){
    let schema
    if(method == 'PUT'){
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
            .replace(/-+$/, "")
            // +'-'+dateFormat
}

function dateFormat(date) {
    // return date.toGMTString();
    // let format = date.pop();
    // return format; 
    return date.toDateString();
}