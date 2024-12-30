const { DataTypes, Model } = require("sequelize");

class PushToken extends Model {
  static associate(models) {
    // Liên kết PushToken với Booking
    this.hasOne(models.Booking, {
      foreignKey: "CustomerID", // Khóa ngoại trong bảng Booking
      sourceKey: "userId", // Khóa chính trong bảng PushToken
      as: "booking", // Alias để sử dụng trong include
    });
  }
}

const modelName = "PushToken";

module.exports = (sequelize) =>
  PushToken.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "userId",
      },
      pushToken: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        field: "pushToken",
      },
    },
    {
      sequelize,
      tableName: "push_token",
      modelName,
      timestamps: true, // Bật timestamps để tự động quản lý `createdAt` và `updatedAt`
      updatedAt: false, // Nếu không cần `updatedAt`, bạn có thể tắt nó
    }
  );
