const multer = require('multer')
const sharp = require('sharp')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/images'))
    },
    filename: (req, file, cb) => {
        const extension = file.mimetype.split("/").pop()
        const filename = file.fieldname
        // let compressedImagePath = path.join(__dirname, '../public/compressed/', new Date().getTime() + ".jpg")
        // sharp(req.file.path).resize(640,480).jpeg({
        //     quality: 80,
        //     chromeSubsampling: '4:4:4'
        // }).toFile(compressedImagePath, (err, info) => {
        //     if(err) res.send({error: err.message, message: 'gagal compress'})
        //     res.send(info)
        // })
        cb(null, filename+'-'+new Date().toISOString().replace(/[\/\\:]/g, "_") +'.'+extension)
    },
})

const fileFilter = (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase())
    const mimeType = fileTypes.test(file.mimetype)

    if(mimeType && extName){
        return cb(null, true)
    }else{
        cb("Error, Images Only!")
    }
}

const uploadSingle = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
})

module.exports = uploadSingle