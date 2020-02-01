const User = require("../models/User");
const bcrypt = require('bcryptjs');

module.exports = {

  index: async (req, res, next) => {
    const users = await User.find({});
    res.status(200).json(users);
  },

  show: async (req , res, next) => {
      const user = await User.findById(req.params.userId);
      res.status(200).json(user);
  },

  store: async (req, res, next) => {
    const newUser = new User(req.body);
    const user = await newUser.save();
    res.status(201).json(user);
  },

  replaceUser: async(req, res, next) => {
    const { userId } = req.params;
    const data = req.body;
    const result = await User.findByIdAndUpdate(userId, data);
    res.status(200).json({ success: true});
  },

  update: async(req, res, next) =>{
      const { userId } = req.params;
      const data = req.body;

      const result = await User.findByIdAndUpdate(userId, data);
      res.status(200).json({ success: true});
  },

  authenticate: async(req, res, next)=> {
    const { email, password } =  req.body;

    const user = await User.findOne({email}).select('+password');

    if(!user)
    return res.status(400).send({error : "User not found !"});

  }
  


};
