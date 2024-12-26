const express = require('express');
const router = express.Router();
const bookingController = require("../../controllers/dashboard/booking.controller")
const { authMiddleware } = require("../../middlewares/auth");
const { allowRoles } = require("../../middlewares/check-role");



router.get("/count-booking", bookingController.getStaticBooking);
router.get("/pending",bookingController.getServiceBookingPending);
router.get("/inprogress",bookingController.getServiceBookingInProgress);
router.get("/completed",bookingController.getServiceBookingCompleted);

module.exports = router;