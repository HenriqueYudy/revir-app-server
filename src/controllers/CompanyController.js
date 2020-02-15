const Company = require("../models/Company");
const Employee = require("../models/Employee");
const bycript = require("bcryptjs");
const authConfig = require("../config/auth.json");
const jwt = require('jsonwebtoken');

function generateToken(params = {}){
  const token = jwt.sign(params, authConfig.secret, {
    expiresIn: 86400
  });
  return token;
}


module.exports = {
  index: async (req, res, next) => {
    const company = await Company.find({}).populate("employee");
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
    const { cnpj } = req.body;

    try {
      if (await Company.findOne({ cnpj })) {
        return res.status(400).send({ error: "Company already existis" });
      }

      const company = await Company.create(req.body);

      company.password = undefined;

      return res.send({
        company,
        token: generateToken({ id: company.id})
      });
    } catch (err) {
      return res.status(400).send({ error: "Registration failed " + err });
    }
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

  getCompanyEmployees: async (req, res, next) => {
    const { companyId } = req.params;
    const company = await Company.findById(companyId).populate("employee");
    res.status(200).json(company);
  },

  authentication: async (req, res, next) => {
    const { email, password, cnpj } = req.body;

    const company = await Company.findOne({ email }).select("+password");

    if(!company){
      return res.status(400).send({ error : "Company not found !"});
    }

    if(!(await bycript.compare(password, company.password))){
      return res.status(400).send({ error: "Invalid password "});
    }

    const token = generateToken({ id: company.id });

    res.send({token});

  },

  authenticationByCnpj: async(req, res, next) => {
    const {cnpj, password} = req.body;

    const company = await Company.findOne({cnpj}).select("+password");

    if(!company){
      return res.status(400).send({error : "Company not found ! "});
    }

    if(!(await bycript.compare(password, company.password))){
      return res.status(400).send({ error : "Invalid password"});
    }

    const token = generateToken({id: company.id});

    res.send({token});
  },

  newCompanyEmployee: async (req, res, next) => {
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
