const Product = require("../models/Product");
const Company = require("../models/Company");

module.exports = {
  index: async (req, res, next) => {
    const product = await Product.find({});

    if (!product) {
      res.status(400).json({ error: "Product not found " });
    }

    res.status(200).json(product);
  },

  indexByRequiredPoint: async (req, res, next) => {
    const product = await Product.find({}).where('required_point').lte(100).populate('company');

    product.filter()
    if(!product){
      res.status(400).json({ error: "Product not found "});
    }

    res.status(200).json(product);
  },

  indexByCompany: async (req , res, next) => {

    const products = await Product.find({}).where('company').equals(req.params.companyId);

    if(!products){
      res.status(400).json({ error : "Companies product not found " });
    }

    res.status(200).json(products);
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
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  },

  storeOnCompany: async (req, res, next) => {
    const { companyId } = req.params;
    const newProduct = new Product(req.body);

    const company = await Company.findById(companyId);
    newProduct.company = company;
    await newProduct.save();

    company.product.push(newProduct);

    await company.save();
    res.status(201).json(newProduct);
  },

  savePicture: async (req, res, next) => {
    try {
      const file = req.file;
      const product = await Product.findById(req.body.productId);
      product.picture = file.path;

      await product.save();
      return res.status(200).json(product);
    } catch (err) {
      return res.status(400).json({ error: err });
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
