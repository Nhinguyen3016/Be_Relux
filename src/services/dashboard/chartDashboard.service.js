const sequelize = require("../../sequelize");

class chartDashboard {
    getBookingCount = async (month, year) => {
        try {
            const query = `
                SELECT COUNT(*) AS count
                FROM bookings
                WHERE MONTH(BookingTime) = :month
                AND YEAR(BookingTime) = :year
            `;
    
            const results = await sequelize.query(query, {
                replacements: { month, year },
                type: sequelize.QueryTypes.SELECT,
            });
    
            return results[0]?.count || 0; 
        } catch (error) {
            console.error('Error in getBookingCount:', error);
            throw error;
        }
    };
    getRevenue = async (month, year) => {
        try {
            const query = `
                SELECT SUM(Amount) AS Revenue
                FROM payments 
                WHERE MONTH(PaymentDate) = :month
                AND YEAR(PaymentDate) = :year
            `;
    
            const results = await sequelize.query(query, {
                replacements: { month, year },
                type: sequelize.QueryTypes.SELECT,
            });
    
            return results[0]?.Revenue || 0; 
        } catch (error) {
            console.error('Error in getRevenue:', error);
            throw error;
        }
    };

};

module.exports = new chartDashboard();
