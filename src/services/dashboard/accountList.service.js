const sequelize = require("../../sequelize");

class AccountListDashboardService {
    getAccount = async () => {
        try {
            const query = `
                SELECT 
                    u.UserID,
                    u.FullName,
                    u.Phone,
                    u.Email,
                    ur.RoleName
                FROM users u
                JOIN userroles ur ON u.RoleID = ur.RoleID
                ORDER BY ur.RoleName ASC;
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
    getRoleName = async () => {
        try {
            const query = `
                SELECT *
                FROM userroles
                ORDER BY RoleName ASC;
            `;
            const results = await sequelize.query(query, {
                type: sequelize.QueryTypes.SELECT,
                raw: true,
            });

            return results;
        } catch (err) {
            console.error("Error fetching role name:", err);
            throw err;
        }
    }
    updateAccountList = async (userID, roleName) => {
        try {
            const query = `
                UPDATE users
                SET RoleID = (SELECT RoleID FROM userroles WHERE RoleName = :roleName)
                WHERE UserID = :userID;
            `;
            // Thực thi câu truy vấn SQL
            const [result] = await sequelize.query(query, {
                replacements: {
                    roleName, // Sử dụng roleName để tìm RoleID
                    userID
                },
                type: sequelize.QueryTypes.UPDATE
            });
      
            if (result === 0) {
                throw new Error("User not found or no changes made.");
            }
            return true; 
        } catch (err) {
            console.error("Error updating user role:", err);
            throw err; 
        }
      };


}

module.exports = new AccountListDashboardService();