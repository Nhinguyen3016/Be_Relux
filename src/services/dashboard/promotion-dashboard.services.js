const sequelize = require("../../sequelize");

const moment = require('moment'); 

class PromotionsDashboard {
    // Lấy danh sách chương trình khuyến mãi
    getPromotions = async () => {
        try {
            const query = `
                SELECT 
                    s.Name AS ServiceName,
                    p.PromotionID,
                    p.Description,
                    p.DiscountPercentage AS Discount,
                    p.StartDate,
                    p.EndDate
                FROM promotions p
                JOIN services s ON p.PromotionID = s.PromotionID
            `;
            const results = await sequelize.query(query, {
                type: sequelize.QueryTypes.SELECT,
                raw: true,
            });
            // Chỉ định dạng ngày tháng năm
            const formattedResults = results.map(item => ({
                ...item,
                StartDate: new Date(item.StartDate).toISOString().split('T')[0], // Chỉ lấy YYYY-MM-DD
                EndDate: new Date(item.EndDate).toISOString().split('T')[0],     // Chỉ lấy YYYY-MM-DD
            }));

            return formattedResults;
        } catch (err) {
            console.error("Error fetching promotions:", err);
            throw err;
        }
    };
    // Lấy danh sách dịch vụ
    getServices = async () => {
        try {
            const query = `
                SELECT 
                    ServiceID,
                    Name
                FROM services
            `;
            const results = await sequelize.query(query, {
                type: sequelize.QueryTypes.SELECT,
                raw: true,
            });
            return results;
        } catch (err) {
            console.error("Error fetching services:", err);
            throw err;
        }
    };    

    createPromotion = async (name, description, discount, startDate, endDate) => {
        try {
            // Kiểm tra các tham số đầu vào
            if (!name || !description || !startDate || !endDate || !discount) {
                throw new Error("All fields (name, discount, description, startDate, endDate) are required.");
            }
            // Chuyển đổi ngày tháng sang định dạng mà MySQL chấp nhận (YYYY-MM-DD)
            const formattedStartDate = moment(startDate).format('YYYY-MM-DD');
            const formattedEndDate = moment(endDate).format('YYYY-MM-DD');

            console.log("Formatted dates:", { formattedStartDate, formattedEndDate });

            const transaction = await sequelize.transaction(); // Bắt đầu transaction

            try {
                // Truy vấn lấy ServiceID dựa trên tên dịch vụ
                const findServiceQuery = `
                    SELECT ServiceID 
                    FROM services 
                    WHERE Name = :name
                `;
                const [service] = await sequelize.query(findServiceQuery, {
                    replacements: { name }, // Truyền giá trị name hợp lệ
                    type: sequelize.QueryTypes.SELECT,
                    transaction,
                });

                console.log("Service found:", service);

                if (!service) {
                    throw new Error("Service not found");
                }

                const serviceID = service.ServiceID;

                // Thêm promotion vào bảng promotions
                const insertPromotionQuery = `
                    INSERT INTO promotions (Description, DiscountPercentage, StartDate, EndDate)
                    VALUES (:description, :discount, :startDate, :endDate)
                `;
                const [insertResult] = await sequelize.query(insertPromotionQuery, {
                    replacements: { 
                        description,
                        discount,
                        startDate: formattedStartDate,
                        endDate: formattedEndDate
                    },
                    type: sequelize.QueryTypes.INSERT,
                    transaction,
                });

                console.log("Insert promotion result:", insertResult);

                const promotionID = insertResult;

                if (!promotionID) {
                    throw new Error("Failed to retrieve PromotionID");
                }

                console.log("Promotion created with ID:", promotionID);

                // Cập nhật bảng services để gán PromotionID
                const updateServiceQuery = `
                    UPDATE services 
                    SET PromotionID = :promotionID 
                    WHERE ServiceID = :serviceID
                `;
                const updateResult = await sequelize.query(updateServiceQuery, {
                    replacements: { promotionID, serviceID },
                    type: sequelize.QueryTypes.UPDATE,
                    transaction,
                });

                console.log("Update service result:", updateResult);

                // Commit giao dịch
                await transaction.commit();
                console.log("Transaction committed successfully");

                return {
                    success: true,
                    message: "Promotion created and linked successfully",
                    data: {
                        promotionID,
                        serviceID,
                        name,
                        description,
                        discount,
                        startDate: formattedStartDate,
                        endDate: formattedEndDate,
                    },
                };
            } catch (error) {
                await transaction.rollback();
                console.error("Error during promotion creation:", error);
                return { success: false, message: error.message };
            }
        } catch (err) {
            console.error("Error in createPromotion:", err);
            throw err;
        }
    };

    updatePromotion = async (promotionID, name, description, discount, startDate, endDate) => {
        try {
            
            console.log("Input parameters:", { promotionID, name, description, discount, startDate, endDate });
    
            // Kiểm tra các tham số đầu vào
            if (!promotionID || !name || !description || !startDate || !endDate || !discount) {
                throw new Error("All fields (promotionID, name, discount,description, startDate, endDate) are required.");
            }
            // Chuyển đổi ngày tháng sang định dạng mà MySQL chấp nhận (YYYY-MM-DD)
            const formattedStartDate = moment(startDate).format('YYYY-MM-DD');
            const formattedEndDate = moment(endDate).format('YYYY-MM-DD');
    
            console.log("Formatted dates:", { formattedStartDate, formattedEndDate });
    
            const transaction = await sequelize.transaction(); // Bắt đầu transaction
    
            try {
                // Truy vấn lấy ServiceID dựa trên tên dịch vụ
                const findServiceQuery = `
                    SELECT ServiceID 
                    FROM services 
                    WHERE Name = :name
                `;
                const [service] = await sequelize.query(findServiceQuery, {
                    replacements: { name },
                    type: sequelize.QueryTypes.SELECT,
                    transaction,
                });
    
                console.log("Service found:", service);
    
                if (!service) {
                    throw new Error("Service not found");
                }
    
                const serviceID = service.ServiceID;
                const updatePromotionQuery = `
                    UPDATE promotions
                    SET 
                        Description = :description,
                        DiscountPercentage = :discount,
                        StartDate = :startDate,
                        EndDate = :endDate
                    WHERE PromotionID = :promotionID
                `;
                await sequelize.query(updatePromotionQuery, {
                    replacements: {
                        promotionID,
                        description,
                        discount, 
                        startDate: formattedStartDate,
                        endDate: formattedEndDate
                    },
                    type: sequelize.QueryTypes.UPDATE,
                    transaction,
                });
                // Cập nhật bảng services để gán PromotionID
                const updateServiceQuery = `
                    UPDATE services 
                    SET PromotionID = :promotionID 
                    WHERE ServiceID = :serviceID
                `;
                const updateResult = await sequelize.query(updateServiceQuery, {
                    replacements: { promotionID, serviceID },
                    type: sequelize.QueryTypes.UPDATE,
                    transaction,
                });
    
                console.log("Update service result:", updateResult);
    
                // Commit giao dịch
                await transaction.commit();
                console.log("Transaction committed successfully");
    
                return {
                    success: true,
                    message: "Promotion updated and linked successfully",
                    data: {
                        promotionID,
                        serviceID,
                        name,
                        description,
                        discount,
                        startDate: formattedStartDate,
                        endDate: formattedEndDate,
                    },
                };
            } catch (error) {
                // Rollback giao dịch nếu xảy ra lỗi
                await transaction.rollback();
                console.error("Error during promotion update:", error);
                return { success: false, message: error.message };
            }
        } catch (err) {
            console.error("Error in updatePromotion:", err);
            throw err;
        }
    };   
        
    deletePromotion = async (promotionID) => {
        try {
            // Kiểm tra nếu không có promotionID
            if (!promotionID) {
                throw new Error("PromotionID is required.");
            }

            const transaction = await sequelize.transaction(); // Bắt đầu transaction

            try {
                // Kiểm tra promotion có tồn tại trong bảng promotions không
                const findPromotionQuery = `
                    SELECT * 
                    FROM promotions 
                    WHERE PromotionID = :promotionID
                `;
                const [promotion] = await sequelize.query(findPromotionQuery, {
                    replacements: { promotionID },
                    type: sequelize.QueryTypes.SELECT,
                    transaction,
                });

                if (!promotion) {
                    throw new Error("Promotion not found");
                }

                console.log("Promotion found:", promotion);

                // Cập nhật bảng services để xóa PromotionID
                const updateServiceQuery = `
                    UPDATE services
                    SET PromotionID = NULL
                    WHERE PromotionID = :promotionID
                `;
                const updateResult = await sequelize.query(updateServiceQuery, {
                    replacements: { promotionID },
                    type: sequelize.QueryTypes.UPDATE,
                    transaction,
                });

                console.log("Update services result:", updateResult);

                // Xóa promotion khỏi bảng promotions
                const deletePromotionQuery = `
                    DELETE FROM promotions
                    WHERE PromotionID = :promotionID
                `;
                const deleteResult = await sequelize.query(deletePromotionQuery, {
                    replacements: { promotionID },
                    type: sequelize.QueryTypes.DELETE,
                    transaction,
                });

                console.log("Delete promotion result:", deleteResult);

                // Commit giao dịch
                await transaction.commit();
                console.log("Transaction committed successfully");

                return {
                    success: true,
                    message: "Promotion deleted successfully",
                };
            } catch (error) {
                // Rollback nếu có lỗi
                await transaction.rollback();
                console.error("Error during promotion deletion:", error);
                return { success: false, message: error.message };
            }
        } catch (err) {
            console.error("Error in deletePromotion:", err);
            throw err;
        }
    };

}

module.exports = new PromotionsDashboard();

