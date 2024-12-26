const sequelize = require("../../sequelize");
const {
  ServiceCreateDTOSchema,
  ServiceUpdateDTOSchema,
} = require("../../validation/service.validation");

class ServiceModuleService {
  getNamePriceServices = async (serviceID) => {
    try {
      const query = `
          SELECT 
            Name,
            Price
          FROM services
          WHERE ServiceID = :serviceID ;
      `;
      const results = await sequelize.query(query, {
          type: sequelize.QueryTypes.SELECT,
          replacements: { serviceID },
      });
      return results;
      } catch (err) {
      console.error("Error fetching services:", err);
      throw err;
      }
  }

  getAllServicesByCategory = async (categoryID) => {
    try {
    const query = `
        SELECT * 
        FROM services 
        WHERE CategoryID = :categoryID;
    `;
    const results = await sequelize.query(query, {
        type: sequelize.QueryTypes.SELECT,
        replacements: { categoryID },
    });

    return results;
    } catch (err) {
    console.error("Error fetching services by category:", err);
    throw err;
    }
};  

    createService = async (data, imageUrl) => {
      const validatedData = ServiceCreateDTOSchema.parse(data);

      // Kiểm tra nếu imageUrl không phải là null hoặc undefined
      if (!imageUrl) {
          throw new Error('Image URL is required');
      }

      const transaction = await sequelize.transaction(); // Bắt đầu transaction
      try {
          // Kiểm tra nếu có categoryId
          if (validatedData.categoryId) {
              const findCategoryQuery = `
                  SELECT * FROM servicescategories WHERE CategoryID = :categoryId;
              `;
              const [category] = await sequelize.query(findCategoryQuery, {
                  replacements: { categoryId: validatedData.categoryId },
                  type: sequelize.QueryTypes.SELECT,
                  transaction,
              });

              if (!category || category.length === 0) {
                  throw new Error('Category not found');
              }
          }

          // Thực hiện câu lệnh INSERT để tạo dịch vụ mới
          const insertServiceQuery = `
              INSERT INTO services (
                  CategoryID, Name, Price, DescriptionShort, Description1, ImageDescription, 
                  Description2, Duration
              ) 
              VALUES (:categoryId, :name, :price, :descriptionShort, :description1, :imageDescription, 
                      :description2, :duration);
          `;

          // Kiểm tra các giá trị để tránh null hoặc undefined trong `replacements`
          const replacements = {
              categoryId: validatedData.categoryId,
              name: validatedData.name,
              price: validatedData.price,
              descriptionShort: validatedData.descriptionShort,
              description1: validatedData.description1,
              imageDescription: imageUrl,
              description2: validatedData.description2,
              duration: validatedData.duration
          };

          // Đảm bảo rằng các trường trong `replacements` có giá trị hợp lệ
          for (const key in replacements) {
              if (replacements[key] === undefined || replacements[key] === null) {
                  throw new Error(`Missing value for ${key}`);
              }
          }

          // Thực hiện INSERT
          const [insertResult] = await sequelize.query(insertServiceQuery, {
              replacements: replacements,
              type: sequelize.QueryTypes.INSERT,
              transaction,
          });

          await transaction.commit(); // Commit transaction

          return { id: insertResult.insertId, ...validatedData };
      } catch (error) {
          await transaction.rollback(); // Rollback transaction nếu có lỗi
          console.error("Error creating service:", error);
          throw error;
      }
  };

    // Cập nhật dịch vụ
    updateService = async (serviceID, data, imageUrl) => {

        const validatedData = ServiceUpdateDTOSchema.parse(data);
        const transaction = await sequelize.transaction();
      try {

        const checkServiceQuery = `
              SELECT * 
              FROM services 
              WHERE ServiceID = :serviceID
        `;
        const [service] = await sequelize.query(checkServiceQuery, {
          replacements: { serviceID },
          type: sequelize.QueryTypes.SELECT,
          transaction,
        });

        if (!service) {
          throw new Error('Staff not found');
        }

        // Cập nhật dịch vụ
        const updateQuery = `
          UPDATE services
          SET 
            CategoryID = :categoryId, 
            Name = :name, 
            Price = :price, 
            DescriptionShort = :descriptionShort, 
            Description1 = :description1, 
            ImageDescription = :imageDescription, 
            Description2 = :description2,
            Duration = :duration
          WHERE ServiceID = :serviceID;
        `;

        await sequelize.query(updateQuery, {
          replacements: {
            serviceID,
            categoryId: validatedData.categoryId,
            name: validatedData.name,
            price: validatedData.price,
            descriptionShort: validatedData.descriptionShort,
            description1: validatedData.description1,
            imageDescription: imageUrl || service.ImageDescription, // Cập nhật ảnh mới hoặc giữ ảnh cũ nếu không có
            description2: validatedData.description2,
            duration: validatedData.duration,
          },
          type: sequelize.QueryTypes.UPDATE,
          transaction,
        });

        await transaction.commit();

        return {
              success: true,
              message: "Service updated successfully",
        };
      } catch (err) {
        await transaction.rollback(); 
        console.error("Error updating service with ID:", serviceID, err);
        throw err;
      }
    };
    deleteService = async (serviceID) => {
      const transaction = await sequelize.transaction();
      try {
        // Check if the service exists
        const serviceQuery = `SELECT * FROM services WHERE ServiceID = :serviceID`;
        const [service] = await sequelize.query(serviceQuery, {
          replacements: { serviceID },
          type: sequelize.QueryTypes.SELECT,
          transaction,
        });
    
        if (!service) {
          throw new Error("Service not found");
        }
    
        // Delete the service
        const deleteQuery = `DELETE FROM services WHERE ServiceID = :serviceID`;
        await sequelize.query(deleteQuery, {
          replacements: { serviceID },
          type: sequelize.QueryTypes.DELETE,
          transaction,
        });
    
        // Commit the transaction
        await transaction.commit();
        console.log(`Service with ID ${serviceID} deleted successfully.`);
        return true;
      } catch (err) {
        // Rollback the transaction in case of an error
        await transaction.rollback();
        console.error("Error deleting service:", err);
        throw err;
      }
    };
    
}

module.exports = new ServiceModuleService();
