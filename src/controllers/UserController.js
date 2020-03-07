const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authConfig = require("../config/auth");

function generateToken(params = {}) {
  const token = jwt.sign(params, authConfig.secret, {
    expiresIn: 86400
  });
  return token;
}

module.exports = {
  index: async (req, res, next) => {
    const users = await User.find({});

    if(!users){
      res.status(400).json({ message: "Users not found !"});
    }

    res.status(200).json(users);
  },

  show: async (req, res, next) => {
    const user = await User.findById(req.params.userId);

    if(!user){
      res.status(400).json({ message: "User not found !"});
    }
    res.status(200).json(user);
  },

  store: async (req, res, next) => {
    const { email } = req.body;

    try {
      if (await User.findOne({ email })) {
        return res.status(406).send({ error: "User already existis" });
      }

      const user = await User.create(req.body);

      user.password = undefined;
      user.cash_back_points = 0;
      user.active = true;

      return res.send({
        user,
        token: generateToken({ id: user.id })
      });
    } catch (err) {
      return res.status(400).send({ error: "Registration failed" });
    }
  },

  replaceUser: async (req, res, next) => {
    const { userId } = req.params;
    const data = req.body;
    const result = await User.findByIdAndUpdate(userId, data);
    res.status(200).json({ success: true });
  },

  update: async (req, res, next) => {
    const { userId } = req.params;
    const data = req.body;

    const result = await User.findByIdAndUpdate(userId, data);
    res.status(200).json({ success: true });
  },

  saveAvatar: async (req, res, next) => {
    const file = req.file;
    const user = await User.findById(req.body.userId);
    user.avatar = file.path;

    if (!user) {
      return res.status(404).json({ error: "User not found ! " });
    }
    try {
      const userAvatar = await User.findByIdAndUpdate(req.body.userId, user);
      return res.status(200).json(user);
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  },

  authenticate: async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).send({ error: "User not found !" });
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(400).send({ error: "Invalid Password" });
    }

    user.password = undefined;

    return res.send({ user, token: generateToken({ id: user.id }) });
  }
};
