const Company = require("../models/Company");
const Employee = require('../models/Employee');

module.exports = {
  index: async (req, res, next) => {
    const company = await Company.find({}).populate('employee');
    res.status(200).json(company);
  },

  allCompany: async (req, res, next) => {
    const company = await Company.find({});
    res.status(200).json(company);
  },

  show: async (req, res, next) => {
    const company = await Company.findById(req.params.companyId);
    res.status(200).json(company);
  },

  store: async (req, res, next) => {
    const company = new Company(req.body);
    const newCompany = await company.save();
    res.status(201).json(newCompany);
  },

  replaceEmployee: async (req, res, next) => {
    const { companyId } = req.params;
    const data = req.body;

    const result = await Company.findByIdAndUpdate(companyId, data);
    res.status(200).json({ success: true });
  },

  update: async (req, res, next) => {
    const { companyId } = req.params;
    const data = req.body;

    const result = await Company.findByIdAndUpdate(companyId, data);
    res.status(200).json({ success: true });
  },

  getCompanyEmployees: async(req, res, next) => {
    const { companyId } = req.params;
    const company = await Company.findById(companyId).populate('employee');
    res.status(200).json(company);
  },

  newCompanyEmployee: async(req, res, next) => {
    // req.body
    const { companyId } = req.params;
    // Create a new employee
    const newEmployee = new Employee(req.body);
    //Get company
    const company = await Company.findById(companyId);
    // Assign company as a employee's 
    newEmployee.company = company;  
    // Save the employee
    await newEmployee.save();
    // Add employee to the company's employees array
    company.employee.push(newEmployee);
    // Save the company
    await company.save();
    res.status(201).json(newEmployee);
  }

};
