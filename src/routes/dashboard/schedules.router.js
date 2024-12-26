const express = require('express');
const router = express.Router();
const schedulesController = require("../../controllers/dashboard/schedules.controller");
const { authMiddleware } = require("../../middlewares/auth");
const { allowRoles } = require("../../middlewares/check-role");

router.get("/", schedulesController.getWorking);
router.get("/employees", schedulesController.getEmployees);
router.post("/", authMiddleware, allowRoles(["ADMIN", "MANAGER"]), schedulesController.createSchedules);
router.put("/:workScheduleID", authMiddleware, allowRoles(["ADMIN", "MANAGER"]), schedulesController.updateSchedules);
router.delete("/:workScheduleID", authMiddleware, allowRoles(["ADMIN", "MANAGER"]), schedulesController.deleteSchedules);

module.exports = router;