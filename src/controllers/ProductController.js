const Product = require("../models/Product");

module.exports = {
  index: async (req, res, next) => {
    const product = await Product.find({});

    if (!product) {
      res.status(400).json({ error: "Product not found " });
    }

    res.status(200).json(product);
  },

  show: async (req, res, next) => {
    const product = await Product.findById(req.params.productId).populate(
      "company"
    );

    if (!product) {
      res.status(500).json({ error: "Product not found !" });
    }

    res.status(200).json(product);
  },

  store: async (req, res, next) => {
    try {
        const newProduct = await Product.create(req.body);
        return res.status(201).json(newProduct);
    } catch(err){
         return res.status(400).json({error: err });
    }
  },

  savePicture: async (req, res, next) => {
    try{
      const file = req.file;
      const product = await Product.findById(req.body.productId);
      product.picture = file.path;

      await product.save();
      return res.status(200).json(product);
    }catch(err) {
      return res.status(400).json({ error : err });
    }
  },

  replaceProduct: async (req, res, next) => {
    const { productId } = req.params;
    const data = req.body;

    const result = await Product.findByIdAndUpdate(productId, data);
    res.status(200).json({ success: true });
  },

  update: async (req, res, next) => {
    const { productId } = req.paras;
    const data = req.body;

    const result = await Product.findByIdAndUpdate(productId, data);
    res.status(200).json({ sucess: true });
  }
};
