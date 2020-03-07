const UserCompany = require("../models/UserCompany");
const Company = require("../models/Company");

module.exports = {
  index: async (req, res, next) => {
    const userCompany = await UserCompany.find({});

    if (!userCompany) {
      res.status(400).json({ error: "Companies not found" });
    }

    res.status(200).json(userCompany);
  },

  show: async (req, res, next) => {
    const userCompany = await UserCompany.findById(req.params.userCompanyId);

    if (!userCompany) {
      res.status(400).json({ error: "Companies not found !" });
    }

    res.status(200).json(userCompany);
  },

  showByUserCompany: async (req, res, next) => {
    const userCompany = await UserCompany.find({})
      .where("user")
      .equals(req.params.userId)
      .where("company")
      .equals(req.params.companyId)
      

    if (!userCompany) {
      res.status(400).send({ error: "User companies not found !" });
    }

    res.status(200).json(userCompany);
  },

  showByComapany: async (req, res, next) => {
    const userCompany = await UserCompany.find({})
      .where("user")
      .equals(req.params.userId);

    if (!userCompany) {
      res.status(400).send({ error: "User companies not found ! " });
    }

    try {
      const companies = await Company.find({});
      userCompany.push(companies);
      res.status(200).json(userCompany);
    } catch (err) {
      res.status(400).send({ error: "Companies not found ! " });
    }
  },

  store: async (req, res, next) => {
    try {
      const newUserCompany = await UserCompany.create(req.body);
      return res.status(201).json(newUserCompany);
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  },

  replaceUserCompany: async (req, res, next) => {
    const { userCompanyId } = req.params;
    const data = req.body;

    const result = await UserCompany.findByIdAndUpdate(userCompanyId, data);
    res.status(200).json({ success: true });
  },

  update: async (req, res, next) => {
    const { userCompanyId } = req.params;
    const data = req.body;

    const result = await UserCompany.findByIdAndUpdate(userCompanyId, data);

    

    if(!result){
      res.status(400).json({ message : "User not found !"});
    }

    res.status(200).json({ success: true });
  }
};
