const staffDashboard = require("../../services/dashboard/staff.service");
const uploadToS3 = require('../../utils/aws_s3');
const fs = require('fs');

class staffController {
    getEmployees = async (req, res) => {
        try {
            console.log("Fetching employees...");
            const employees = await staffDashboard.getEmployees();
            if (!employees || employees.length === 0) {
                return res.status(404).json({ message: "No employees found." });
            }
            res.status(200).json({
                employees: employees
            });
        } catch (err) {
            res.status(500).json({ message: "Internal Server Error" });
        }
    };

    getLocation = async (req, res) => {
        try {
            const locationName = await staffDashboard.getLocation();
            if (!locationName || locationName.length === 0) {
                return res.status(404).json({ message: "No employees found." });
            }
            res.status(200).json({
                locationName
            });
        } catch (err) {
            res.status(500).json({ message: "Internal Server Error" });
        }
    };

    createStaff = async (req, res) => {
        try {
            const data = req.body;
            const file = req.file; 
            
            console.log("BODY:", data);  // Log dữ liệu gửi lên từ client
    
            if (data.LocationID) {
                data.LocationID = parseInt(data.LocationID, 10); 
            }
            if (!data || !file) {
                return res.status(400).json({
                    success: false,
                    message: "All fields (including image) are required."
                });
            }
    
            // Tạo tên file để upload lên S3
            const fileName = `${Date.now()}-${file.originalname}`;
            const filePath = file.path;
    
            // Upload ảnh lên AWS S3 và lấy URL
            const imageUrl = await uploadToS3(filePath, fileName);
            console.log("Image URL:", imageUrl);  // Log giá trị imageUrl
    
            if (!imageUrl) {
                return res.status(400).json({
                    success: false,
                    message: "Failed to upload image to S3"
                });
            }
    
            // Gọi service layer để tạo nhân viên
            const result = await staffDashboard.createStaff(data, imageUrl);
    
            res.status(201).json({
                success: true,
                message: "Staff created successfully",
                data: result
            });
        } catch (err) {
            console.error("Error creating staff:", err);
            res.status(500).json({
                success: false,
                message: err.message || "An error occurred while creating the staff"
            });
        }
    };
    updateStaff = async (req, res) => {
        try {
            const { employeeID } = req.params;
            const data = req.body;  // Dữ liệu gửi lên
            const file = req.file;   // File ảnh (nếu có)
            console.log("Request body:", req.body);  // Kiểm tra dữ liệu text
            console.log("Uploaded file:", req.file);  // Kiểm tra file ảnh
    
            if (!data) {
                return res.status(400).json({
                    success: false,
                    message: "Request body is missing",
                });
            }
    
            if (typeof data !== "object" || data === null) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid request body format. Please send a valid JSON object",
                });
            }
    
            // Nếu LocationID được gửi dưới dạng string, chuyển thành number
            if (data.LocationID) {
                data.LocationID = parseInt(data.LocationID, 10);
            }
    
            // Xóa các trường có giá trị null hoặc undefined
            Object.keys(data).forEach(key => {
                if (data[key] === undefined || data[key] === null) {
                    delete data[key];
                }
            });
    
            let imageUrl = null;
            // Nếu có file ảnh, upload lên S3
            if (file) {
                const fileName = `${Date.now()}-${file.originalname}`;
                const filePath = file.path;
    
                // Upload ảnh lên AWS S3 và lấy URL
                imageUrl = await uploadToS3(filePath, fileName);
                console.log("Image URL:", imageUrl);
    
                if (!imageUrl) {
                    return res.status(400).json({
                        success: false,
                        message: "Failed to upload image to S3",
                    });
                }
    
                // Xóa file tạm sau khi upload lên S3
                fs.unlinkSync(filePath);
            }
    
            // Gọi service layer để cập nhật nhân viên
            const result = await staffDashboard.updateStaff(employeeID, data, imageUrl);
    
            if (result) {
                res.status(200).json({
                    success: true,
                    message: "Staff updated successfully",
                    data: result,
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: "Staff not found",
                });
            }
        } catch (err) {
            console.error("Error updating staff:", err);
            res.status(500).json({
                success: false,
                message: "Error updating staff",
                error: err.message,
            });
        }
    };
    

    deleteStaff = async (req, res) => {
        const { employeeID } = req.params;
        try {
          const result = await staffDashboard.deleteStaff(employeeID);
          res.status(200).json(result);
        } catch (err) {
          res.status(400).json({
            success: false,
            message: err.message, // Thông báo lỗi từ model
          });
        }
      };
}

module.exports = new staffController();
