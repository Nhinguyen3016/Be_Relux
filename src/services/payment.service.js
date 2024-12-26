const PayOS = require('@payos/node');
const sequelize = require("../sequelize");
require('dotenv').config();

// Khởi tạo PayOS client
const payOS = new PayOS(
  process.env.PAYOS_CLIENT_ID,
  process.env.PAYOS_API_KEY,
  process.env.PAYOS_CHECKSUM_KEY
);

// Hàm tạo link thanh toán
const createPaymentLink = async (orderDetails) => {
  const body = {
    orderCode: orderDetails.bookingID,
    amount: orderDetails.amount,
    description: orderDetails.description,
    items: orderDetails.items.map(item => ({
      ...item,
      price: parseFloat(item.price),
    })),
    returnUrl: orderDetails.returnUrl,
    cancelUrl: orderDetails.cancelUrl,
  };

  try {
    const paymentLinkResponse = await payOS.createPaymentLink(body);
    return paymentLinkResponse.checkoutUrl; // Trả về URL thanh toán
  } catch (error) {
    throw new Error('Error creating payment link: ' + error.message);
  }
};

// Lưu thông tin thanh toán vào bảng `payments`
const savePayment = async (bookingID, amount, paymentMethod, paymentStatus) => {
  try {
    const query = `
      INSERT INTO payments (BookingID, Amount, PaymentMethod, PaymentStatus, PaymentDate) 
      VALUES (:bookingID, :amount, :paymentMethod, :paymentStatus, NOW())
    `;

    const [result] = await sequelize.query(query, {
      replacements: {
        bookingID: bookingID || '',
        amount: amount,
        paymentMethod: paymentMethod,
        paymentStatus: paymentStatus,
      },
    });

    return result;
  } catch (error) {
    throw new Error('Error saving payment: ' + error.message);
  }
};

const checkPaymentStatus = async (orderCode) => {
    try {
      console.log("Checking payment status for orderCode:", orderCode);
  
      const paymentStatusResponse = await payOS.getPaymentLinkInformation(orderCode);
      
      // Log chi tiết phản hồi từ API
      console.log("Payment status response:", paymentStatusResponse);
  
      // Xử lý khi API không trả về status
      if (!paymentStatusResponse || !paymentStatusResponse.status) {
        console.error("No payment status found for orderCode:", orderCode);
        throw new Error('Mã thanh toán không tồn tại');
      }
  
      const paymentStatus = paymentStatusResponse.status;
      console.log("Payment status:", paymentStatus);
      return paymentStatus;
    } catch (error) {
      console.error("Error in checkPaymentStatus:", error.message);
      throw new Error('Error check payment status: ' + error.message);
    }
  };
  
  const updatePaymentStatus = async (orderCode) => {
    try {
      // Lấy trạng thái thanh toán từ PayOS
      const paymentStatusResponse = await payOS.getPaymentLinkInformation( orderCode );
      const paymentStatus = paymentStatusResponse.status;
  
      console.log("Payment status:", paymentStatus);
  
      // Cập nhật trạng thái thanh toán vào cơ sở dữ liệu
      const query = `
        UPDATE payments
        SET PaymentStatus = :paymentStatus
        WHERE BookingID = :orderCode
      `;
  
      // Thực thi câu truy vấn SQL với tham số
      await sequelize.query(query, {
        replacements: {
          paymentStatus,
          orderCode,
        },
      });
  
      return paymentStatus;
    } catch (error) {
      console.error('Error updating payment status:', error.message);
      throw new Error('Error updating payment status: ' + error.message);
    }
  };
  

module.exports = { createPaymentLink, savePayment, checkPaymentStatus, updatePaymentStatus };
