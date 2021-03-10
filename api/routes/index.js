var express = require('express');
var router = express.Router();

// CALL CONTROLLERS
const blogController = require('../controllers/blogController')
const userController = require('../controllers/userController')

// CALL MIDDLEWARE
const checkAuth = require('../middleware/checkAuth')
const fileUpload = require('../middleware/fileUpload')


router.get('/', function(req, res, next) {
  res.send('mantap bos njir');
});

// AUTHENTICATION 
router.post('/login', userController.login)
router.post('/register', userController.register)

// BLOGS
router.route('/blogs')
  .get(blogController.index)
  .post(checkAuth, fileUpload.single('cover'), blogController.store)

router.route('/blogs/:id')
  .get(blogController.show)
  .put(checkAuth, blogController.update)
  .delete(checkAuth, blogController.delete)

module.exports = router;
