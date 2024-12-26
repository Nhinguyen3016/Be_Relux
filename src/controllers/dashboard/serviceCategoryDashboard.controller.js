const serviceCategoryDashboard = require("../../services/dashboard/serviceCategoryDashboard.service");


class ServiceCategoryController {
  // Danh sách các danh mục dịch vụ
  getServiceCategory = async (req, res) => {
    try {

      const result = await serviceCategoryDashboard.getAllServiceCategory();
  
      res.status(200).json({
        data: result,
      });
    } catch (err) {
      console.error("Error fetching service categories:", err);
      res.status(500).json({
        message: "Error fetching service categories",
        error: err.message,
      });
    }
  };
  

  // Tạo danh mục dịch vụ mới
//   createServiceCategory = async (req, res) => {
//     const { name, descriptionShort, typeService } = req.body;
//     try {
//       const result = await serviceCategoryDashboard.createServiceCategory(name, descriptionShort, typeService);
//       res.status(201).json({
//         message: "Service category created successfully",
//         data: result,
//       });
//     } catch (err) {
//       console.error("Error creating service category:", err);
//       res.status(500).json({
//         message: "Error creating service category",
//         error: err.message,
//       });
//     }
//   };

    updateServiceCategory = async (req, res) => {
        const { categoryID } = req.params;
        const { name, descriptionShort, typeService } = req.body; 


        // Kiểm tra tính hợp lệ của các trường dữ liệu
        if (!name || !descriptionShort || !typeService) {
          return res.status(400).json({
            message: "All fields (name, descriptionShort, typeService) are required",
          });
        }
      
        try {

          const result = await serviceCategoryDashboard.updateServiceCategory(
            categoryID, 
            name, 
            descriptionShort, 
            typeService
          );
      

          if (result) {
            res.status(200).json({
              message: "Service category updated successfully",
              data: result,
            });
          } else {

            res.status(404).json({
              message: "Service category not found",
            });
          }
        } catch (err) {
          // Xử lý lỗi nếu có
          console.error("Error updating service category:", err);
          res.status(500).json({
            message: "Error updating service category",
            error: err.message,
          });
        }
      };

  // Xóa danh mục dịch vụ
//   deleteServiceCategory = async (req, res) => {
//     const { id } = req.params;

//     try {
//       const result = await serviceCategoryDashboard.deleteServiceCategory(Number(id));
//       res.status(200).json({
//         message: "Service category deleted successfully",
//         data: result,
//       });
//     } catch (err) {
//       console.error("Error deleting service category:", err);
//       res.status(500).json({
//         message: "Error deleting service category",
//         error: err.message,
//       });
//     }
//   };
}

module.exports = new ServiceCategoryController();
