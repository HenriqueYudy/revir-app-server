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
      .equals(req.params.companyId);

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

  toScore: async (req, res, next) => {
    const value = req.query.value;
    const company = req.query.company;
    const user = req.query.user;

    console.log(value);
    console.log(company);
    console.log(user);

    const userCompany = await UserCompany.findOne({
        company: company,
        user: user
    });

    if(!userCompany){
        const newUserCompany = await UserCompany.create({
            user: user,
            company: company,
            favorited: false,
            earned_points: value
        });

        if(!newUserCompany){
            res.status(400).json({ error : "It was not possible to score"});
        }
        res.status(201).json(newUserCompany);
    } else {

      const points = parseInt(value);

      userCompany.earned_points += points;
      await userCompany.save();
      
      res.status(200).json(userCompany);
    }

},

  favoriteAndDesafavoriteCompany: async (req, res, next) => {
    const companyId = req.query.company;
    const userId = req.query.user;
    const userCompany = await UserCompany.findOne({
      company: companyId,
      user: userId
    });

    if (!userCompany) {
      console.log("nao tem relação ainda");
      const newUSerCompany = await UserCompany.create({
        user: userId,
        company: companyId,
        favorited: true,
        earned_points: 0
      });
      res.status(200).json(newUSerCompany);
    } else {
      userCompany.favorited = !userCompany.favorited;
      const updateUserCompany = await UserCompany.findByIdAndUpdate(
        userCompany._id,
        userCompany
      );
      console.log("ja existe");
      res.status(200).json(userCompany);
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

    if (!result) {
      res.status(400).json({ message: "User not found !" });
    }

    res.status(200).json({ success: true });
  }
};
