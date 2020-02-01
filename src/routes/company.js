const CompanyController = require("../controllers/CompanyController");
const router = require("express-promise-router")();

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


module.exports = router;
