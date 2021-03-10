const {Blog} = require('../models')
module.exports = {
    index: async (req, res) => {
        try{
            blogs = await Blog.findAll({})
            if(blogs.length > 0){
                res.json({
                    blogs: blogs.map(blog => {
                        return {
                            id: blog.id,
                            title: blog.title,
                            content: blog.content,
                            cover: blog.cover,
                            slug: blog.slug
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
            let blog = await Blog.findOne({where: {id: id}})
            if(blog != null){
                res.json({
                    blog: blog,
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
        const blog = new Blog({
            title: req.body.title,
            content: req.body.content,
            cover: req.file.filename,
            slug: createSlug(req.body.title)
        })

        try{
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