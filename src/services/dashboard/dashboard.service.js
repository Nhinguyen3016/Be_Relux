const sequelize = require("../../sequelize");

class dashboardDashboard {
    getFullName = async(username) =>{
        try{
            const query = `SELECT FullName FROM users WHERE Username = :username`;
            
            const results = await sequelize.query(query, {
                replacements: { username },
                type: sequelize.QueryTypes.SELECT,
                raw: true
            });
            return results;
        }catch (err) {
            console.log(err);
            throw err;
        }
    };
    countBooking = async() =>{
        try{
            const query = `SELECT COUNT(*) AS totalBookings FROM Bookings`;
            
            const results = await sequelize.query(query, {
                type: sequelize.QueryTypes.SELECT,
                raw: true,
            });
            return results;
        }catch (err) {
            console.log(err);
            throw err;
        }
    };

    countStaff = async() =>{
        try{
            const query = `SELECT COUNT(*) AS totalStaff FROM employees`;
            
            const results = await sequelize.query(query, {
                type: sequelize.QueryTypes.SELECT,
                raw: true,
            });
            return results;
        }catch (err) {
            console.log(err);
            throw err;
        }
    };
    countService = async() =>{
        try{
            const query = `SELECT COUNT(*) AS totalService FROM services`;
            
            const results = await sequelize.query(query, {
                type: sequelize.QueryTypes.SELECT,
                raw: true,
            });
            return results;
        }catch (err) {
            console.log(err);
            throw err;
        }
    };
    sumTotal = async() =>{
        try{
            const query = `SELECT Sum(Amount) AS SumTotal FROM payments`;
            
            const results = await sequelize.query(query, {
                type: sequelize.QueryTypes.SELECT,
                raw: true,
            });
            return results;
        }catch (err) {
            console.log(err);
            throw err;
        }
    };
}

module.exports = new dashboardDashboard();