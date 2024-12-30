const express = require("express");
const { 
    createPaymentController,
    cancelBookingController,
    updatePaymentStatusController,
    savePaymentController, sendPaymentConfirmationController
 } = require("../controllers/payment.controller");

const router = express.Router();

// Route tạo link thanh toán
router.post("/create", createPaymentController);
router.post("/savepayment", savePaymentController);
router.put("/update", updatePaymentStatusController);
router.post('/test-send-email', sendPaymentConfirmationController);
router.delete("/delete", cancelBookingController);


module.exports = router;
