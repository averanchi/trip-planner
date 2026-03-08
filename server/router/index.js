const Router = require('express');
const userController = require('../controllers/user-controller');

const router = new Router();
const { body } = require('express-validator');

router.post('/registration', body('email').isEmail(), body('password').isLength({ min: 4, max: 20 }), userController.registration);
router.post('/login', userController.login);
router.get('/activate/:link', userController.activate);


module.exports = router;