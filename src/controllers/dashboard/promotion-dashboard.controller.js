const promotionDashboard = require("../../services/dashboard/promotion-dashboard.services");
const { validatePromotion } = require("../../validation/promotion-dashboard.validate");

class promotionDashboardController {
    getPromotions = async (req, res) => {
        try {
            const promotions = await promotionDashboard.getPromotions();
            console.log("Promotions",promotions);


            if (!promotions || promotions.length === 0) {
                return res.status(404).json({ message: "No data found." });
            }

            res.status(200).json({
                giftCards : promotions
            });

        }catch(err){
            console.error("Error fetching promotions:", err);
            res.status(500).json({ message: "Internal Server Error" });
        }
    };
    getServices = async (req, res) => {
        try {
            console.log("Fetching service...");
            const service = await promotionDashboard.getServices();
            if (!service || service.length === 0) {
                return res.status(404).json({ message: "No employees found." });
            }
            res.status(200).json({
                service
            });
        } catch (err) {
            res.status(500).json({ message: "Internal Server Error" });
        }
    };
    createPromotions = async (req, res) => {
        try {
            // Lấy dữ liệu từ body
            const { name, description, discount, startDate, endDate } = req.body;

            console.log("Received body:", { name, description, discount, startDate, endDate });

            // Kiểm tra xem tất cả các trường bắt buộc có mặt trong yêu cầu
            if (!name || !description || !discount || !startDate || !endDate) {
                return res.status(400).json({
                    success: false,
                    message: "All fields (name, description, discount, startDate, endDate) are required."
                });
            }

            // Kiểm tra định dạng ngày tháng
            if (isNaN(Date.parse(startDate))) {
                return res.status(400).json({
                    success: false,
                    message: "StartDate must be a valid date."
                });
            }

            if (isNaN(Date.parse(endDate))) {
                return res.status(400).json({
                    success: false, 
                    message: "EndDate must be a valid date."
                });
            }

            const validation = validatePromotion({
                name: name,
                description: description,
                discount: discount,
                startDate: startDate,
                endDate: endDate,
            });
            console.log('Validation result:', validation);
    
            if (!validation.valid) {
                // Kiểm tra errors trước khi sử dụng map
                console.log("Validation errors:", validation.errors); 
                const errorMessages = validation.errors 
                    ? validation.errors.map((err) => err.message).join(", ")
                    : "Validation failed";  // Nếu không có lỗi, hiển thị thông báo mặc định
            
                return res.status(400).json({
                    success: false,
                    message: errorMessages,
                });
            }
    
            
    
            // Gọi service để tạo khuyến mãi
            const result = await promotionDashboard.createPromotion(
                name,
                description,
                discount,
                startDate,
                endDate
            );
    
            res.status(201).json({
                success: true,
                message: "Promotion created and linked successfully",
                data: result.data
            });
        } catch (err) {
            console.error("Error creating promotion:", err);
            res.status(500).json({
                success: false,
                message: err.message || "An error occurred while creating the promotion"
            });
        }
    };

    updatePromotions = async (req, res) => {
        try {
            const { promotionID, name, description, discount, startDate, endDate } = req.body;

            console.log("Request body:", req.body);

            if (!promotionID || !name || !description || discount === undefined || !startDate || !endDate) {
                return res.status(400).json({
                    success: false,
                    message: "All fields (promotionID, name, description, discount, startDate, endDate) are required."
                });
            }

            const normalizedDiscount = discount > 1 ? discount / 100 : discount;

            if (isNaN(Date.parse(startDate)) || isNaN(Date.parse(endDate))) {
                return res.status(400).json({
                    success: false,
                    message: "StartDate and EndDate must be valid date strings (e.g., YYYY-MM-DD)."
                });
            }

            const promotionData = { name, description, discount: normalizedDiscount * 100, startDate, endDate };


            const validationResult = validatePromotion(promotionData);

            if (!validationResult.valid) {
                return res.status(400).json({
                    success: false,
                    message: "Validation failed",
                    errors: validationResult.errors
                });
            }

            const result = await promotionDashboard.updatePromotion(
                promotionID,
                name,
                description,
                normalizedDiscount,
                startDate,
                endDate
            );

            if (result.success) {
                return res.status(200).json(result);
            }

            return res.status(500).json({
                success: false,
                message: result.message || "An error occurred while updating the promotion.",
            });
        } catch (error) {
            console.error("Error in updatePromotions controller:", error);
            return res.status(500).json({
                success: false,
                message: "An internal server error occurred.",
                error: error.message
            });
        }
    };

    deletePromotions = async (req, res) => {
        try {
            const { promotionID } = req.params;

            if (!promotionID) {
                return res.status(400).json({ 
                    message: "Work Schedule ID is required." 
                });
            }

            const result = await promotionDashboard.deletePromotion(promotionID);

            res.status(200).json({
                success: true,
                message: "Promotions deleted successfully",
                result
            });
        } catch (err) {
            console.error("Error deleting promotions:", err);
            res.status(500).json({ 
                message: err.message || "Error deleting promotions"
            });
        }
    };   
}
module.exports = new promotionDashboardController();