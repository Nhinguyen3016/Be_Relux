const PayOS = require('@payos/node');
const sequelize = require("../sequelize");
const {sendPaymentSuccessEmail} = require("./sendEmailPayment")
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

  const updatePaymentStatus = async (orderCode) => {
      try {
          // Lấy trạng thái thanh toán từ PayOS
          const paymentStatusResponse = await payOS.getPaymentLinkInformation(orderCode);
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
  
          // Kiểm tra nếu trạng thái thanh toán là "Paid", gửi email
          if (paymentStatus === "PAID") {
            console.log("Payment status is PAID, processing...");
              const paymentQuery = `
                  SELECT p.PaymentID, p.BookingID, p.Amount, p.PaymentDate, p.PaymentMethod,
                  u.FullName, u.Email,s.Name AS ServiceName, s.price, b.BookingTime, b.EndTime, l.Address
                  FROM payments p
                  JOIN bookings b ON p.BookingID = b.BookingID
                  JOIN users u ON b.CustomerID = u.UserID
                  JOIN  bookingservices bs ON bs.BookingID = b.BookingID			
                  JOIN services s ON bs.ServiceID = s.ServiceID
                  JOIN locations l ON l.LocationID = b.LocationID
                  WHERE p.BookingID = :orderCode
              `;
              console.log("Executing SQL query for orderCode:", orderCode);
              const [payment] = await sequelize.query(paymentQuery, {
                  replacements: { orderCode },
                  type: sequelize.QueryTypes.SELECT,
              });
              if (payment) {
                console.log("Sending email to:", payment.Email);
                  // Gửi email xác nhận thanh toán
                  await sendPaymentSuccessEmail(payment);
              } else {
                  console.error('Payment not found for order code:', orderCode);
              }
          }
  
          return paymentStatus;
      } catch (error) {
          console.error('Error updating payment status:', error.message);
          throw new Error('Error updating payment status: ' + error.message);
      }
  };

const deleteBookingPayos = async (orderCode) => {
  try {
    console.log("Checking payment status for orderCode:", orderCode);


    const paymentStatusResponse = await payOS.getPaymentLinkInformation(orderCode);
    

    console.log("Payment status response:", paymentStatusResponse);

    const query = `
      SELECT PaymentMethod
      FROM payments
      WHERE BookingID=:orderCode;
    `;

  // Thay đổi cách thực hiện truy vấn
    const results = await sequelize.query(query, {
        type: sequelize.QueryTypes.SELECT,
        raw: true,
    });
    const PaymentMethod = results;
    if (!paymentStatusResponse || !paymentStatusResponse.status) {
      console.error("No payment status found for orderCode:", orderCode);
      throw new Error('Mã thanh toán không tồn tại');
    }
    const paymentStatus = paymentStatusResponse.status;
    console.log("Payment status:", paymentStatus);
    // if{PaymentMethod==="PayOS"}{
      if (paymentStatus === 'CANCELLED' || paymentStatus === 'PENDING') {
        const bookingID = paymentStatusResponse.orderCode;  // Lấy BookingID từ phản hồi API
        await removeBookingAndServices(bookingID);  // Xóa booking và dịch vụ liên quan
        console.log(`BookingID: ${bookingID} has been cancelled and services have been removed.`);
      }
    // }
    // Kiểm tra nếu trạng thái thanh toán là "CANCELLED", xóa booking và dịch vụ
    

    return paymentStatus;
  } catch (error) {
    console.error("Error in deleteBooking:", error.message);
    throw new Error('Error checking payment status: ' + error.message);
  }
};

// Hàm xóa dịch vụ và booking khỏi bảng bookingservices, bookings và payments
const removeBookingAndServices = async (bookingID) => {
  try {
    // Bắt đầu giao dịch (transaction)
    const transaction = await sequelize.transaction();

    // Xóa dịch vụ liên quan trong bảng `BookingService`
    await sequelize.query(
      'DELETE FROM bookingservices WHERE BookingID = :bookingID',
      {
        replacements: { bookingID },
        transaction,
      }
    );
    console.log(`Services for BookingID: ${bookingID} have been removed.`);

    // Xóa thanh toán trong bảng `Payment`
    await sequelize.query(
      'DELETE FROM payments WHERE BookingID = :bookingID',
      {
        replacements: { bookingID },
        transaction,
      }
    );
    console.log(`Payment record for BookingID: ${bookingID} has been removed.`);

    // Xóa booking khỏi bảng `Booking`
    await sequelize.query(
      'DELETE FROM bookings WHERE BookingID = :bookingID',
      {
        replacements: { bookingID },
        transaction,
      }
    );
    console.log(`BookingID: ${bookingID} has been removed from bookings.`);

    // Commit giao dịch
    await transaction.commit();
    console.log(`Successfully cancelled booking and removed associated services and payments for BookingID: ${bookingID}.`);
  } catch (error) {
    // Rollback nếu có lỗi
    await transaction.rollback();
    console.error("Error removing booking and services:", error.message);
    throw new Error("Failed to remove booking and services.");
  }
};


module.exports = { createPaymentLink, savePayment, deleteBookingPayos, updatePaymentStatus };
