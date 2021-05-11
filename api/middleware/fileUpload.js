const fs = require('fs')
const multer = require('multer')
const path = require('path')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let uploadPath = path.join(__dirname, '../public/images/uploads/')

        if(!fs.existsSync(uploadPath)){
            fs.mkdirSync(uploadPath);
        }

        cb(null, uploadPath)
    },
    filename: function (req, file, cb) {
        const getFileName = file.originalname.split('.')[0]
        const unique = new Date().toISOString().replace(/[\/\\:]/g, "_")
        const extension = file.mimetype.split("/").pop()
        const fileName = getFileName + '-' + unique + '.' + extension
        cb(null, fileName)
    }
})

const fileFilter = (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase())
    const mimeType = fileTypes.test(file.mimetype)

    if(mimeType && extName){
        return cb(null, true)
    }else{
        cb("Error, Images Only!" + fileTypes)
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