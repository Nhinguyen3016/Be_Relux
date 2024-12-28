const { DataTypes, Model } = require("sequelize");

class BookingServicePersistence extends Model {
  static associate(models) {
    // Liên kết BookingService với Booking
    this.belongsTo(models.Booking, {
      foreignKey: "bookingId", // Khóa ngoại trong bảng BookingServices
      as: "booking", // Alias
    });

    // Liên kết BookingService với Service
    this.belongsTo(models.Service, {
      foreignKey: "serviceId", // Khóa ngoại trong bảng BookingServices
      as: "service", // Alias
    });
  }
}

const modelName = "BookingService";

module.exports = (sequelize) => {
  BookingServicePersistence.init(
    {
      bookingId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        field: "BookingID",
        references: {
          model: "Bookings",
          key: "BookingID",
        },
      },
      serviceId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        field: "ServiceID",
        references: {
          model: "Services",
          key: "ServiceID",
        },
      },
    },
    {
      sequelize,
      tableName: "BookingServices",
      modelName,
      timestamps: false,
    }
  );
};
