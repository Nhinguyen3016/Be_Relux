const { z } = require("zod");

// Validation cho `workschedules`
const WorkScheduleSchema = z.object({
  DayOfWeek: z.string().min(3, "DayOfWeek must be at least 3 characters").max(100, "DayOfWeek can't exceed 100 characters").optional(),
  StartTime: z.string().regex(/^([0-9]{2}):([0-9]{2}):([0-9]{2})$/, "StartTime must be in HH:mm:ss format").optional(),
  EndTime: z.string().regex(/^([0-9]{2}):([0-9]{2}):([0-9]{2})$/, "EndTime must be in HH:mm:ss format").optional(),
  IsAvailable: z.boolean().optional(),
});
const validateWorkSchedule = (data) => {
  try {
    WorkScheduleSchema.parse(data);  
    console.log("Work schedule data is valid");
  } catch (err) {
    console.log("Validation error:", err.errors);
  }
};

module.exports = {
  validateWorkSchedule
};