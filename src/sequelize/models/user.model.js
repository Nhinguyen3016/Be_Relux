const { DataTypes, Model } = require("sequelize");

class UserPersistence extends Model {}

const modelName = "User";

module.exports = (sequelize) => {
  UserPersistence.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "UserID",
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING(255),
        field: "Username",
      },
      passwordHash: {
        type: DataTypes.STRING(255),
        field: "PasswordHash",
      },
      roleId: {
        type: DataTypes.INTEGER,
        field: "RoleID",
      },
      email: {
        type: DataTypes.STRING(255),
        field: "Email",
      },
      phone: {
        type: DataTypes.STRING(255),
        field: "Phone",
      },
      fullName: {
        type: DataTypes.STRING(255),
        field: "FullName",
      },
      avatar: {
        type: DataTypes.STRING(255),
        field: "Avatar",
      },
      bookingCount: {
        type: DataTypes.INTEGER,
        field: "BookingCount",
      },
      employeeID: {  // Thêm trường EmployeeID vào mô hình
        type: DataTypes.INTEGER,
        field: "EmployeeID",
        allowNull: true,  // Trường EmployeeID có thể null vì không phải người dùng nào cũng có
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        field: "IsActive",
        defaultValue: false,
      },
    },
    {
      sequelize,
      tableName: "users",
      modelName,
      timestamps: false,
    }
  );
};