const { z } = require("zod");

const EmployeeSchema = z.object({
    EmployeeID: z.number().optional(),
    Name: z.string().min(2, "Name must be at least 2 characters").max(255, "Name can't exceed 255 characters"),
    Description: z.string().optional(),
    Phone: z.string().max(20, "Phone number can't exceed 20 characters").optional(),
    Email: z.string().email("Invalid email format").max(255, "Email can't exceed 255 characters").optional(),
    SpecialtyType: z.string().optional(),
    Status: z.string().optional(),
    HireDate: z.string().optional(), // Ensure you handle this field properly based on format
    Avatar: z.string().optional(),
    LocationID: z.number().optional(),
    LocationName: z.string().optional(), 
  });
  const EmployeeCreateDTOSchema = EmployeeSchema.omit({
    serviceId: true,
  });
  const EmployeeUpdateDTOSchema = EmployeeSchema.partial();

  const validateEmployee = (data) => {
    try {
      EmployeeSchema.parse(data);  // Kiểm tra dữ liệu theo schema
      console.log("Employee data is valid");
    } catch (err) {
      console.log("Validation error:", err.errors);  // In ra lỗi nếu dữ liệu không hợp lệ
      throw err;  // Ném lại lỗi để controller có thể xử lý
    }
  };
  
  module.exports = {
    validateEmployee,
    EmployeeCreateDTOSchema,
    EmployeeUpdateDTOSchema
  };