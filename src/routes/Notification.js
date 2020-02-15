const NotificationController = require('../controllers/NotificationController');
const router = require('express-promise-router')();
const authMiddleware = require('../middlewares/auth');


router.route('/')
      .get(NotificationController.index)
      .post(NotificationController.store);

router.route('/:notificationId')
      .get(NotificationController.show)
      .put(NotificationController.replaceNotification)
      .patch(NotificationController.update);
      

module.exports = router;