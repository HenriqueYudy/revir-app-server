const Action = require("../models/Action");

module.exports = {
  index: async (req, res, next) => {
    const action = await Action.find({});
    if (!action) {
      res.status(404).json({ error: "Action not found" });
    }

    res.status(200).json(action);
  },

  show: async (req, res, next) => {
    const action = await Action.findById(req.params.actionId);
    if (!action) {
      res.status(404).json({ error: "Action not found ! " });
    }

    res.status(200).json(action);
  },

  store: async (req, res, next) => {
    try {
      const action = await Action.create(req.body);

      return res.status(201).json({ action });
    } catch (err) {
      return res.status(400).send({ error: "Something went wrong" + err });
    }
  },

  replaceAction: async (req, res, next) => {
    const { actionId } = req.params;
    const data = req.body;
    


    try {
      const result = await Action.findByIdAndUpdate(actionId, data );
      res.status(200).json({ success: true });
    } catch (err) {
      res.status(400).json({ error: "Something went wrong " + err });
    }
  },

  update: async(req, res, next) => {
    const { actionId } = req.params;
    const data = req.body;

    try{
        const result = await Action.findByIdAndUpdate(actionId, data);
        res.status(200).json({ success: true });
    } catch(err){
        res.status(400).json({ error :  "Something went wrong " + err });
    }
  },

  delete: async(req, res, next) => {
      const { actionId } = req.params;

      const action = await Action.findById(actionId);

      if(!action){
        res.status(404).send({ error : "Action not found "});
      }

      action.delete();
      res.status(200).send({ success: "Action has been deleted "});
  }



};
