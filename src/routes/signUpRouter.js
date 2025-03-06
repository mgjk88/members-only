const {Router} = require('express');
const signUpController = require('../controllers/signUpController');
const signUpRouter = Router();

signUpRouter.get('/', signUpController.getForm);
signUpRouter.post('/', signUpController.validateForm, signUpController.postForm);

module.exports = signUpRouter;