const express = require('express');
const router = express.Router();
const dashboardController = require("../../controllers/dashboard/dashboard.controller");


router.get("/fullName/:username", dashboardController.getFullNameController);

router.get("/totalBooking", dashboardController.countBookingController);
router.get("/totalStaff", dashboardController.countStaffController);
router.get("/totalService", dashboardController.countServiceController);
router.get("/sumTotal", dashboardController.sumTotalController);

module.exports = router;
