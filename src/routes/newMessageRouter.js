const {Router} = require('express');
const newMessageController = require('../controllers/newMessageController');
const newMessageRouter = Router();

newMessageRouter.get('/', newMessageController.getForm);
newMessageRouter.post('/', newMessageController.postMessage);

module.exports = newMessageRouter;