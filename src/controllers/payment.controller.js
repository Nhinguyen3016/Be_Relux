const { 
    createPaymentLink, 
    savePayment, 
    deleteBookingPayos,
    updatePaymentStatus
  } = require("../services/payment.service");
  const { sendPaymentSuccessEmail } = require('../services/sendEmailPayment');
  
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
      res.status(200).json({ paymentUrl });

      setTimeout(async () => {
        try {
          const paymentStatus = await updatePaymentStatus(bookingID);
          console.log("Payment status after update:", paymentStatus);
        } catch (error) {
          console.error('Error updating payment status:', error.message);
        }
      }, 40000);
      setTimeout(async () => {
        try{
          const cancelBooking = await deleteBookingPayos(bookingID);
          console.log("CancelBooking:", cancelBooking);
        } catch (error) {
          console.error('CancelBooking:', error.message);
        }
      }, 3600000);
    } catch (error) {
      console.error('Error creating payment:', error.message);
      return res.status(500).json({ message: 'Error creating payment', error: error.message });
    }
  };
  
  const cancelBookingController = async (req, res) => {
    const { bookingID } = req.query;  // Lấy `bookingID` từ query string
    console.log("Deleting booking for bookingID:", bookingID);
  
    // Kiểm tra nếu không có `bookingID`
    if (!bookingID) {
      return res.status(400).json({ message: 'Missing bookingID.' });
    }
  
    try {
      // Gọi hàm deleteBookingPayos để kiểm tra trạng thái thanh toán và xóa booking nếu cần
      const paymentStatus = await deleteBookingPayos(bookingID);
  
      // Kiểm tra nếu không phải trạng thái CANCELLED hoặc PENDING
      if (paymentStatus !== 'CANCELLED' && paymentStatus !== 'PENDING') {
        return res.status(400).json({
          message: `Booking with ID ${bookingID} cannot be deleted. Current payment status is ${paymentStatus}.`,
        });
      }
  
      return res.status(200).json({
        message: `Booking with ID ${bookingID} has been successfully deleted. Current payment status is ${paymentStatus}.`,
      });
  
    } catch (error) {
      console.error('Error deleting booking:', error.message);
  
      // Trả về lỗi nếu không thể xóa booking
      return res.status(500).json({
        message: 'Error deleting booking.',
        error: error.message || error.response || 'An unknown error occurred.',
      });
    }
  };
  const updatePaymentStatusController = async (req, res) => {
    const { bookingID } = req.query;

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
      const vndToUsdRate = data.conversion_rates.USD; // Đúng tỷ giá VND sang USD
  
      console.log(vndToUsdRate);
      console.log(vndAmount);
  
      // Tính số tiền USD
      const usdAmount = vndAmount * vndToUsdRate;

      console.log("Chuyển đổi sang USD:", usdAmount);
      return usdAmount;
    } catch (error) {
      console.error('Error converting VND to USD:', error);
      return null;
    }
  };
  const sendPaymentConfirmationController = async (req, res) => {
    try {
        const { FullName, BookingID, Amount, PaymentMethod, PaymentDate, Email } = req.body;
        
        // Kiểm tra các tham số yêu cầu có hợp lệ không
        if (!FullName || !BookingID || !Amount || !PaymentMethod || !PaymentDate || !Email) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields: FullName, BookingID, Amount, PaymentMethod, PaymentDate, Email.',
            });
        }

        // Chuẩn bị thông tin thanh toán
        const payment = {
            FullName,
            BookingID,
            Amount,
            PaymentMethod,
            PaymentDate,
            Email
        };
        // Gọi hàm gửi email
        await sendPaymentSuccessEmail(payment);
        
        return res.status(200).json({
            success: true,
            message: 'Payment confirmation email sent successfully.',
        });
    } catch (error) {
        console.error('Error in sendPaymentConfirmationController:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to send payment confirmation email.',
            error: error.message,
        });
    }
};

  
  module.exports = {convertVndToUsd, sendPaymentConfirmationController, createPaymentController, cancelBookingController, updatePaymentStatusController, savePaymentController };
  