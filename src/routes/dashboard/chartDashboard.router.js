const express = require('express');
const router = express.Router();
const chartDashboardController = require("../../controllers/dashboard/chartDashboard.controller");

router.get("/booking", chartDashboardController.getBookings);
router.get("/revenue", chartDashboardController.getRevenue);

module.exports = router;