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

      employee.password = undefined;

      
      return res.send({
        employee,
        token: generateToken({ id: employee.id })
      });

    }catch (err ){
      return res.status(400).send({ error: "Registration failed "});
    }
  },

  login: async (req, res, next) => {
    const { email, password } = req.body;

    const employee = await Employee.findOne({ email }).select("+password");

    if (!employee) {
      return res.status(400).send({ error: "Employee not found !" });
    }

    if (!(await bcrypt.compare(password, employee.password))) {
      return res.status(400).send({ error: "Invalid password " });
    }

    const token = generateToken({ id: employee.id });

    res.send({ token });
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
