const express = require('express');
const router = express.Router();
const serviceCategoryDashboardController = require("../../controllers/dashboard/serviceCategoryDashboard.controller");
const { authMiddleware } = require("../../middlewares/auth");
const { allowRoles } = require("../../middlewares/check-role");

router.get('/', serviceCategoryDashboardController.getServiceCategory);
router.put("/:categoryID", authMiddleware, allowRoles(["ADMIN", "MANAGER"]), serviceCategoryDashboardController.updateServiceCategory);

module.exports = router;