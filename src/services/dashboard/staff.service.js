const sequelize = require("../../sequelize"); 
const {
    EmployeeCreateDTOSchema,
    EmployeeUpdateDTOSchema
 } = require("../../validation/employees.validate"); 
class staffDashboard {
    getEmployees = async () => {
        try {
            const query = `
                SELECT *
                FROM employees
            `;

            const results = await sequelize.query(query, {
                type: sequelize.QueryTypes.SELECT,
                raw: true,
            });
            return results;
        } catch (err) {
            console.error("Error fetching employees:", err);
            throw err;
        }
    };

    getLocation = async () => {
        try {
            const query = `
            SELECT LocationName
            FROM locations
            `;
            const results = await sequelize.query(query, {
                type: sequelize.QueryTypes.SELECT,
                raw: true,
            });
            console.log("Full results:", JSON.stringify(results, null, 2));
            return results;
        } catch (err) {
            console.error("Error fetching location name:", err);
            throw err;
        }
    };

    // createStaff = async (data, imageUrl) => {
        
    //     const validatedData = EmployeeCreateDTOSchema.parse(data);
    //     console.log("Validated Data:", validatedData);
    //     const transaction = await sequelize.transaction();
      
    //     try {
    //       // Kiểm tra xem Location có tồn tại trong bảng locations không
    //       const locationQuery = `
    //         SELECT LocationID 
    //         FROM locations 
    //         WHERE LocationID = :locationID 
    //         LIMIT 1
    //       `;
          
    //       const [location] = await sequelize.query(locationQuery, {
    //         replacements: { locationID: validatedData.LocationID },
    //         type: sequelize.QueryTypes.SELECT,
    //         transaction,
    //       });
      
    //       // Nếu không tìm thấy LocationID trong bảng locations
    //       if (!location) {
    //         throw new Error('Location not found.');
    //       }
      
    //       // Thêm nhân viên vào bảng employees
    //       const addEmployeeQuery = `
    //         INSERT INTO employees 
    //         (Name, Description, Phone, Email, SpecialtyType, Status, HireDate, Avatar, LocationID)
    //         VALUES 
    //         (:name, :description, :phone, :email, :specialtyType, :status, :hireDate, :avatar, :locationID)
    //       `;
      
    //       const [result] = await sequelize.query(addEmployeeQuery, {
    //         replacements: {
    //           name: validatedData.Name,
    //           description: validatedData.Description,
    //           phone: validatedData.Phone,
    //           email: validatedData.Email,
    //           specialtyType: validatedData.SpecialtyType,
    //           status: validatedData.Status,
    //           hireDate: validatedData.HireDate,
    //           avatar: imageUrl,
    //           locationID: validatedData.LocationID,
    //         },
    //         type: sequelize.QueryTypes.INSERT,
    //         transaction,
    //       });
      
    //       await transaction.commit();
      
    //       return { id: result.insertId, ...validatedData };
    //     } catch (err) {
    //       await transaction.rollback();
    //       throw err;  
    //     }
    //   };

    createStaff = async (data, imageUrl) => {
        const validatedData = EmployeeCreateDTOSchema.parse(data);
        console.log("Validated Data:", validatedData);
        const transaction = await sequelize.transaction();
      
        try {
          // Kiểm tra xem LocationName có tồn tại trong bảng locations không
          const locationQuery = `
            SELECT LocationID 
            FROM locations 
            WHERE LocationName = :locationName 
            LIMIT 1
          `;
          
          const [location] = await sequelize.query(locationQuery, {
            replacements: { locationName: validatedData.LocationName }, // Sử dụng LocationName từ validatedData
            type: sequelize.QueryTypes.SELECT,
            transaction,
          });
      
          // Nếu không tìm thấy LocationID trong bảng locations
          if (!location) {
            throw new Error('Location not found.');
          }
      
          // Thêm nhân viên vào bảng employees
          const addEmployeeQuery = `
            INSERT INTO employees 
            (Name, Description, Phone, Email, SpecialtyType, Status, HireDate, Avatar, LocationID)
            VALUES 
            (:name, :description, :phone, :email, :specialtyType, :status, :hireDate, :avatar, :locationID)
          `;
      
          const [result] = await sequelize.query(addEmployeeQuery, {
            replacements: {
              name: validatedData.Name,
              description: validatedData.Description,
              phone: validatedData.Phone,
              email: validatedData.Email,
              specialtyType: validatedData.SpecialtyType,
              status: validatedData.Status,
              hireDate: validatedData.HireDate,
              avatar: imageUrl,
              locationID: location.LocationID,  // Lấy LocationID từ kết quả truy vấn trên
            },
            type: sequelize.QueryTypes.INSERT,
            transaction,
          });
      
          await transaction.commit();
      
          return { id: result.insertId, ...validatedData };
        } catch (err) {
          await transaction.rollback();
          throw err;  
        }
    };
    
    updateStaff = async (employeeID, data, imageUrl) => {
        const validatedData = EmployeeUpdateDTOSchema.parse(data); // Xác thực dữ liệu trước khi xử lý
        const transaction = await sequelize.transaction();  // Bắt đầu giao dịch
    
        try {
            // Kiểm tra xem nhân viên có tồn tại không
            const checkStaffQuery = `
                SELECT *
                FROM employees
                WHERE EmployeeID = :employeeID
            `;
            const [staff] = await sequelize.query(checkStaffQuery, {
                replacements: { employeeID },
                type: sequelize.QueryTypes.SELECT,
                transaction,
            });
    
            if (!staff) {
                throw new Error('Staff not found');
            }
    
            // Kiểm tra và lấy LocationID nếu người dùng gửi LocationName
            if (data.LocationName) {
                const locationQuery = `
                    SELECT LocationID
                    FROM locations
                    WHERE LocationName = :locationName
                    LIMIT 1
                `;
                const [location] = await sequelize.query(locationQuery, {
                    replacements: { locationName: data.LocationName },
                    type: sequelize.QueryTypes.SELECT,
                    transaction,
                });
    
                if (location) {
                    validatedData.LocationID = location.LocationID;  // Cập nhật LocationID từ LocationName
                } else {
                    throw new Error('LocationName not found');
                }
            }
    
            // Cập nhật thông tin nhân viên
            const updateQuery = `
                UPDATE employees
                SET 
                    Name = :name,
                    Description = :description,
                    Phone = :phone,
                    Email = :email,
                    SpecialtyType = :specialtyType,
                    Status = :status,
                    HireDate = :hireDate,
                    Avatar = :avatar,
                    LocationID = :locationID
                WHERE EmployeeID = :employeeID;
            `;
    
            await sequelize.query(updateQuery, {
                replacements: {
                    employeeID,
                    name: validatedData.Name || staff.Name,
                    description: validatedData.Description || staff.Description,
                    phone: validatedData.Phone || staff.Phone,
                    email: validatedData.Email || staff.Email,
                    specialtyType: validatedData.SpecialtyType || staff.SpecialtyType,
                    status: validatedData.Status || staff.Status,
                    hireDate: validatedData.HireDate || staff.HireDate,
                    avatar: imageUrl || staff.Avatar,  // Nếu có ảnh mới thì update, không thì giữ nguyên ảnh cũ
                    locationID: validatedData.LocationID || staff.LocationID,  // Cập nhật LocationID nếu có
                },
                type: sequelize.QueryTypes.UPDATE,
                transaction,
            });
    
            // Commit giao dịch
            await transaction.commit();
    
            return {
                success: true,
                message: "Staff updated successfully",
            };
        } catch (err) {
            // Rollback nếu có lỗi
            await transaction.rollback();
            console.error("Error updating staff with ID:", employeeID, err);
            throw err;
        }
    };
    

    deleteStaff = async (employeeID) => {
        const transaction = await sequelize.transaction();
        
        try {
          // Kiểm tra xem nhân viên có lịch làm việc hay không
          const checkScheduleQuery = `
            SELECT COUNT(*) AS scheduleCount
            FROM employeeworkschedules
            WHERE EmployeeID = :employeeID
          `;
          const result = await sequelize.query(checkScheduleQuery, {
            replacements: { employeeID },
            type: sequelize.QueryTypes.SELECT,
            transaction,
          });
      
          // Nếu nhân viên có lịch làm việc, không cho phép xóa
          if (result[0].scheduleCount > 0) {
            throw new Error("Cannot delete staff because they have a work schedule.");
          }
      
          // Tiến hành xóa nhân viên nếu không có lịch làm việc
          const deleteEmployeeQuery = `
            DELETE FROM employees 
            WHERE EmployeeID = :employeeID
          `;
          await sequelize.query(deleteEmployeeQuery, {
            replacements: { employeeID },
            type: sequelize.QueryTypes.DELETE,
            transaction,
          });
      
          // Commit giao dịch nếu xóa thành công
          await transaction.commit();
      
          return {
            success: true,
            message: "Staff deleted successfully.",
          };
        } catch (err) {
          // Rollback nếu có lỗi xảy ra
          await transaction.rollback();
          throw err;
        }
      };

}

module.exports = new staffDashboard();
