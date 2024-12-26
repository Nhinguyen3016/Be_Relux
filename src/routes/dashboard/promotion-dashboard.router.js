const express = require('express');
const router = express.Router();
const promotionController = require('../../controllers/dashboard/promotion-dashboard.controller');
const { authMiddleware } = require("../../middlewares/auth");
const { allowRoles } = require("../../middlewares/check-role");


router.get("/",promotionController.getPromotions);
router.get("/services",promotionController.getServices);
router.post("/",authMiddleware, allowRoles(["ADMIN", "MANAGER"]),promotionController.createPromotions);
router.put("/:promotionID",authMiddleware, allowRoles(["ADMIN", "MANAGER"]),promotionController.updatePromotions);
router.delete("/:promotionID",authMiddleware, allowRoles(["ADMIN", "MANAGER"]),promotionController.deletePromotions);



module.exports = router;