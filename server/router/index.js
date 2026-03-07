const Router = require('express');
const userController = require('../controllers/user-controller');

const router = new Router();
const { body } = require('express-validator');

router.post('/registration', userController.registration);


module.exports = router;