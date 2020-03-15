const UserProduct = require("../models/UserProduct");
const crypto = require("crypto");

module.exports = {
  index: async (req, res, next) => {
    const userProducts = await UserProduct.find({})
      .populate("user")
      .populate("product");

    if (!userProducts) {
      res.status(400).json({ error: "User products not found !" });
    }

    res.status(200).json(userProducts);
  },

  show: async (req, res, next) => {
    const userProduct = await await UserProduct.findById(
      req.params.userProductId
    );

    if (!userProduct) {
      res.status(400).json({ error: "Product not found ! " });
    }

    res.status(200).json(userProduct);
  },

  showByUser: async (req, res, next) => {
    const userProduct = await UserProduct.find({})
      .where("user")
      .equals(req.params.userId)
      .populate({
        path: "product",
        populate: {
          path: "company",
          model: "company"
        }
      });
    if (!userProduct) {
      res.status(400).json({ error: "Não foi encontrados nenhum produtos" });
    }

    res.status(200).json(userProduct);
  },

  store: async (req, res, next) => {
    try {
      const data = req.body;
      const hash = crypto.randomBytes(16);
      data.key = hash.toString("hex");

      const newUserProduct = await UserProduct.create(data);
      return res.status(201).json(newUserProduct);
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  },

 

  replaceUserProduct: async (req, res, next) => {
    const { userProductId } = req.params;
    const data = req.body;

    const result = await UserProduct.findByIdAndUpdate(userProductId, data);

    if (!result) {
      res.status(400).json({ message: "User product cannot be updated  !" });
    }
    res.status(200).json({ success: true });
  },

  update: async (req, res, next) => {
    const { userProductId } = req.params;
    const data = req.body;

    const result = await UserProduct.findByIdAndUpdate(userProductId, data);

    if (!result) {
      res.status(400).json({
        message: "User product cannot be updated ! "
      });
    }

    res.status(200).json({ success: true });
  }
};
