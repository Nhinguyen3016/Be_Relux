const express = require('express');
const router = express.Router();
const contactController = require("../../controllers/dashboard/contact-dashboard.controller")
const { authMiddleware } = require("../../middlewares/auth");
const { allowRoles } = require("../../middlewares/check-role");



router.get("/", contactController.getContact);

module.exports = router;