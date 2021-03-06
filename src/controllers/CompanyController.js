const Company = require("../models/Company");
const Employee = require("../models/Employee");
const bycript = require("bcryptjs");
const authConfig = require("../config/auth.json");
const jwt = require("jsonwebtoken");

function generateToken(params = {}) {
  const token = jwt.sign(params, authConfig.secret, {
    expiresIn: 86400
  });
  return token;
}

module.exports = {
  index: async (req, res, next) => {
    const company = await Company.find({})
      .populate("employee")
      .populate("product");
    
    
      res.status(200).json(company);

  },

  allCompany: async (req, res, next) => {
    const company = await Company.find({});
    res.status(200).json(company);
  },

  indexByRequiredPoint: async (req, res, next) => {
    const company = await Company.find({}).populate({
      path: "product",
      match: { required_point: { $lte: 100 } }
    })

    if(!company){
      res.status(400).json({error: "Companies not found "});
    }

    res.status(200).json(company);
  },

  show: async (req, res, next) => {
    const company = await Company.findById(req.params.companyId);
    res.status(200).json(company);
  },

  store: async (req, res, next) => {
    const { cnpj } = req.body;
    const newCompany  = req.body;

    try {
      if (await Company.findOne({ cnpj })) {
        return res.status(400).send({ error: "Company already existis" });
      }

      const hash = await bycript.hash(newCompany.password, 10);
      newCompany.password = hash;
      
      const company = await Company.create(newCompany);

      company.password = undefined;

      return res.send({
        company,
        token: generateToken({ id: company.id })
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

    if (!company) {
      return res.status(400).send({ error: "Company not found !" });
    }

    if (!(await bycript.compare(password, company.password))) {
      return res.status(400).send({ error: "Invalid password " });
    }

    const token = generateToken({ id: company.id });

    res.json({ "token": token, "company": company });
  },

  authenticationByCnpj: async (req, res, next) => {
    const { cnpj, password } = req.body;

    const company = await Company.findOne({ cnpj }).select("+password");

    if (!company) {
      return res.status(400).send({ error: "Company not found ! " });
    }

    if (!(await bycript.compare(password, company.password))) {
      return res.status(400).send({ error: "Invalid password" });
    }

    const token = generateToken({ id: company.id });

    res.json({ "token": token, "company": company })
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
    await company.employee.push(newEmployee._id);
    // Save the company
    const newcomp = await company.save();

    res.status(201).json(newEmployee);
  }
};
