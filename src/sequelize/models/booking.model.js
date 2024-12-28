const { DataTypes, Model } = require("sequelize");

class BookingPersistence extends Model {
  static associate(models) {
    this.belongsTo(models.PushToken, {
      foreignKey: "CustomerID", // Khóa ngoại trong bảng Booking
      targetKey: "userId", // Khóa chính trong bảng PushToken
      as: "pushToken", // Alias để sử dụng trong include
    });
    // Liên kết Booking với BookingService
    this.hasMany(models.BookingService, {
      foreignKey: "bookingId", // Khóa ngoại trong bảng BookingServices
      as: "bookingServices", // Alias để sử dụng trong include
    });
  }
}

const modelName = "Booking";

module.exports = (sequelize) =>
  BookingPersistence.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "BookingID",
      },
      bookingTime: {
        type: DataTypes.DATE,
        field: "BookingTime",
      },
      bookingNotes: {
        type: DataTypes.TEXT,
        field: "BookingNotes",
      },
      endTime: {
        type: DataTypes.DATE,
        field: "EndTime",
      },
    },
    {
      sequelize,
      tableName: "Bookings",
      modelName,
      timestamps: false,
    }
  );
