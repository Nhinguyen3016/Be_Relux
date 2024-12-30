const express = require('express');
const router = express.Router();
const bookingEmployeesController = require("../../controllers/dashboard/booking-employees.controller")
const { authMiddleware } = require("../../middlewares/auth");
const { allowRoles } = require("../../middlewares/check-role");



router.get("/count-booking-employees", bookingEmployeesController.getStaticBookingController);
router.get("/pending-employees",bookingEmployeesController.getServiceBookingPendingController);
router.get("/inprogress-employees",bookingEmployeesController.getServiceBookingInProgressController);
router.get("/completed-employees",bookingEmployeesController.getServiceBookingCompletedController);

module.exports = router;