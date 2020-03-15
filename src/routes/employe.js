const EmployeeController = require('../controllers/EmployeeController');
const router = require('express-promise-router')();

router.route('/')
    .get(EmployeeController.index)
    .post(EmployeeController.store);
router.route('/:employeeId')
    .get(EmployeeController.show)
    .put(EmployeeController.replaceEmployee)
    .patch(EmployeeController.update);
router.route("/authenticate")
    .post(EmployeeController.login);

router.route("/auth/identification")
    .get(EmployeeController.authentication);
   

module.exports = router;