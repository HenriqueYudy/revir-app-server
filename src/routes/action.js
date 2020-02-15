const express = require("express");

const ActionController = require("../controllers/ActionController");
const router = require('express-promise-router')();

router
    .route("/")
    .get(ActionController.index)
    .post(ActionController.store);

router.route('/:actionId')
    .get(ActionController.show)
    .put(ActionController.replaceAction)
    .patch(ActionController.update);

module.exports = router;