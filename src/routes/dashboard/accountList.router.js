const express = require('express');
const router = express.Router();
const accountListController = require("../../controllers/dashboard/accountList.controller")
const { authMiddleware } = require("../../middlewares/auth");
const { allowRoles } = require("../../middlewares/check-role");



router.get("/", accountListController.getAccount);
router.get("/rolename", accountListController.getRoleName);
router.put("/:userID",authMiddleware, allowRoles(["ADMIN"]), accountListController.updateAccountList);

module.exports = router;