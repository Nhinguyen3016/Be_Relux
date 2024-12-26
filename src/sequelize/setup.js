function applySetup(sequelize) {
  const {
    Service,
    ServiceCategory,
    Promotion,
    WorkSchedule,
    Role,
    Location,
    Employee,
    Booking,
    EmployeeWorkSchedule,
    Otp,
    PasswordResetToken,
    User,
    BookingService,
    Payment,
    Transaction,
  } = sequelize.models;

  // Service & ServiceCategory relationship
  Service.belongsTo(ServiceCategory, {
    foreignKey: "categoryId",
    targetKey: "id",
    field: "CategoryID",
    as: "category",
  });
  ServiceCategory.hasMany(Service, {
    foreignKey: "categoryId",
    sourceKey: "id",
    field: "CategoryID",
    as: "services",
  });

  // Service & Promotion relationship
  Service.belongsTo(Promotion, {
    foreignKey: "promotionId",
    targetKey: "id",
    field: "PromotionID",
    as: "promotion",
  });
  Promotion.hasMany(Service, {
    foreignKey: "promotionId",
    sourceKey: "id",
    field: "PromotionID",
    as: "services",
  });

  // Employee & WorkSchedule relationship
  Employee.belongsToMany(WorkSchedule, {
    through: EmployeeWorkSchedule,
    foreignKey: "employeeId",
    otherKey: "workScheduleId",
    as: "workSchedules",
  });
  WorkSchedule.belongsToMany(Employee, {
    through: EmployeeWorkSchedule,
    foreignKey: "workScheduleId",
    otherKey: "employeeId",
    as: "employees",
  });

  // Booking & Location relationship
  Booking.belongsTo(Location, {
    foreignKey: "locationId",
    targetKey: "id",
    field: "LocationID",
    as: "location",
  });
  Location.hasMany(Booking, {
    foreignKey: "locationId",
    sourceKey: "id",
    field: "LocationID",
    as: "bookings",
  });

  // Booking & Employee relationship
  Booking.belongsTo(Employee, {
    foreignKey: "employeeId",
    targetKey: "id",
    field: "EmployeeID",
    as: "employee",
  });
  Employee.hasMany(Booking, {
    foreignKey: "employeeId",
    sourceKey: "id",
    field: "EmployeeID",
    as: "bookings",
  });

  // Booking & Customer relationship
  Booking.belongsTo(User, {
    foreignKey: "customerId",
    targetKey: "id",
    field: "CustomerID",
    as: "customer",
  });
  User.hasMany(Booking, {
    foreignKey: "customerId",
    sourceKey: "id",
    field: "CustomerID",
    as: "bookings",
  });

  // Booking & Service relationship
  Booking.belongsToMany(Service, {
    through: BookingService,
    foreignKey: "bookingId",
    otherKey: "serviceId",
    as: "services",
  });
  Service.belongsToMany(Booking, {
    through: BookingService,
    foreignKey: "serviceId",
    otherKey: "bookingId",
    as: "bookings",
  });

  // User & PasswordResetToken relationship
  User.hasMany(PasswordResetToken, {
    foreignKey: "userId",
    targetKey: "id",
    field: "UserID",
    as: "passwordResetTokens",
  });
  PasswordResetToken.belongsTo(User, {
    foreignKey: "userId",
    targetKey: "id",
    field: "UserID",
    as: "user",
  });

  // Employee & Location relationship
  Employee.belongsTo(Location, {
    foreignKey: "locationId",
    targetKey: "id",
    field: "LocationID",
    as: "location",
  });
  Location.hasMany(Employee, {
    foreignKey: "locationId",
    sourceKey: "id",
    field: "LocationID",
    as: "employees",
  });

  // BookingService & Booking relationship
  BookingService.belongsTo(Booking, {
    foreignKey: "bookingId",  // bookingId trong BookingService model
    targetKey: "id",          // 'id' trong Booking model
    as: "booking",            // Định nghĩa bí danh
  });
  Booking.hasMany(BookingService, {
    foreignKey: "bookingId",  // bookingId trong BookingService model
    sourceKey: "id",          // 'id' trong Booking model
    as: "bookingServices",    // Định nghĩa bí danh
  });

  // BookingService & Service relationship
  BookingService.belongsTo(Service, {
    foreignKey: "serviceId",  // serviceId trong BookingService model
    targetKey: "id",          // 'id' trong Service model
    as: "service",
  });
  Service.hasMany(BookingService, {
    foreignKey: "serviceId",  // serviceId trong BookingService model
    sourceKey: "id",          // 'id' trong Service model
    as: "bookingServices",
  });

  // Payment & Transaction relationship
  Payment.hasMany(Transaction, {
    foreignKey: "PaymentID", // Transaction liên kết qua PaymentID
    as: "transactions",
  });
  Transaction.belongsTo(Payment, {
    foreignKey: "PaymentID", // Transaction tham chiếu PaymentID
    as: "payment",
  });
}

module.exports = { applySetup };
