const chartDashboard = require("../../services/dashboard/chartDashboard.service");

class chartDashboardController {
    getBookings = async (req, res) => {
        const { month, year } = req.query;

        if (!month || !year) {
            return res.status(400).json({ error: 'Month and year are required' });
        }

        try {
            const count = await chartDashboard.getBookingCount(month, year);
            res.json({ count });
        } catch (error) {
            console.error('Error in getBookings:', error);
            res.status(500).json({ error: 'Failed to fetch bookings data' });
        }
    };    
    getRevenue = async (req, res) => {
        const { month, year } = req.query;

        if (!month || !year) {
            return res.status(400).json({ error: 'Month and year are required' });
        }
        try {
            const revenue = await chartDashboard.getRevenue(month, year);
            res.json({ revenue });
        } catch (error) {
            console.error('Error in getBookings:', error);
            res.status(500).json({ error: 'Failed to fetch bookings data' });
        }
    };  
};
module.exports= new chartDashboardController();