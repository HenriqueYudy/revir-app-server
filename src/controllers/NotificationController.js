const Notification = require("../models/Notification");

module.exports = {
  index: async (req, res, next) => {
    const notification = await Notification.find({}).populate("action");

    if (!notification) {
      res.status(400).json({ error: "Notification not found " });
    }

    res.status(200).json({ notification });
  },

  show: async (req, res, next) => {
    const notification = await Notification.findById(
      req.params.notificationId
    ).populate("action");

    if (!notification) {
      res.status(500).json({ error: "Notification not found !" });
    }

    res.status(200).json({ notification });
  },

  store: async (req, res, next) => {
    try {
      const newNotification = await Notification.create(req.body);
      return res.status(201).json(newNotification);
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  },

  replaceNotification: async (req, res, next) => {
    const { notificationId } = req.params;
    const data = req.body;

    const result = await Notification.findByIdAndUpdate(notificationId, data);
    res.status(200).json({ success: true });
  },

  update: async (req, res, next) => {
      const {notificationId } = req.params;
      const data = req.body;

      const result = await Notification.findByIdAndUpdate(notificationId, data);
      res.status(200).json({ success: true });
  }
};
