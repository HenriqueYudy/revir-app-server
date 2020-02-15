const CompanyController = require("../controllers/CompanyController");
const router = require("express-promise-router")();
const authMiddleware = require('../middlewares/auth');

router.use(authMiddleware);


router
  .route("/")
  .get(CompanyController.index)
  .post(CompanyController.store);
router
  .route("/:companyId")
  .get(CompanyController.show)
  .put(CompanyController.replaceEmployee)
  .patch(CompanyController.update);

router
  .route("/:companyId/employee")
  .get(CompanyController.getCompanyEmployees)
  .post(CompanyController.newCompanyEmployee);

router.route("/mobile/all")
      .get(CompanyController.allCompany)

router.route("/authentication")
      .post(CompanyController.authentication);

router.route("/authenticationByCnpj")
      .post(CompanyController.authenticationByCnpj);

module.exports = router;
