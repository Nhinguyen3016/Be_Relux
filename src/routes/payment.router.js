const express = require("express");
const { 
    createPaymentController,
    cancelBookingController,
    updatePaymentStatusController,
    savePaymentController, sendPaymentConfirmationController,convertVndToUsd
 } = require("../controllers/payment.controller");

const router = express.Router();

// Route tạo link thanh toán
router.post("/create", createPaymentController);
router.post("/savepayment", savePaymentController);
router.put("/update", updatePaymentStatusController);
router.post('/test-send-email', sendPaymentConfirmationController);
router.delete("/delete", cancelBookingController);
router.post('/convert-vnd-to-usd', async (req, res) => {
    const { vndAmount } = req.body;
  
    // Kiểm tra dữ liệu đầu vào
    if (!vndAmount || typeof vndAmount !== 'number' || vndAmount <= 0) {
      return res.status(400).json({ error: 'Invalid VND amount' });
    }
  
    try {
      const usdAmount = await convertVndToUsd(vndAmount);
  
      if (usdAmount === null) {
        return res.status(500).json({ error: 'Conversion failed' });
      }
  
      res.json({ vndAmount, usdAmount });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  


module.exports = router;
