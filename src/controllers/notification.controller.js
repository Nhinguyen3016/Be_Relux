const sequelize = require("../sequelize");
const { PushToken, Booking, BookingService, Service } = sequelize.models;
const { Expo } = require("expo-server-sdk");
const expo = new Expo();
const { Op } = require("sequelize");
const moment = require("moment-timezone");

const savePushToken = async (req, res) => {
  try {
    const { userId, pushToken } = req.body;

    if (!userId || !pushToken) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const existingToken = await PushToken.findOne({
      where: { userId, pushToken },
    });

    if (existingToken) {
      return res
        .status(400)
        .json({ message: "Push token already exists for this user" });
    }

    const newToken = await PushToken.create({ userId, pushToken });

    res.status(201).json({
      message: "Push token saved successfully",
      pushTokenId: newToken.id,
    });
  } catch (error) {
    console.error("Error in savePushToken function:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// const sendPushNotification = async (pushTokens, message) => {
//   try {
//     const notifications = pushTokens
//       .map((pushToken) => {
//         if (!Expo.isExpoPushToken(pushToken)) {
//           console.warn(`Invalid push token: ${pushToken}`);
//           return null;
//         }
//         return {
//           to: pushToken,
//           sound: "default",
//           body: message,
//           data: { message },
//         };
//       })
//       .filter(Boolean); // Loại bỏ các pushToken không hợp lệ

//     const chunks = expo.chunkPushNotifications(notifications);
//     const tickets = await Promise.all(
//       chunks.map((chunk) => expo.sendPushNotificationsAsync(chunk))
//     );

//     console.log("Push notification tickets:", tickets);
//   } catch (error) {
//     console.error("Error sending push notification:", error);
//     throw error;
//   }
// };

// // Hàm gửi thông báo booking
// const sendBookingNotification = async (req, res) => {
//   const { userId, pushToken } = req.body;

//   if (!userId || !pushToken) {
//     return res.status(400).json({ error: "userId and pushToken are required" });
//   }

//   if (!Expo.isExpoPushToken(pushToken)) {
//     return res.status(400).json({ error: "Invalid push token format" });
//   }

//   try {
//     const currentTime = moment().tz("Asia/Ho_Chi_Minh").toDate();
//     const twoHoursLater = moment()
//       .tz("Asia/Ho_Chi_Minh")
//       .add(2, "hours")
//       .toDate();

//     console.log("Current time (local UTC+7):", currentTime);
//     console.log("Filter range (local UTC+7):", {
//       start: currentTime,
//       end: twoHoursLater,
//     });

//     const bookings = await Booking.findAll({
//       where: {
//         CustomerID: userId,
//         EndTime: {
//           [Op.gt]: currentTime,
//           [Op.lte]: twoHoursLater,
//         },
//       },
//       include: [
//         {
//           model: BookingService,
//           as: "bookingServices",
//           include: [
//             {
//               model: Service,
//               as: "service",
//               attributes: ["Name"],
//             },
//           ],
//         },
//       ],
//     });

//     if (!bookings || bookings.length === 0) {
//       console.log(
//         `No bookings found for userId ${userId} in the given time range.`
//       );
//       return res
//         .status(404)
//         .json({ message: "No upcoming bookings found for this user" });
//     }

//     for (const booking of bookings) {
//       const serviceNames = booking.bookingServices
//         .map((bs) => bs.service?.Name)
//         .filter(Boolean);

//       if (serviceNames.length === 0) continue;

//       const message = `Your booking for ${serviceNames.join(
//         ", "
//       )} is ending in 2 hours!`;

//       try {
//         await sendPushNotification([pushToken], message);
//         console.log(`Notification sent to userId ${userId}`);
//       } catch (pushError) {
//         console.error("Error sending notification:", pushError);
//       }
//     }

//     return res.status(200).json({
//       message: "Notifications sent successfully",
//       data: bookings.map((booking) => ({
//         bookingId: booking.id,
//         endTime: booking.EndTime,
//         services: booking.bookingServices
//           .map((bs) => bs.service?.Name)
//           .filter(Boolean),
//       })),
//     });
//   } catch (error) {
//     console.error("Error in sendBookingNotification:", error);
//     return res.status(500).json({ error: "Failed to send notification" });
//   }
// };

module.exports = { savePushToken };
