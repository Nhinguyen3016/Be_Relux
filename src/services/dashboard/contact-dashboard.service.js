const sequelize = require("../../sequelize");

class ContactDashboard {
    getContact = async () => {
        try {
            const query = `
                SELECT 
                    CustomerName,
                    Email,
                    Message
                FROM contact
            `;
            
            const results = await sequelize.query(query, {
                type: sequelize.QueryTypes.SELECT,
                raw: true,
            });

            return results;
        } catch (err) {
            console.error("Error fetching account:", err);
            throw err;
        }
    };

}

module.exports = new ContactDashboard();