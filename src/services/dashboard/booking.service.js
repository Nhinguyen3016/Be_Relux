const sequelize = require("../../sequelize");

class bookingDashboardServices {
    getServiceQuantity = async () => {
        try {
            const query = `
                SELECT 
                s.Name AS ServiceName,
                COUNT(bs.ServiceID) AS TotalBookings
                FROM 
                bookingservices bs
                JOIN 
                services s ON bs.ServiceID = s.ServiceID
                GROUP BY 
                s.ServiceID, s.Name
                ORDER BY 
                TotalBookings DESC;
            `;
            
            // Thay đổi cách thực hiện truy vấn
            const results = await sequelize.query(query, {
                type: sequelize.QueryTypes.SELECT,
                raw: true,
            });

            // Kiểm tra và log kết quả trả về
            console.log("Full results:", JSON.stringify(results, null, 2));

            return results;
        } catch (err) {
            console.error("Error fetching service quantities:", err);
            throw err; // Ném lại lỗi để controller có thể xử lý
        }
    };

    getServiceBookingPending = async () => {
        try{
            const query = `
            SELECT 
                    u.FullName AS CustomerName,
                    s.Name AS ServiceName,
                    DATE_FORMAT(b.BookingTime, '%d/%m/%Y') AS BookingDate,
                    TIME(b.BookingTime) AS BookingTime
                FROM 
                    bookings b
                JOIN users u ON b.CustomerID = u.UserID
                JOIN bookingservices bs ON b.BookingID = bs.BookingID
                JOIN services s ON bs.ServiceID = s.ServiceID
                WHERE 
                    b.BookingTime > NOW();
            `;
            
            const results = await sequelize.query(query, {
                type: sequelize.QueryTypes.SELECT,
                raw: true,
            });

            return results;
        }catch (err) {
            console.error("Error fetching service booking pending:", err);
            throw err; // Ném lại lỗi để controller có thể xử lý
        }
    };
    getServiceBookingInProgress = async () => {
        try{
            const query = `
            SELECT 
                    u.FullName AS CustomerName,
                    s.Name AS ServiceName,
                    DATE_FORMAT(b.BookingTime, '%d/%m/%Y') AS BookingDate,
                    TIME(b.BookingTime) AS BookingTime
                FROM 
                    bookings b
                JOIN users u ON b.CustomerID = u.UserID
                JOIN bookingservices bs ON b.BookingID = bs.BookingID
                JOIN services s ON bs.ServiceID = s.ServiceID
                WHERE 
                    b.BookingTime = NOW();
            `;
            
            const results = await sequelize.query(query, {
                type: sequelize.QueryTypes.SELECT,
                raw: true,
            });

            return results;
        }catch (err) {
            console.error("Error fetching service booking in progress:", err);
            throw err; // Ném lại lỗi để controller có thể xử lý
        }
    };
    getServiceBookingCompleted = async () => {
        try{
            const query = `
            SELECT 
                    u.FullName AS CustomerName,
                    s.Name AS ServiceName,
                    DATE_FORMAT(b.BookingTime, '%d/%m/%Y') AS BookingDate,
                    TIME(b.BookingTime) AS BookingTime
                FROM 
                    bookings b
                JOIN users u ON b.CustomerID = u.UserID
                JOIN bookingservices bs ON b.BookingID = bs.BookingID
                JOIN services s ON bs.ServiceID = s.ServiceID
                WHERE 
                    b.BookingTime < NOW();
            `;
            
            const results = await sequelize.query(query, {
                type: sequelize.QueryTypes.SELECT,
                raw: true,
            });

            return results;
        }catch (err) {
            console.error("Error fetching service booking completed:", err);
            throw err; // Ném lại lỗi để controller có thể xử lý
        }
    };
}

module.exports = new bookingDashboardServices();