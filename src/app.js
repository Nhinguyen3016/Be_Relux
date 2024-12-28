const express = require("express");
const { responseErr } = require("./app-error");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const compression = require("compression");
const morgan = require("morgan");

require("dotenv").config();
app.use(morgan("dev"));
app.use(compression());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const userRoutes = require("./routes/user.route");
const locationRoutes = require("./routes/location.route");
const promotionRoutes = require("./routes/promotion.route");
const serviceCategoryRoutes = require("./routes/serviceCategory.route");
const serviceRoutes = require("./routes/service.route");
const workScheduleRoutes = require("./routes/workSchedule.route");
const employeeRoutes = require("./routes/employee.route");
const resetPasswordRoutes = require("./routes/resetPassword.route");
const contactRoutes = require("./routes/contact.route");
const bookingRoutes = require("./routes/booking.route");

const paymentRoutes = require("./routes/payment.router");

const bookingDashboardRouter = require("./routes/dashboard/booking.router");
const schedulesDashboardRouter = require("./routes/dashboard/schedules.router");
const dashboardDashboardRouter = require("./routes/dashboard/dashboard.router");
const promotionDashboardRouter = require("./routes/dashboard/promotion-dashboard.router");
const serviceCategoryDashboardRouter = require("./routes/dashboard/serviceCategoryDashboard.router");
const serviceDashboardRouter = require("./routes/dashboard/serviceDashboard.router");
const accountListDashboardRouter = require("./routes/dashboard/accountList.router");
const chartDashboardRouter = require("./routes/dashboard/chartDashboard.router");
const staffDashboardRouter = require("./routes/dashboard/staff.router");
const contactDashboardRouter = require("./routes/dashboard/contact-dashboard.router");
//app
const notificationRoutes = require("./routes/notification.route");
const loc = require("./routes/loc.route");

app.use("/v1", userRoutes);
app.use("/v1/locations", locationRoutes);
app.use("/v1/promotions", promotionRoutes);
app.use("/v1/service-categories", serviceCategoryRoutes);
app.use("/v1/services", serviceRoutes);
app.use("/v1/work-schedules", workScheduleRoutes);
app.use("/v1/employees", employeeRoutes);
app.use("/v1/password", resetPasswordRoutes);
app.use("/v1/contacts", contactRoutes);
app.use("/v1/bookings", bookingRoutes);

app.use("/v1/payment", paymentRoutes);

//Dashboard
app.use("/dashboard", dashboardDashboardRouter);
app.use("/dashboard/booking", bookingDashboardRouter);
app.use("/dashboard/schedules", schedulesDashboardRouter);
app.use("/dashboard/promotion", promotionDashboardRouter);
app.use("/dashboard/servicecategory", serviceCategoryDashboardRouter);
app.use("/dashboard/services", serviceDashboardRouter);
app.use("/dashboard/accountlist", accountListDashboardRouter);
app.use("/dashboard/chart", chartDashboardRouter);
app.use("/dashboard/staff", staffDashboardRouter);
app.use("/dashboard/contact", contactDashboardRouter);

//app
app.use("/v1/notification", notificationRoutes);
app.use("/v1/loc", loc);
app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});
app.use((err, req, res, next) => {
  responseErr(err, res);
});

module.exports = app;
