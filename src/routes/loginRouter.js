const {Router} = require('express');
const loginController = require('../controllers/loginController');
const loginRouter = Router();

loginRouter.get('/', loginController.getForm);
loginRouter.post('/', loginController.verifyCredentials);

module.exports = loginRouter;