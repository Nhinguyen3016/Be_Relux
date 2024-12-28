const { Model, DataTypes } = require("sequelize");

class Service extends Model {
  static associate(models) {
    // Liên kết Service với BookingService
    this.hasMany(models.BookingService, {
      foreignKey: "serviceId", // Khóa ngoại trong bảng BookingServices
      as: "bookingServices", // Alias
    });
  }
}

const modelName = "Service";

module.exports = (sequelize) => {
  Service.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "ServiceID",
      },
      name: {
        type: DataTypes.STRING(255),
        field: "Name",
      },
      price: {
        type: DataTypes.DECIMAL,
        field: "Price",
      },
      descriptionShort: {
        type: DataTypes.TEXT,
        field: "DescriptionShort",
      },
      description1: {
        type: DataTypes.TEXT,
        field: "Description1",
      },
      imageDescription: {
        type: DataTypes.STRING(255),
        field: "ImageDescription",
      },
      description2: {
        type: DataTypes.TEXT,
        field: "Description2",
      },
      imageMain: {
        type: DataTypes.STRING(255),
        field: "ImageMain",
      },
      imageIcon: {
        type: DataTypes.STRING(255),
        field: "Image_icon",
      },
      duration: {
        type: DataTypes.INTEGER,
        field: "Duration",
      },
    },
    {
      sequelize,
      modelName,
      tableName: "Services",
      timestamps: false,
    }
  );

  return Service;
};
