const {Router} = require('express');
const indexController = require('../controllers/indexController');
const indexRouter = Router();

indexRouter.get('/', indexController.getMessages);
indexRouter.get('/club', indexController);

module.exports = indexRouter;