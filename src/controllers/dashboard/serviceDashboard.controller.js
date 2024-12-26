const serviceDashboard = require("../../services/dashboard/serviceDashboard.service");
const uploadToS3 = require('../../utils/aws_s3');
const fs = require('fs');

class ServiceCategoryController {
    getNamePriceServices = async (req, res) => {
        try {
            const { serviceID } = req.params;
    
            if (!serviceID || isNaN(serviceID)) {
                return res.status(400).json({ message: "Invalid CategoryID" });
            }
    
            const services = await serviceDashboard.getNamePriceServices(serviceID);
    
            if (services.length === 0) {
                return res.status(404).json({ message: "No services found for this category." });
            }
    
            return res.status(200).json(services);
            } catch (err) {
            console.error("Error in getServicesByCategory:", err);
            return res.status(500).json({ message: "Internal server error" });
            }
        
    }
    
    getServicesByCategory = async (req, res) => {
        try {
        const { categoryID } = req.params;
        console.log('ID:', categoryID);

        if (!categoryID || isNaN(categoryID)) {
            return res.status(400).json({ message: "Invalid CategoryID" });
        }

        const services = await serviceDashboard.getAllServicesByCategory(categoryID);

        if (services.length === 0) {
            return res.status(404).json({ message: "No services found for this category." });
        }

        return res.status(200).json(services);
        } catch (err) {
        console.error("Error in getServicesByCategory:", err);
        return res.status(500).json({ message: "Internal server error" });
        }
    };

    createService = async (req, res) => {
        try {
            const data = req.body; 
            const file = req.file; 

            console.log('Body:', req.body);
    console.log('File:', req.file);

            if (data.price) {
                data.price = parseFloat(data.price); 
            }
            if (data.duration) {
                data.duration = parseInt(data.duration, 10); 
            }
            if (data.categoryId) {
                data.categoryId = parseInt(data.categoryId, 10); 
            }
    
            // Kiểm tra nếu thiếu thông tin
            if (!data || !file) {
                return res.status(400).json({
                    success: false,
                    message: "All fields are required."
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
    
            // Gán imageUrl vào dữ liệu
            const serviceData = {
                categoryId: data.categoryId,
                name: data.name,
                price: data.price,
                descriptionShort: data.descriptionShort,
                description1: data.description1,
                imageDescription: imageUrl,
                description2: data.description2,
                duration: data.duration,
            };
    
            console.log("Service Data before create:", serviceData);  // Log dữ liệu trước khi tạo dịch vụ
    
            // Lưu dữ liệu vào DB
            const result = await serviceDashboard.createService(serviceData, imageUrl);
    
            // Xóa file tạm sau khi upload
            fs.unlinkSync(filePath);
    
            return res.status(201).json({
                success: true,
                message: "Service created successfully",
                data: result
            });
        } catch (err) {
            console.error("Error creating service:", err);
            res.status(500).json({
                success: false,
                message: err.message || "An error occurred while creating the service"
            });
        }
    };
    
    updateService = async (req, res) => {
        try {

            const { serviceID } = req.params;
            const data = req.body; // Dữ liệu gửi lên
            const file = req.file; // File ảnh (nếu có)
    
            if (data.price) {
                data.price = parseFloat(data.price); 
            }
            if (data.duration) {
                data.duration = parseInt(data.duration, 10); 
            }
            if (data.categoryId) {
                data.categoryId = parseInt(data.categoryId, 10); 
            }
            Object.keys(data).forEach(key => {
                if (data[key] === undefined || data[key] === null) {
                    delete data[key];
                }
            });
            let imageUrl = null;
            if (file) {
                const fileName = `${Date.now()}-${file.originalname}`;
                const filePath = file.path;

                // Upload ảnh lên AWS S3
                imageUrl = await uploadToS3(filePath, fileName);
                console.log("Image URL:", imageUrl);

                if (!imageUrl) {
                    return res.status(400).json({
                        success: false,
                        message: "Failed to upload image to S3",
                    });
                }

                // Xóa file tạm sau khi upload
                fs.unlinkSync(filePath);
            }
    
    
            // Gọi service layer để cập nhật dịch vụ
            const result = await serviceDashboard.updateService(serviceID, data, imageUrl);


            if (result) {
                res.status(200).json({
                    success: true,
                    message: "Service updated successfully",
                    data: result,
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: "Service not found",
                });
            }
        } catch (err) {
            console.error("Error updating service:", err);
            res.status(500).json({
                success: false,
                message: "Error updating service",
                error: err.message,
            });
        }
    };
    
    deleteService = async (req, res) => {
        try {
            const { serviceID } = req.params;

            if (!serviceID) {
                return res.status(400).json({ 
                    message: "Work Schedule ID is required." 
                });
            }

            const result = await serviceDashboard.deleteService(serviceID);

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

module.exports = new ServiceCategoryController();
