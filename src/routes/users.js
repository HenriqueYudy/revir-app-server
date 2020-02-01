const express = require("express");
// const router = express.Router();
const UserController = require('../controllers/UserController');
const router = require('express-promise-router')();

router
  .route("/")
  .get(UserController.index)
  .post(UserController.store);
  
router.route('/:userId')
  .get(UserController.show)
  .put(UserController.replaceUser)
  .patch(UserController.update);

  router.route('/authenticate')
        .post(UserController.authenticate);

  module.exports = router;