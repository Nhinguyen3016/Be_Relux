const express = require('express');
const router = express.Router();
const staffController = require("../../controllers/dashboard/staff.controller");
const upload = require('../../middlewares/upload');
const { authMiddleware } = require("../../middlewares/auth");
const { allowRoles } = require("../../middlewares/check-role");

router.get("/", staffController.getEmployees);
router.get("/location", staffController.getLocation);
router.post("/", authMiddleware, allowRoles(["ADMIN", "MANAGER"]), upload.single('avatar'), staffController.createStaff);
router.put("/:employeeID", authMiddleware, allowRoles(["ADMIN", "MANAGER"]), upload.single('avatar'), staffController.updateStaff);
router.delete("/:employeeID", authMiddleware, allowRoles(["ADMIN", "MANAGER"]), staffController.deleteStaff);

module.exports = router;