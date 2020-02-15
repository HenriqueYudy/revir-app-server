const routes = require('express').Router();
const UserController = require('../controllers/UserController');
const multer = require('multer');
const multerConfig = require('../middlewares/multer');



routes.get('/user', UserController.index);
routes.post('/user', UserController.store);
routes.post('/user/avatarUpload', multer(multerConfig).single("file"), UserController.saveAvatar);

routes.get('/user/:userId', UserController.show);
routes.patch('/user/:userId', UserController.update);
routes.put('/user/:userId', UserController.replaceUser);

routes.post('/authenticate', UserController.authenticate);

module.exports = routes;