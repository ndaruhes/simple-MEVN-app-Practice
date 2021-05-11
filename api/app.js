// const express = require('express');
// const path = require('path');
// const cookieParser = require('cookie-parser');
// const logger = require('morgan');

// const router = require('./routes/index');

// const app = express();

// // app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*')
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
//     next()
// })
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use(router);

// module.exports = app;









const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const router = require('./routes/index');
const app = express();

const multer = require("multer");
const path = require("path");
const imagemin = require("imagemin");
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require("imagemin-pngquant");
const imageminGiflossy = require('imagemin-giflossy');
const imageminSvgo = require('imagemin-svgo');
const {extendDefaultPlugins} = require('svgo');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "uploads");
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(router);

app.post("/", upload.single("image"), (req, res, next) => {
    const file = req.file;
    var ext;
    if (!file) {
        const error = new Error("Please Upload a file");
        error.httpStatusCode = 404;
        return next(error);
    }
    if (file.mimetype == "image/jpeg") {
        ext = "jpg";
    }
    if (file.mimetype == "image/png") {
        ext = "png";
    }

    if (file.mimetype == "image/svg+xml") {
        ext = "svg";
    }
    if (file.mimetype == "image/gif") {
        ext = "gif";
    }

    res.render("image", { url: file.path, name: file.filename, ext: ext });
});

app.post("/compress/uploads/:name/:ext", async (req, res) => {
    const files = await imagemin(["uploads/" + req.params.name], {
        destination: "output",
        plugins: [
            imageminMozjpeg({quality: [20]}),
            imageminPngquant({quality: [0.6, 0.8]}),
            imageminGiflossy({ lossy: 80 }),
            imageminSvgo({
                plugins: extendDefaultPlugins([
                    {name: 'removeViewBox', active: false}
                ])
            }),
            //imageminWebp({quality: 50})
        ]
    });
    res.download(files[0].destinationPath);
});

module.exports = app;
