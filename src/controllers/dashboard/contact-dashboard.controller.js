const contactDashboardServices = require("../../services/dashboard/contact-dashboard.service");


class contactDashboardController {
    getContact = async (req, res) => {
        try {
            const contact = await contactDashboardServices.getContact();
            console.log("Service quantities from controller:", contact);

            if (!contact || contact.length === 0) {
                return res.status(404).json({ message: "No data found." });
            }

            res.status(200).json({
                contact
            });
        } catch (err) {
            console.error("Error fetching static bookings:", err);
            res.status(500).json({ message: "Internal Server Error" });
        }
    };
}

module.exports = new contactDashboardController();