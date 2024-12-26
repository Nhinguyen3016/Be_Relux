const { DataTypes, Model } = require("sequelize");

class Payment extends Model {}

const modelName = "Payment";

module.exports = (sequelize) => {
  Payment.init(
    {
      PaymentID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      BookingID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "bookings", // Tên bảng liên kết
          key: "BookingID",
        },
        onUpdate: "RESTRICT",
        onDelete: "RESTRICT",
      },
      Amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      PaymentDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      PaymentMethod: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      PaymentStatus: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "payments",
      modelName,
      timestamps: false,
    }
  );

  return Payment;
};
