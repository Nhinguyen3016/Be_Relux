const bookingEmployeesDashboardServices = require("../../services/dashboard/booking-employees.service");


class bookingDashboardController {
    getStaticBookingController = async (req, res) => {
        try {
            console.log("Received query:", req.query);
            // Lấy employeesID từ query hoặc body của request
            const { employeesID } = req.query; // Hoặc req.body nếu bạn gửi qua body
    
            // Kiểm tra xem employeesID có được truyền vào không
            if (!employeesID) {
                return res.status(400).json({ message: "EmployeeID is required" });
            }
    
            // Gọi getServiceQuantity với employeesID
            const serviceQuantities = await bookingEmployeesDashboardServices.getServiceQuantity(employeesID);
    
            console.log("Service quantities from controller:", serviceQuantities);
    
            if (!serviceQuantities || serviceQuantities.length === 0) {
                return res.status(404).json({ message: "No data found." });
            }
    
            // Trả về kết quả
            res.status(200).json({
                serviceQuantities: serviceQuantities
            });
        } catch (err) {
            console.error("Error fetching static bookings:", err);
            res.status(500).json({ message: "Internal Server Error" });
        }
    };
    getServiceBookingPendingController = async (req, res) => {
        try {
            const { employeesID } = req.query; // Lấy employeesID từ query parameters
    
            if (!employeesID) {
                return res.status(400).json({ message: "EmployeeID is required" });
            }
    
            const serviceBookingPending = await bookingEmployeesDashboardServices.getServiceBookingPending(employeesID);
    
            res.status(200).json({
                serviceBookingPending
            });
        } catch (err) {
            console.error("Error fetching service booking pending:", err);
            res.status(500).json({ message: "Internal Server Error" });
        }
    };
    
    getServiceBookingInProgressController = async (req, res) => {
        try {
            const { employeesID } = req.query; // Lấy employeesID từ query parameters
    
            if (!employeesID) {
                return res.status(400).json({ message: "EmployeeID is required" });
            }
    
            const serviceBookingInProgress = await bookingEmployeesDashboardServices.getServiceBookingInProgress(employeesID);
    
            res.status(200).json({
                serviceBookingInProgress
            });
        } catch (err) {
            console.error("Error fetching service booking in progress:", err);
            res.status(500).json({ message: "Internal Server Error" });
        }
    };
    getServiceBookingCompletedController = async (req, res) => {
        try {
            const { employeesID } = req.query; // Lấy employeesID từ query parameters
    
            if (!employeesID) {
                return res.status(400).json({ message: "EmployeeID is required" });
            }
    
            const serviceBookingCompleted = await bookingEmployeesDashboardServices.getServiceBookingCompleted(employeesID);
    
            res.status(200).json({
                serviceBookingCompleted
            });
        } catch (err) {
            console.error("Error fetching service booking completed:", err);
            res.status(500).json({ message: "Internal Server Error" });
        }
    };
    
    
}

module.exports = new bookingDashboardController();