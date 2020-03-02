const routes = require('express').Router();
const UserCompanyController = require('../controllers/UserCompanyController');


routes.get('/userCompany', UserCompanyController.index);
routes.post('/userCompany', UserCompanyController.store);


routes.get('/userCompany/companies/:userId', UserCompanyController.showByComapany);
routes.get('/userCompany/:userCompanyId', UserCompanyController.show);
routes.put('/userCompany/:userCompanyId', UserCompanyController.replaceUserCompany);
routes.patch('/userCompany/:userCompanyId', UserCompanyController.update)

module.exports = routes;