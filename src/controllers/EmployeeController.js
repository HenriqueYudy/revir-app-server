const Employee = require("../models/Employee");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.json");

function generateToken(params = {}) {
  const token = jwt.sign(params, authConfig.secret, {
    expiresIn: 86400
  });
  return token;
}

module.exports = {
  index: async (req, res, next) => {
    const employees = await Employee.find({}).populate("company");
    res.status(200).json(employees);
  },

  show: async (req, res, next) => {
    const employee = await Employee.findById(req.params.employeeId).populate(
      "company"
    );
    res.status(200).json(employee);
  },

  store: async (req, res, next) => {
    const { email } = req.body;

    try {
      if(await Employee.findOne({email})){
        return res.status(400).send({ error: "Employee already existis "});
      }

      const employee = await Employee.create(req.body);

      return res.send({
        employee,
        token: generateToken({ id: employee.id })
      });

    }catch (err ){
      return res.status(400).send({ error: "Registration failed " + err });
    }
  },

  login: async (req, res, next) => {
    const { email, password } = req.body;

    const employee = await Employee.findOne({ email });

    if (!employee) {
      return res.status(400).send({ error: "Employee not found !" });
    }

    if (!(await bcrypt.compare(password, employee.password))) {
      return res.status(400).send({ error: "Invalid password " });
    }

    const token = generateToken({ id: employee.id });

    res.send({ token });
  },

  authentication: async(req, res, next) => {
    const indent = req.query.identification_code;
    const company = req.query.company;

    console.log(indent)
    const employee = await Employee.findOne({ identification_code: indent, company: company });
    console.log(employee)

    if(!employee){
      res.status(400).send({ allowed: false });
    }

    res.status(403).send({ allowed: true });
  },

  replaceEmployee: async (req, res, next) => {
    const { employeeId } = req.params;
    const data = req.body;

    const result = await Employee.findByIdAndUpdate(employeeId, data);

    if(!result){
      res.status(400).json({ message:  "Employee cannot be updated ! "});
    }
    res.status(200).json({ success: true });
  },

  update: async (req, res, next) => {
    const { employeeId } = req.params;
    const data = req.body;

    const result = await Employee.findByIdAndUpdate(employeeId, data);
    res.status(200).json({ success: true });
  }
};
