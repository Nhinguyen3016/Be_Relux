const { 
    createPaymentLink, 
    savePayment, 
    checkPaymentStatus,
    updatePaymentStatus
  } = require("../services/payment.service");
  
  const savePaymentController = async (req, res) => {
    try {
      const { bookingID, amount, paymentMethod, paymentStatus } = req.body;
  
      // Kiểm tra đầu vào
      if (!amount || !paymentMethod || !paymentStatus) {
        return res.status(400).json({
          success: false,
          message: 'Missing required fields: amount, paymentMethod, paymentStatus.',
        });
      }
  
      const result = await savePayment(bookingID, amount, paymentMethod, paymentStatus);
  
      return res.status(200).json({
        success: true,
        message: 'Payment saved successfully.',
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

  const createPaymentController = async (req, res) => {
    const { amount, description, bookingID, returnUrl, cancelUrl, items  } = req.body;
    
    // Kiểm tra các tham số cần thiết trong body
    if (!amount || !bookingID || !returnUrl || !cancelUrl || !items) {
      return res.status(400).json({ message: 'Missing required fields.' });
    }
  
    try {
      // Chuẩn bị dữ liệu order
      const orderDetails = {
        bookingID: Number(bookingID),
        amount,
        description: description || 'Booking Appointment',
        items,
        returnUrl,
        cancelUrl,
      };
      if (isNaN(orderDetails.bookingID) || orderDetails.bookingID <= 0 || orderDetails.bookingID > 9007199254740991) {
        return res.status(400).json({
          message: "Invalid orderCode. It must be a positive number and not greater than 9007199254740991.",
        });
      }
  
      // Tạo link thanh toán
      const paymentUrl = await createPaymentLink(orderDetails);
      
      const finalTotalPrice =await convertVndToUsd(amount);
      console.log("A",amount);
      console.log("A",finalTotalPrice);
      // Lưu thông tin thanh toán với trạng thái "Pending"
      await savePayment(bookingID, finalTotalPrice, 'PayOS', 'Pending');
      
      // Trả về URL thanh toán
      return res.status(200).json({ paymentUrl });
    } catch (error) {
      console.error('Error creating payment:', error.message);
      return res.status(500).json({ message: 'Error creating payment', error: error.message });
    }
  };
  
  const checkPaymentStatusController = async (req, res) => {
    const { bookingID } = req.query; // Lấy `bookingID` từ query string
    console.log("BookingID:",bookingID);
    // Kiểm tra nếu không có `bookingID`
    if (!bookingID) {
      return res.status(400).json({ message: 'Missing bookingID.' });
    }
  
    try {
      // Kiểm tra trạng thái thanh toán
      const paymentStatus = await checkPaymentStatus(bookingID);
  
      if (!paymentStatus) {
        return res.status(404).json({
          message: 'Payment status not found.',
        });
      }
  
      return res.status(200).json({
        bookingID,
        paymentStatus,
        message: 'Payment status checked successfully.',
      });
    } catch (error) {
      console.error('Error checking payment status:', error.message);
  
      // Trả về lỗi nếu không thể kiểm tra trạng thái thanh toán
      return res.status(500).json({
        message: 'Error checking payment status.',
        error: error.message || error.response || 'An unknown error occurred.',
      });
    }
  };
  
  
  const updatePaymentStatusController = async (req, res) => {
    const { bookingID } = req.query; // Lấy `bookingID` từ query string
  
    // Kiểm tra nếu không có `bookingID`
    if (!bookingID) {
      return res.status(400).json({ message: 'Missing bookingID.' });
    }
  
    try {
      // Cập nhật trạng thái thanh toán
      const paymentStatus = await updatePaymentStatus(bookingID);
  
      // Trả về kết quả
      return res.status(200).json({
        bookingID,
        paymentStatus,
        message: 'Payment status updated successfully.',
      });
    } catch (error) {
      console.error('Error checking and updating payment status:', error.message);
      return res.status(500).json({
        message: 'Error updating payment status.',
        error: error.message,
      });
    }
  };
  const convertVndToUsd = async (vndAmount) => {
    const API_KEY = '5f19dda9a72f467239172933'; 
    const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/VND`;
  
    try {
      // Gửi yêu cầu lấy tỷ giá VND/USD
      const response = await fetch(API_URL);
  
      if (!response.ok) {
        throw new Error('Failed to fetch exchange rate');
      }
  
      const data = await response.json();
      const vndToUsdRate = data.conversion_rates.USD;
  
      // Tính số tiền USD
      const usdAmount = vndAmount * vndToUsdRate;
      return usdAmount;
  
    } catch (error) {
      console.error('Error converting VND to USD:', error);
      return null;
    }
  };
  
  
  module.exports = { createPaymentController, checkPaymentStatusController, updatePaymentStatusController, savePaymentController };
  