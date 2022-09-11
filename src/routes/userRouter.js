const Router = require('express');
const router = new Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');

router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.get('/get', authMiddleware, userController.findAll);
router.post('/getOne',authMiddleware, checkRoleMiddleware("ADMIN"), userController.findOne);
router.post('/post', authMiddleware, checkRoleMiddleware("ADMIN"), userController.createPost);

module.exports = router;