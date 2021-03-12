const {Blog, User} = require('../models')
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
                // res.json(blogs)
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
        let blog
        let id = req.params.id
        try{
            let blog = await Blog.findOne({
                where: {id: id},
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
                        user_name: blog.user.id,
                        user_email: blog.user.email,
                    },
                    request: {
                        method: req.method,
                        url: process.env.BASE_URL + '/blogs/' + id
                    },
                    status: true
                })
            }else{
                return res.status(404).json({message: 'Cannot find blog', status: false})
            }
        }catch(err){
            return res.status(500).json({
                error: err.message,
                message: 'gk tau',
                status: false
            })
        }
    },
    store: async (req, res) => {
        const blogRequest = {
            title: req.body.title,
            content: req.body.content,
            cover: req.file.filename,
            slug: createSlug(req.body.title),
            user_id: req.decoded.id
        }
        const v = new Validator()
        const schema = {
            title: {type: 'string', optional: false, min: '10'},
            content: {type: 'string', optional: false, min: '20'},
            // title: {type: 'string', optional: false, min: '10'}
        }
        const check = v.validate(blogRequest, schema)
        if(!check){
            res.status(400).json({
                message: "Validation failed bos",
                errors: check
            })
        }
        // console.log("First:", check({ id: 5, title: "Mantap bosque yaaa", content: 'anjay wkwkwkwkw' }));

        try{
            // console.log(req.file);
            // let compressedImagePath = path.join(__dirname, '../public/compressed/', new Date().getTime() + '.jpg')
            // sharp(req.file.path).resize(640,480).jpeg({
            //     quality: 80,
            //     chromeSubsampling: '4:4:4'
            // }).toFile(compressedImagePath, (err, info) => {
            //     if(err) res.send({error: err.message, message: 'gagal compress'})
            //     res.send(info)
            // })

            const blog = new Blog(blogRequest)
            const newBlog = await blog.save()
            res.status(201).json({
                data: {
                    id: newBlog._id,
                    title: newBlog.title,
                    slug: newBlog.slug,
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
    },
    update: async (req, res) => {
        let id = req.params.id
        try{
            const blog = await Blog.findOne({where: {id: id}})
            blog.update({
                title: req.body.title,
                content: req.body.content
            })

            res.json({
                data: {
                    id: blog.id,
                    title: blog.title,
                    content: blog.content,
                },
                message: 'Blog berhasil diubah',
                request: {
                    method: req.method,
                    url: process.env.BASE_URL + '/blogs/' + id
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
    },
    delete: async (req, res) => {
        let id = req.params.id
        try{
            const blog = await Blog.findOne({where: {id: id}})
            blog.destroy()

            res.json({
                data: {
                    title: blog.title,
                },
                message: 'Blog berhasil dihapus',
                request: {
                    method: req.method,
                    url: process.env.BASE_URL + '/blogs/' + id
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
    },
    // getBlog: async (req, res, next) => {
    //     let blog
    //     let id = req.params.id
    //     try{
    //         let blog = await Blog.findOne({where: {id: id}})
    //         if(blog != null){
    //             res.json({
    //                 blog: blog,
    //                 request: {
    //                     method: req.method,
    //                     url: process.env.BASE_URL + '/blogs/' + id
    //                 },
    //                 status: true
    //             })
    //         }else{
    //             return res.status(404).json({message: 'Cannot find blog', status: false})
    //         }
    //     }catch(err){
    //         return res.status(500).json({
    //             error: err.message,
    //             message: 'gk tau',
    //             status: false
    //         })
    //     }
    //     res.blog = blog
    //     next()
    // }
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