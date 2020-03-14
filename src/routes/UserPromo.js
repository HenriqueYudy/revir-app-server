const UserPromoController = require('../controllers/UserPromotionController');
const router = require('express-promise-router')();



router.route("/")
.get(UserPromoController.index)
.post(UserPromoController.store);


router.route("/:UserPromoId")
      .get(UserPromoController.show)
      .put(UserPromoController.update)


router.route("/userFilter/:userId")
      .get(UserPromoController.showByUser);

router.route("/companyFilter/:companyId")
      .get(UserPromoController.showByCompany);

router.route("/filter/:userId/:companyId")
      .get(UserPromoController.showByUserAndCompany);

module.exports = router;