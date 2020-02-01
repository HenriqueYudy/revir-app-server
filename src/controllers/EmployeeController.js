const Employee = require("../models/Employee");

module.exports = {
  index: async (req, res, next) => {
    const employees = await Employee.find({}).populate('company');
    res.status(200).json(employees);
  },

  show: async (req, res, next) => {
    const employee = await Employee.findById(req.params.employeeId).populate('company');
    res.status(200).json(employee);
  },

  store: async (req, res, next) => {
    const employee = new Employee(req.body);
    const newEmployee = await employee.save();
    res.status(200).json(newEmployee);
  },

  replaceEmployee: async (req, res, next) => {
    const { employeeId } = req.params;
    const data = req.body;

    const result = await Employee.findByIdAndUpdate(employeeId, data);
    res.status(200).json({ success: true });
  },

  update: async (req, res, next) => {
    const { employeeId } = req.params;
    const data = req.body;

    const result = await Employee.findByIdAndUpdate(employeeId, data);
    res.status(200).json({ success: true });
  }
};
