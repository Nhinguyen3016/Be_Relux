const { savePushToken } = require("../controllers/notification.controller");
const { sendBookingNotification } = require("../services/notification.service");

const router = require("express").Router();

router.post("/save_token", savePushToken);
router.post("/pushNotification", sendBookingNotification);
module.exports = router;
