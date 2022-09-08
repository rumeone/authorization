const Router = require('express');
const router = new Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.get('/get', authMiddleware, userController.findAll);
router.post('/getOne',authMiddleware, userController.findOne);
router.post('/post', authMiddleware, userController.createPost);

module.exports = router;