const EmployeeController = require('../controllers/EmployeeController');
const router = require('express-promise-router')();

router.route('/')
    .get(EmployeeController.index)
    .post(EmployeeController.store);
router.route('/:employeeId')
    .get(EmployeeController.show)
    .put(EmployeeController.replaceEmployee)
    .patch(EmployeeController.update);
   

module.exports = router;