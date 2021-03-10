const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/images'))
    },
    filename: (req, file, cb) => {
        const extension = file.mimetype.split("/").pop()
        const filename = file.fieldname
        cb(null, filename+'-'+new Date().toISOString().replace(/[\/\\:]/g, "_") +'.'+extension)
    }
})

const fileFilter = (req, file, cb) => {
    // Allowed Extensions
    const fileTypes = /jpeg|jpg|png|gif/

    // Check Extension
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase())

    // Check Mime
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