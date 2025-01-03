const { Sequelize } = require("sequelize");
const { applySetup } = require("./setup");

const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  dialect: "mysql",
  pool: {
    max: 20,
    min: 2,
    acquire: 30000,
    idle: 60000,
  },
  logging: false,
});

const modelDefiners = [
  require("./models/location.model"),
  require("./models/role.model"),
  require("./models/service.model"),
  require("./models/user.model"),
  require("./models/serviceCategory.model"),
  require("./models/workSchedule.model"),
  require("./models/promotion.model"),

  require("./models/employee.model"),
  require("./models/otp.model"),
  require("./models/booking.model"),
  require("./models/bookingService.model"),
  require("./models/employeeWorkSchedule.model"),
  require("./models/accountToken.model"),
  require("./models/contact.model"),
  require("./models/notification.model"),
  require("./models/payment.model"),
  require("./models/transaction.model"),
];

for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize);
}
// Object.keys(sequelize.models).forEach((modelName) => {
//   if (sequelize.models[modelName].associate) {
//     sequelize.models[modelName].associate(sequelize.models);
//   }
// });
applySetup(sequelize);

module.exports = sequelize;