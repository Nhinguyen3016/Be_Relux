const express = require('express');
const router = express.Router();
const serviceDashboardController = require("../../controllers/dashboard/serviceDashboard.controller");
const upload = require('../../middlewares/upload');
const { authMiddleware } = require("../../middlewares/auth");
const { allowRoles } = require("../../middlewares/check-role");


router.get('/:categoryID', serviceDashboardController.getServicesByCategory);
router.get('/nameprice/:serviceID', serviceDashboardController.getNamePriceServices);
router.post("/", authMiddleware, allowRoles(["ADMIN", "MANAGER"]), upload.single('image'), serviceDashboardController.createService);
router.put("/:serviceID", authMiddleware, allowRoles(["ADMIN", "MANAGER"]), upload.single('image'), serviceDashboardController.updateService);
router.delete("/:serviceID", authMiddleware, allowRoles(["ADMIN", "MANAGER"]), serviceDashboardController.deleteService);

module.exports = router;
