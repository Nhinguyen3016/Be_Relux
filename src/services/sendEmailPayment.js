const moment = require('moment-timezone');

const { sendEmail } = require('../utils/mail');

const sendPaymentSuccessEmail = async (payment) => {
  try {
    console.log("Preparing to send email to:", payment.Email);
    
    // Kiểm tra các thuộc tính cần thiết
    if (!payment || !payment.FullName || !payment.BookingID || !payment.Amount || !payment.PaymentMethod || !payment.PaymentDate 
      || !payment.Email || !payment.ServiceName || !payment.BookingTime || !payment.EndTime) {
      console.error('Missing required payment details:', payment);
      throw new Error('Missing required payment details');
    }
    const bookingTime = moment.tz(payment.BookingTime, 'Asia/Ho_Chi_Minh').utc().format('YYYY-MM-DD HH:mm:ss');
    const endTime = moment.tz(payment.EndTime, 'Asia/Ho_Chi_Minh').utc().format('YYYY-MM-DD HH:mm:ss');
    const paymentDate = moment.tz(payment.PaymentDate, 'Asia/Ho_Chi_Minh').utc().format('YYYY-MM-DD HH:mm:ss');

    console.log('Converted Booking Time:', bookingTime);
    console.log('Converted End Time:', endTime);
    console.log('Converted Payment Date:', paymentDate);

    // Tạo nội dung email HTML
    const emailHtml = `
      <p>Hello <strong>${payment.FullName}</strong>,</p>
      <p>Your payment for booking ID: <strong>${payment.BookingID}</strong> has been successfully completed.</p>
      <p>Service Name: <strong>${payment.ServiceName}</strong></p>
      <p>Booking Time: <strong>${bookingTime}</strong></p>
      <p>Booking End: <strong>${endTime}</strong></p>
      <p><strong>Amount:</strong> $${payment.Amount}</p>
      <p><strong>Payment Date:</strong> ${paymentDate}</p>
      <p>Thank you for your payment!</p>
      <p>Best regards,<br>Your Company Name</p>
    `;
    const subject = `Payment Confirmation for User ${payment.FullName} with the Booking ID ${payment.BookingID}`;
    const text = `Hello ${payment.FullName},\n
                  Your payment for booking ID: ${payment.BookingID} has been successfully completed.\n
                  Service Name: ${payment.ServiceName}\n
                  Booking Time: ${bookingTime}\n
                  Booking End: ${endTime}\n
                  Amount: $${payment.Amount}\n
                  Payment Date: ${paymentDate}\n
                  Thank you for your payment!\n
                  Best regards,\nYour Company Name
    `;
    // Gửi email xác nhận thanh toán
    await sendEmail(payment.Email, subject, text, emailHtml);
    console.log('Payment confirmation email sent successfully.');
  } catch (error) {
    console.error('Error sending payment email:', error);
  }
};

module.exports = { sendPaymentSuccessEmail };
