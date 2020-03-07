const routes = require('express').Router();
const multer = require('multer');
const multerConfig = require('../middlewares/multer');
const ProductController = require('../controllers/ProductController');

routes.get('/product/filters', ProductController.indexByRequiredPoint);
routes.get('/product/bycompany/:companyId', ProductController.indexByCompany);
routes.get('/product', ProductController.index);

routes.post('/product',  ProductController.store);
routes.post('/product/:companyId', ProductController.storeOnCompany);
routes.post('/product/fileUpload', multer(multerConfig).single("file"), ProductController.savePicture);

routes.get('/product/:productId', ProductController.show);
routes.patch('/product/:productId', ProductController.update);
routes.put('/product/:productId', ProductController.replaceProduct);

module.exports = routes;