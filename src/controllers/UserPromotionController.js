const UserPromo = require("../models/UserPromo");
const crypto = require("crypto");

module.exports = {
  index: async (req, res, next) => {
    const userPromo = await UserPromo.find({});

    if (!userPromo) {
      res.status(400).json({ error: "User promotion not found !" });
    }

    res.status(200).json(userPromo);
  },

  show: async (req, res, next) => {
    const userPromo = await UserPromo.findById(req.params.userPromoId);

    if (!userPromo) {
      res.status(400).json({ error: "userPromo not found !" });
    }

    res.status(200).json(userPromo);
  },

  showByCompany: async (req, res, next) => {
    const userPromo = await UserPromo.find()
      .where("company")
      .equals(req.params.companyId);

    if (!userPromo) {
      res.status(400).json({ error: "User promo not found !" });
    }

    res.status(200).json(userPromo);
  },

  showByUser: async (req, res, next) => {
    const userPromo = await UserPromo.find()
      .where("user")
      .equals(req.params.userId);

    if (!userPromo) {
      res.status(400).json({ error: "User promo  not found " });
    }

    res.status(200).json(userPromo);
  },

  showByUserAndCompany: async (req, res, next) => {
    const userPromo = await UserPromo.find()
      .where("user")
      .equals(req.params.userId)
      .where("company")
      .equals(req.params.companyId);

    if (!userPromo) {
      res.status(400).json({ error: "Userpromo not found !" });
    }
    res.status(200).json(userPromo);
  },

  store: async (req, res, next) => {
    try {
      const data = req.body;
      const hash = crypto.randomBytes(16);
      data.key = hash.toString("hex");

      const newUserPromo = await UserPromo.create(data);
      return res.status(201).json(newUserPromo);
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  },

  update: async(req, res, next ) => {
      const { userPromoId } = req.params;
      const data = req.body;

      const result = await UserPromo.findByIdAndUpdate(userPromoId, data);

      if(!result){
          res.status(400).json({
              message : "UserPromo cannot be updated ! "
          });
      }

      res.status(200).json(result);
  }
};
