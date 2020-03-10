const PromotionController = require("../controllers/PromotionController");
const router = require("express-promise-router")();

router
  .route("/")
  .get(PromotionController.index)
  .post(PromotionController.store);

router
  .route("/:promotionId")
  .get(PromotionController.show)
  .put(PromotionController.replacePromotion)
  .patch(PromotionController.update);

module.exports = router;
