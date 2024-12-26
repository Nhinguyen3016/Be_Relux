const bookingDashboardServices = require("../../services/dashboard/booking.service");


class bookingDashboardController {
    getStaticBooking = async (req, res) => {
        try {
            const serviceQuantities = await bookingDashboardServices.getServiceQuantity();
            console.log("Service quantities from controller:", serviceQuantities);

            if (!serviceQuantities || serviceQuantities.length === 0) {
                return res.status(404).json({ message: "No data found." });
            }

            res.status(200).json({
                serviceQuantities: serviceQuantities
            });
        } catch (err) {
            console.error("Error fetching static bookings:", err);
            res.status(500).json({ message: "Internal Server Error" });
        }
    };

    getServiceBookingPending = async(req, res) => {
        try{
            const serviceBookingPending = await bookingDashboardServices.getServiceBookingPending();

            res.status(200).json({
                serviceBookingPending
            });
        } catch (err) {
            res.status(500).json({ message: "Internal Server Error" });
        }
    };
    getServiceBookingInProgress = async(req, res) => {
        try{
            const serviceBookingInProgress = await bookingDashboardServices.getServiceBookingInProgress();

            res.status(200).json({
                serviceBookingInProgress
            });
        } catch (err) {
            res.status(500).json({ message: "Internal Server Error" });
        }
    };
    getServiceBookingCompleted = async(req, res) => {
        try{
            const serviceBookingCompleted = await bookingDashboardServices.getServiceBookingCompleted();

            res.status(200).json({
                serviceBookingCompleted
            });
        } catch (err) {
            res.status(500).json({ message: "Internal Server Error" });
        }
    };
}

module.exports = new bookingDashboardController();