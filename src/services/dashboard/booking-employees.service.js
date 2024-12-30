const sequelize = require("../../sequelize");

class bookingDashboardServices {
    getServiceQuantity = async (employeesID) => {
        try {
            // Kiểm tra xem employeesID có được truyền vào không
            if (!employeesID) {
                throw new Error("EmployeeID is required");
            }
    
            const query = `
                SELECT 
                    s.Name AS ServiceName,
                    COUNT(bs.ServiceID) AS TotalBookings
                FROM 
                    bookingservices bs
                JOIN 
                    services s ON bs.ServiceID = s.ServiceID
                JOIN
                    bookings b ON b.BookingID = bs.BookingID
                JOIN
                    employees e ON e.EmployeeID = b.EmployeeID
                WHERE 
                    e.EmployeeID = :employeesID
                GROUP BY 
                    s.ServiceID, s.Name
                ORDER BY 
                    TotalBookings DESC;
            `;
    
            // Thực thi truy vấn với tham số
            const results = await sequelize.query(query, {
                type: sequelize.QueryTypes.SELECT,
                raw: true,
                replacements: { employeesID }, // Thay thế tham số trong câu lệnh SQL
            });
    
            // Log kết quả để kiểm tra
            console.log("Query Results for EmployeeID:", employeesID, JSON.stringify(results, null, 2));
    
            return results;
        } catch (err) {
            console.error("Error fetching service quantities:", err);
            throw err; // Để controller hoặc service layer xử lý lỗi
        }
    };

    getServiceBookingPending = async (employeesID) => {
        try{
            const query = `
            SELECT 
                u.FullName AS CustomerName,
                s.Name AS ServiceName,
                DATE_FORMAT(b.BookingTime, '%d/%m/%Y') AS BookingDate,
                TIME(b.BookingTime) AS BookingTime
            FROM 
                bookings b
            JOIN bookingservices bs ON b.BookingID = bs.BookingID
            JOIN services s ON bs.ServiceID = s.ServiceID
            JOIN users u ON b.CustomerID = u.UserID
            JOIN employees e ON e.EmployeeID = b.EmployeeID 
            WHERE 
                b.BookingTime > NOW() 
                AND e.EmployeeID = :employeesID
            ORDER BY 
                b.BookingTime DESC;  
            `;
            
            const results = await sequelize.query(query, {
                type: sequelize.QueryTypes.SELECT,
                raw: true,
                replacements: { employeesID },
            });

            return results;
        }catch (err) {
            console.error("Error fetching service booking pending:", err);
            throw err; // Ném lại lỗi để controller có thể xử lý
        }
    };
    getServiceBookingInProgress = async (employeesID) => {
        try{
            const query = `
            SELECT 
                u.FullName AS CustomerName,
                s.Name AS ServiceName,
                DATE_FORMAT(b.BookingTime, '%d/%m/%Y') AS BookingDate,
                TIME(b.BookingTime) AS BookingTime
            FROM 
                bookings b
            JOIN bookingservices bs ON b.BookingID = bs.BookingID
            JOIN services s ON bs.ServiceID = s.ServiceID
            JOIN users u ON b.CustomerID = u.UserID
            JOIN employees e ON e.EmployeeID = b.EmployeeID 
            WHERE 
                b.BookingTime = NOW() 
                AND e.EmployeeID = :employeesID
            ORDER BY 
                b.BookingTime DESC;  
            `;
            
            const results = await sequelize.query(query, {
                type: sequelize.QueryTypes.SELECT,
                raw: true,
                replacements: { employeesID },
            });

            return results;
        }catch (err) {
            console.error("Error fetching service booking in progress:", err);
            throw err; // Ném lại lỗi để controller có thể xử lý
        }
    };
    getServiceBookingCompleted = async (employeesID) => {
        try{
            const query = `
            SELECT 
                u.FullName AS CustomerName,
                s.Name AS ServiceName,
                DATE_FORMAT(b.BookingTime, '%d/%m/%Y') AS BookingDate,
                TIME(b.BookingTime) AS BookingTime
            FROM 
                bookings b
            JOIN bookingservices bs ON b.BookingID = bs.BookingID
            JOIN services s ON bs.ServiceID = s.ServiceID
            JOIN users u ON b.CustomerID = u.UserID
            JOIN employees e ON e.EmployeeID = b.EmployeeID 
            WHERE 
                b.BookingTime < NOW() 
                AND e.EmployeeID = :employeesID
            ORDER BY 
                b.BookingTime DESC;  
            `;
            
            const results = await sequelize.query(query, {
                type: sequelize.QueryTypes.SELECT,
                raw: true,
                replacements: { employeesID },
            });

            return results;
        }catch (err) {
            console.error("Error fetching service booking completed:", err);
            throw err; // Ném lại lỗi để controller có thể xử lý
        }
    };
}

module.exports = new bookingDashboardServices();  