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

router 
   .route('/byCompany/:companyId')
   .get(PromotionController.showByCompany);

module.exports = router;
