const routes = require('express').Router();
const UserProductController = require('../controllers/UserProductController');

routes.get('/UserProduct', UserProductController.index);
routes.post('/UserProduct', UserProductController.store);

routes.get('/UserProduct/showByUserId/:userId', UserProductController.showByUser);
routes.get('/UserProduct/:UserProductId', UserProductController.show);
routes.patch('/UserProduct:UserProductId', UserProductController.replaceUserProduct);
routes.put('/UserProduct:UserProductId', UserProductController.update);


module.exports = routes;