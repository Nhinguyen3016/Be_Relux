const schedulesDashboard = require("../../services/dashboard/schedules.service");
const { validateWorkSchedule } = require("../../validation/workSchedules.validate");
const {validateEmployee } = require("../../validation/employees.validate"); 

class schedulesController {
    getEmployees = async (req, res) => {
        try {
            console.log("Fetching employees...");
            const employees = await schedulesDashboard.getAllEmployees();
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
    getWorking = async (req, res) => {
        try {
            const schedules = await schedulesDashboard.getWorkingStaff();
            console.log(schedules);

            if (!schedules || schedules.length === 0) {
                return res.status(404).json({ message: "No data found." });
            }
            res.status(200).json({
                schedules: schedules
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Internal Server Error" });
        }
    };


    createSchedules = async (req, res) => {
    const { schedules } = req.body;

    try {
        if (!schedules || !Array.isArray(schedules) || schedules.length === 0) {
            return res.status(400).json({ message: "Schedules are required." });
        }

        // Lấy schedule đầu tiên vì chúng ta chỉ xử lý một nhân viên
        const schedule = schedules[0];
        const { name, dayOfWeek, startTime, endTime } = schedule;

        // Validate dữ liệu
        validateEmployee({ Name: name });
        validateWorkSchedule({ DayOfWeek: dayOfWeek, StartTime: startTime, EndTime: endTime });

        // Gọi service để thêm lịch làm việc
        const result = await schedulesDashboard.createSchedules({ 
            name, 
            dayOfWeek, 
            startTime, 
            endTime 
        });

        // Kiểm tra kết quả từ service trước khi trả về phản hồi
        if (result.success === false) {
            return res.status(400).json({
                success: false,
                message: result.message || "Error while creating schedule"
            });
        }

        // Trả về thành công nếu không có lỗi
        res.status(201).json({
            success: true,
            message: "Schedules created successfully",
            result
        });
    } catch (err) {
        console.error("Error schedules staff:", err);
        res.status(400).json({ 
            success: false,
            message: err.message || "Invalid data"
        });
    }
};

    
    updateSchedules = async (req, res) => {
        try {
            const { workScheduleID } = req.params;
            const { schedules } = req.body;

            console.log('Received update request:', { workScheduleID, schedules });

            if (!workScheduleID) {
                return res.status(400).json({ 
                    message: "Work Schedule ID is required." 
                });
            }

            if (!schedules || !Array.isArray(schedules) || schedules.length === 0) {
                return res.status(400).json({ 
                    message: "Schedule data is required." 
                });
            }

            const schedule = schedules[0];
            const { name, dayOfWeek, startTime, endTime } = schedule;

            // Validate dữ liệu
            validateEmployee({ Name: name });
            validateWorkSchedule({ DayOfWeek: dayOfWeek, StartTime: startTime, EndTime: endTime });

            const result = await schedulesDashboard.updateStaffSchedule({ 
                workScheduleID,
                name, 
                dayOfWeek, 
                startTime, 
                endTime 
            });

            res.status(200).json({
                success: true,
                message: "Staff schedule updated successfully",
                result
            });
        } catch (err) {
            console.error("Error updating staff schedule:", err);
            res.status(400).json({ 
                message: err.message || "Error updating staff schedule"
            });
        }
    };

    deleteSchedules = async (req, res) => {
        try {
            const { workScheduleID } = req.params;

            if (!workScheduleID) {
                return res.status(400).json({ 
                    message: "Work Schedule ID is required." 
                });
            }

            const result = await schedulesDashboard.deleteSchedules(workScheduleID);

            res.status(200).json({
                success: true,
                message: "Staff schedule deleted successfully",
                result
            });
        } catch (err) {
            console.error("Error deleting staff schedule:", err);
            res.status(500).json({ 
                message: err.message || "Error deleting staff schedule"
            });
        }
    };
}

module.exports = new schedulesController();
