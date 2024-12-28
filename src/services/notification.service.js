const { Expo } = require("expo-server-sdk");
const sequelize = require("../sequelize");
const { QueryTypes } = require("sequelize");
const expo = new Expo();
const moment = require("moment-timezone");
const cron = require("node-cron");

// Helper function to fetch push tokens
const getPushTokens = async (userId) => {
  const tokenQuery = `
    SELECT pushToken
    FROM push_token
    WHERE userId = :userId;
  `;

  const tokens = await sequelize.query(tokenQuery, {
    replacements: { userId },
    type: QueryTypes.SELECT,
  });

  return tokens.map((token) => token.pushToken);
};

// Helper function to send push notifications
const sendPushNotification = async (pushTokens, message) => {
  try {
    const notifications = pushTokens
      .filter(Expo.isExpoPushToken)
      .map((pushToken) => ({
        to: pushToken,
        sound: "default",
        body: message,
        data: { message },
      }));

    const chunks = expo.chunkPushNotifications(notifications);
    await Promise.all(
      chunks.map((chunk) => expo.sendPushNotificationsAsync(chunk))
    );

    console.log("Push notifications sent successfully.");
  } catch (error) {
    console.error("Error sending push notification:", error);
    throw error;
  }
};

// Helper function to fetch upcoming bookings
const getUpcomingBookings = async (userId, currentTime) => {
  const bookingQuery = `
    SELECT b.BookingID AS bookingId, 
           s.Name AS serviceName, 
           b.BookingTime AS bookingTime, 
           b.CustomerID AS userId
    FROM Bookings b
    INNER JOIN BookingServices bs ON b.BookingID = bs.BookingID
    INNER JOIN Services s ON bs.ServiceID = s.ServiceID
    WHERE b.CustomerID = :userId
      AND b.BookingTime > :currentTime
      AND b.BookingTime <= DATE_ADD(:currentTime, INTERVAL 2 HOUR);
  `;

  return sequelize.query(bookingQuery, {
    replacements: { userId, currentTime },
    type: QueryTypes.SELECT,
  });
};

// API to send notifications for a specific user
const sendBookingNotification = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ error: "userId is required" });

    const currentTime = moment()
      .tz("Asia/Ho_Chi_Minh")
      .format("YYYY-MM-DD HH:mm:ss");
    const bookings = await getUpcomingBookings(userId, currentTime);

    if (!bookings.length) {
      return res
        .status(404)
        .json({ message: "No upcoming bookings found for this user" });
    }

    const pushTokens = await getPushTokens(userId);
    if (!pushTokens.length) {
      return res
        .status(404)
        .json({ message: "No push token found for this user" });
    }

    for (const booking of bookings) {
      const message = `Your booking for ${booking.serviceName} is coming up at ${booking.bookingTime}`;
      await sendPushNotification(pushTokens, message);
      console.log(`Notification sent for bookingId ${booking.bookingId}`);
    }

    res.status(200).json({
      message: "Notifications sent successfully",
      data: bookings.map((booking) => ({
        bookingId: booking.bookingId,
        serviceName: booking.serviceName,
        bookingTime: booking.bookingTime,
      })),
    });
  } catch (error) {
    console.error("Error in sendBookingNotification:", error);
    res.status(500).json({ error: "Failed to send notification" });
  }
};

// Cron job to send notifications every 5 seconds
cron.schedule("*/5 * * * * *", async () => {
  // console.log("Cron job is running at:", new Date());

  try {
    const currentTime = moment()
      .tz("Asia/Ho_Chi_Minh")
      .format("YYYY-MM-DD HH:mm:ss");

    const bookingQuery = `
      SELECT b.BookingID AS bookingId, 
             s.Name AS serviceName, 
             b.BookingTime AS bookingTime, 
             b.CustomerID AS userId
      FROM Bookings b
      INNER JOIN BookingServices bs ON b.BookingID = bs.BookingID
      INNER JOIN Services s ON bs.ServiceID = s.ServiceID
      WHERE b.BookingTime > :currentTime
        AND b.BookingTime <= DATE_ADD(:currentTime, INTERVAL 2 HOUR);
    `;

    const bookings = await sequelize.query(bookingQuery, {
      replacements: { currentTime },
      type: QueryTypes.SELECT,
    });

    if (!bookings.length) {
      // console.log("No upcoming bookings found within 2 hours.");
      return;
    }

    for (const booking of bookings) {
      const pushTokens = await getPushTokens(booking.userId);
      if (!pushTokens.length) {
        console.log(`No push token found for userId ${booking.userId}`);
        continue;
      }

      const message = `Your booking for ${booking.serviceName} is coming up at ${booking.bookingTime}`;
      await sendPushNotification(pushTokens, message);
      console.log(`Notification sent for bookingId ${booking.bookingId}`);
    }
  } catch (error) {
    console.error("Error in cron job:", error);
  }
});

module.exports = { sendBookingNotification };
