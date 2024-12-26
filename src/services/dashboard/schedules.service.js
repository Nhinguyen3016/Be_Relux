const sequelize = require("../../sequelize");
const {validateWorkSchedule } = require("../../validation/workSchedules.validate");  
const {validateEmployee } = require("../../validation/employees.validate"); 
class schedulesDashboard {
    getAllEmployees = async () => {
        try {
            const query = `
                SELECT 
                    EmployeeID,
                    Name as EmployeeName
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
    // Lấy danh sách nhân viên và lịch làm việc
    getWorkingStaff = async () => {
        try {
            const query = `
            SELECT 
                e.Name as EmployeesName,
                ws.WorkScheduleID,
                ws.DayOfWeek,
                ws.StartTime,
                ws.EndTime
            FROM
                employeeworkschedules ews
            JOIN employees e ON ews.EmployeeID = e.EmployeeID
            JOIN workschedules ws ON ews.WorkScheduleID = ws.WorkScheduleID
            `;

            const results = await sequelize.query(query, {
                type: sequelize.QueryTypes.SELECT,
                raw: true,
            });
            console.log("Full results:", JSON.stringify(results, null, 2));
            return results;
        } catch (err) {
            console.error("Error fetching staff schedules:", err);
            throw err;
        }
    };
    createSchedules = async ({ name, dayOfWeek, startTime, endTime }) => {
        try {
            console.log("Creating schedule with data:", { name, dayOfWeek, startTime, endTime });
            
            // Tìm EmployeeID từ bảng employees dựa vào tên
            const findEmployeeQuery = `
                SELECT EmployeeID 
                FROM employees 
                WHERE Name = :name
            `;
            const [employee] = await sequelize.query(findEmployeeQuery, {
                replacements: { name },
                type: sequelize.QueryTypes.SELECT,
            });
    
            if (!employee) {
                throw new Error("Employee not found");
            }
    
            const employeeID = employee.EmployeeID;
            console.log("EmployeeID:", employeeID);
    
            // Kiểm tra xem nhân viên đã có lịch làm việc nào trong hệ thống chưa
            const existingScheduleAssignmentQuery = `
                SELECT * 
                FROM employeeworkschedules 
                WHERE EmployeeID = :employeeID
            `;
            const existingScheduleAssignment = await sequelize.query(existingScheduleAssignmentQuery, {
                replacements: { employeeID },
                type: sequelize.QueryTypes.SELECT,
            });
    
            // Nếu nhân viên đã có lịch làm việc, báo lỗi
            if (existingScheduleAssignment.length > 0) {
                return {
                    success: false,
                    message: "This employee already has a work schedule assigned"
                };
            }
    
            // Kiểm tra lịch làm việc có trong bảng workschedules chưa
            const existingScheduleQuery = `
                SELECT * 
                FROM workschedules 
                WHERE DayOfWeek = :dayOfWeek AND StartTime = :startTime AND EndTime = :endTime
            `;
            const existingSchedule = await sequelize.query(existingScheduleQuery, {
                replacements: { dayOfWeek, startTime, endTime },
                type: sequelize.QueryTypes.SELECT,
            });
    
            let workScheduleID;
            if (existingSchedule.length > 0) {
                // Nếu lịch đã tồn tại, lấy WorkScheduleID
                workScheduleID = existingSchedule[0].WorkScheduleID;
                console.log("Found existing WorkScheduleID:", workScheduleID);
            } else {
                // Nếu chưa có lịch, tạo mới
                const insertWorkScheduleQuery = `
                    INSERT INTO workschedules (DayOfWeek, StartTime, EndTime)
                    VALUES (:dayOfWeek, :startTime, :endTime)
                `;

                await sequelize.query(insertWorkScheduleQuery, {
                    replacements: { dayOfWeek, startTime, endTime },
                    type: sequelize.QueryTypes.INSERT,
                });
    
                // Lấy WorkScheduleID của bản ghi vừa chèn
                workScheduleID = await sequelize.query("SELECT LAST_INSERT_ID() AS WorkScheduleID", {
                    type: sequelize.QueryTypes.SELECT,
                }).then(result => result[0].WorkScheduleID);
    
                console.log("Created new WorkScheduleID:", workScheduleID);
    
                if (!workScheduleID) {
                    throw new Error("Failed to create WorkScheduleID");
                }
            }
    
            // Thêm lịch làm việc mới cho nhân viên
            const insertEmployeeWorkScheduleQuery = `
                INSERT INTO employeeworkschedules (EmployeeID, WorkScheduleID)
                VALUES (:employeeID, :workScheduleID)
            `;
            await sequelize.query(insertEmployeeWorkScheduleQuery, {
                replacements: { employeeID, workScheduleID },
                type: sequelize.QueryTypes.INSERT,
            });
    
            return {
                success: true,
                message: "Staff schedule added successfully",
                data: {
                    employeeID,
                    workScheduleID,
                    name,
                    dayOfWeek,
                    startTime,
                    endTime,
                },
            };
        } catch (err) {
            console.error("Error in createSchedules:", err);
            return {
                success: false,
                message: `Error in createSchedules: ${err.message}`,
            };
        }
    };
    

    updateStaffSchedule = async ({ workScheduleID, name, dayOfWeek, startTime, endTime }) => {
        try {

            // Validate dữ liệu đầu vào
            validateEmployee({ Name: name });
            validateWorkSchedule({ DayOfWeek: dayOfWeek, StartTime: startTime, EndTime: endTime });


            const transaction = await sequelize.transaction();

            try {
                // Kiểm tra xem workScheduleID có tồn tại không
                const checkScheduleQuery = `
                    SELECT WorkScheduleID 
                    FROM workschedules 
                    WHERE WorkScheduleID = :workScheduleID
                `;
                const [existingSchedule] = await sequelize.query(checkScheduleQuery, {
                    replacements: { workScheduleID },
                    type: sequelize.QueryTypes.SELECT,
                    transaction,
                });

                if (!existingSchedule) {
                    throw new Error('Work schedule not found');
                }

                // Lấy EmployeeID từ bảng employees
                const findEmployeeQuery = `
                    SELECT EmployeeID 
                    FROM employees 
                    WHERE Name = :name
                `;
                const [employee] = await sequelize.query(findEmployeeQuery, {
                    replacements: { name },
                    type: sequelize.QueryTypes.SELECT,
                    transaction,
                });

                if (!employee) {
                    throw new Error('Employee not found');
                }

                const employeeID = employee.EmployeeID;

                // Kiểm tra xem bản ghi đã tồn tại trong employeeworkschedules chưa
                const checkEmployeeScheduleQuery = `
                    SELECT * 
                    FROM employeeworkschedules 
                    WHERE WorkScheduleID = :workScheduleID AND EmployeeID = :employeeID
                `;
                const [existingEntry] = await sequelize.query(checkEmployeeScheduleQuery, {
                    replacements: { workScheduleID, employeeID },
                    type: sequelize.QueryTypes.SELECT,
                    transaction,
                });

                if (existingEntry) {
                    // Nếu bản ghi đã tồn tại, chỉ cần cập nhật thông tin
                    await sequelize.query(`
                        UPDATE employeeworkschedules 
                        SET EmployeeID = :employeeID
                        WHERE WorkScheduleID = :workScheduleID
                    `, {
                        replacements: { employeeID, workScheduleID },
                        type: sequelize.QueryTypes.UPDATE,
                        transaction,
                    });
                } else {
                    // Nếu bản ghi chưa tồn tại, thêm mới vào employeeworkschedules
                    await sequelize.query(`
                        INSERT INTO employeeworkschedules (EmployeeID, WorkScheduleID)
                        VALUES (:employeeID, :workScheduleID)
                    `, {
                        replacements: { employeeID, workScheduleID },
                        type: sequelize.QueryTypes.INSERT,
                        transaction,
                    });
                }

                // Cập nhật workschedules
                await sequelize.query(`
                    UPDATE workschedules 
                    SET 
                        DayOfWeek = :dayOfWeek,
                        StartTime = :startTime,
                        EndTime = :endTime
                    WHERE WorkScheduleID = :workScheduleID
                `, {
                    replacements: { 
                        workScheduleID,
                        dayOfWeek,
                        startTime,
                        endTime 
                    },
                    type: sequelize.QueryTypes.UPDATE,
                    transaction,
                });

                // Cập nhật employeeworkschedules
                await sequelize.query(`
                    UPDATE employeeworkschedules 
                    SET EmployeeID = :employeeID
                    WHERE WorkScheduleID = :workScheduleID
                `, {
                    replacements: { employeeID, workScheduleID },
                    type: sequelize.QueryTypes.UPDATE,
                    transaction,
                });

                await transaction.commit();
                return {
                    success: true,
                    message: "Staff schedule updated successfully",
                    data: {
                        workScheduleID,
                        employeeID,
                        name,
                        dayOfWeek,
                        startTime,
                        endTime
                    }
                };
            } catch (err) {
                await transaction.rollback();
                throw err;
            }
        } catch (err) {
            throw err;
        }
    };

    deleteSchedules = async (workScheduleID) => {
        try {
            const transaction = await sequelize.transaction();

            try {
                // Xóa liên kết trong bảng employeeworkschedules
                const deleteEmployeeWorkScheduleQuery = `
                    DELETE FROM employeeworkschedules 
                    WHERE WorkScheduleID = :workScheduleID
                `;
                await sequelize.query(deleteEmployeeWorkScheduleQuery, {
                    replacements: { workScheduleID },
                    type: sequelize.QueryTypes.DELETE,
                    transaction,
                });

                // Xóa lịch làm việc từ bảng workschedules
                const deleteWorkScheduleQuery = `
                    DELETE FROM workschedules 
                    WHERE WorkScheduleID = :workScheduleID
                `;
                await sequelize.query(deleteWorkScheduleQuery, {
                    replacements: { workScheduleID },
                    type: sequelize.QueryTypes.DELETE,
                    transaction,
                });

                await transaction.commit();
                return {
                    success: true,
                    message: "Staff schedule deleted successfully"
                };
            } catch (err) {
                await transaction.rollback();
                throw err;
            }
        } catch (err) {
            throw err;
        }
    };

}

module.exports = new schedulesDashboard();
