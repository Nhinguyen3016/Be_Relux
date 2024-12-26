const sequelize = require("../../sequelize");
const { ServiceCategoryUpdateDTOSchema } = require("../../validation/serviceCategory.validation");

class ServiceCategoryDashboard {
  getAllServiceCategory = async () => {
    try {
      const query = `
        SELECT * FROM servicescategories;
      `;
      const results = await sequelize.query(query, {
        type: sequelize.QueryTypes.SELECT,
        raw: true
      });
  
      return results;
    } catch (err) {
      console.error("Error fetching service categories:", err);
      throw err;
    }
  };
  
  // Cập nhật ServiceCategory
  updateServiceCategory = async (categoryID, name, descriptionShort, typeService) => {
    try {

      const parsedCategoryID = Number(categoryID);
      if (isNaN(parsedCategoryID)) {
        throw new Error("Invalid categoryID, it must be a valid number.");
      }
  

      const value = ServiceCategoryUpdateDTOSchema.parse({
        categoryID: parsedCategoryID,
        name,
        descriptionShort,
        typeService
      });
  
      const query = `
        UPDATE servicescategories
        SET Name = :name, DescriptionShort = :descriptionShort, TypeService = :typeService
        WHERE CategoryID = :categoryID
      `;
      // Thực thi câu truy vấn SQL
      const [result] = await sequelize.query(query, {
        replacements: {
          name: value.name,
          descriptionShort: value.descriptionShort,
          typeService: value.typeService,
          categoryID: parsedCategoryID
        },
        type: sequelize.QueryTypes.UPDATE
      });
  
      if (result === 0) {
        throw new Error("Service category not found or no changes made.");
      }
      return true; 
    } catch (err) {
      console.error("Error updating service category:", err);
      throw err; 
    }
  };


  // Tạo mới ServiceCategory
  // createServiceCategory = async (data) => {
  //   try {
  //     const value = ServiceCategoryCreateDTOSchema.parse(data);
  //     const query = `
  //       INSERT INTO service_categories (name, description)
  //       VALUES (:name, :description)
  //     `;
      
  //     const [result] = await sequelize.query(query, {
  //       replacements: { name: value.name, description: value.description },
  //       type: sequelize.QueryTypes.INSERT
  //     });

  //     return result; // Trả về ID của bản ghi mới được tạo
  //   } catch (err) {
  //     console.error("Error creating service category:", err);
  //     throw err;
  //   }
  // };


  // Xóa ServiceCategory
  // deleteServiceCategory = async (id) => {
  //   try {
  //     const query = `
  //       DELETE FROM service_categories
  //       WHERE id = :id
  //     `;
      
  //     const [result] = await sequelize.query(query, {
  //       replacements: { id },
  //       type: sequelize.QueryTypes.DELETE
  //     });

  //     if (result === 0) {
  //       throw ErrDataNotFound; 
  //     }

  //     return true;
  //   } catch (err) {
  //     console.error("Error deleting service category:", err);
  //     throw err;
  //   }
  // };
}

module.exports = new ServiceCategoryDashboard();
