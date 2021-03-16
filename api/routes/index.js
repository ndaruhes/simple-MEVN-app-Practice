var express = require('express');
var router = express.Router();

// CALL CONTROLLERS
const authController = require('../controllers/authController')
const blogController = require('../controllers/blogController')

// CALL MIDDLEWARE
const checkAuth = require('../middleware/checkAuth')
const fileUpload = require('../middleware/fileUpload')


router.get('/', function(req, res, next) {
  res.send('mantap bos njir');
});

// AUTHENTICATION 
router.post('/login', authController.login)
router.post('/register', authController.register)

// BLOGS
router.route('/blogs')
  .get(blogController.index)
  .post(checkAuth, fileUpload.single('cover'), blogController.store)

router.route('/blogs/:slug')
  .get(blogController.show)
  .put(checkAuth, fileUpload.single('cover'), blogController.update)
  .delete(checkAuth, blogController.delete)

module.exports = router;
