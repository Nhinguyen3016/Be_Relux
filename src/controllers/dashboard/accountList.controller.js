const AccountListDashboardService = require("../../services/dashboard/accountList.service");


class AccountListDashboardController {
    getAccount = async (req, res) => {
        try {
            const accountList = await AccountListDashboardService.getAccount();

            if (!accountList || accountList.length === 0) {
                return res.status(404).json({ message: "No data found." });
            }
            res.status(200).json({
                accountList
            });
        } catch (err) {
            console.error("Error fetching static bookings:", err);
            res.status(500).json({ message: "Internal Server Error" });
        }
    };
    getRoleName = async (req, res) => {
        try {
            const roleOptionName = await AccountListDashboardService.getRoleName();

            if (!roleOptionName || roleOptionName.length === 0) {
                return res.status(404).json({ message: "No data found." });
            }
            res.status(200).json({
                roleOptionName
            });
        } catch (err) {
            console.error("Error fetching static bookings:", err);
            res.status(500).json({ message: "Internal Server Error" });
        }
    };
    updateAccountList = async (req, res) => {
        const { userID, roleName } = req.body;
      
        try {
            if (!userID || !roleName) {
                return res.status(400).json({ message: 'Invalid userID or roleName.' });
            }

            const result = await AccountListDashboardService.updateAccountList(
                userID, 
                roleName
            );
      
          if (result) {
            res.status(200).json({
              message: "User role updated successfully.",
              data: result,
            });
          } else {
            res.status(404).json({
              message: "User not found or no changes made.",
            });
          }
        } catch (err) {
          console.error("Error updating user role:", err);
          res.status(500).json({
            message: "Failed to update user role",
            error: err.message,
          });
        }
      };
}
module.exports = new AccountListDashboardController();