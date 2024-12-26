const express = require("express");
const { 
    createPaymentController,
    checkPaymentStatusController,
    updatePaymentStatusController,
    savePaymentController
 } = require("../controllers/payment.controller");

const router = express.Router();

// Route tạo link thanh toán
router.post("/create", createPaymentController);
router.post("/savepayment", savePaymentController);
router.get("/check", checkPaymentStatusController);
router.put("/update", updatePaymentStatusController);


module.exports = router;
