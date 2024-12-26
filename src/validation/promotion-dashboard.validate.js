const { z } = require("zod");

const promotionSchema = z.object({
    name: z.string()
        .min(1, "Name is required")
        .min(3, "Name must be at least 3 characters")
        .max(255, "Name must be at most 255 characters"),
    description: z.string()
        .min(1, "Description is required")
        .min(5, "Description must be at least 5 characters")
        .max(1000, "Description must be at most 1000 characters"),
    discount: z.number()
        .min(1, "Discount is required")
        .int("Discount must be an integer")
        .nonnegative("Discount must be a positive number")
        .max(100, "Discount must be at most 100"),
    startDate: z.string()
        .refine((val) => !isNaN(Date.parse(val)), {
            message: "StartDate must be a valid date",
        })
        .refine((val) => new Date(val) >= new Date(), {
            message: "StartDate cannot be earlier than today",
        }),
    endDate: z.string()
        .refine((val) => !isNaN(Date.parse(val)), {
            message: "EndDate must be a valid date",
        })
        .refine((val) => new Date(val) >= new Date(), {
            message: "EndDate cannot be earlier than today",
        })
}).refine((data) => {
    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);
    
    if (endDate <= startDate) {
        throw new Error("EndDate must be after StartDate");
    }
    
    return true;
}, {
    message: "EndDate must be after StartDate",
    path: ["endDate"]
});

// Validation function
const validatePromotion = (data) => {
    try {
        const result = promotionSchema.parse(data);
        return { valid: true };
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.error("Validation errors:", error.errors);
            return { 
                valid: false, 
                errors: error.errors.map(err => ({
                    path: err.path,
                    message: err.message
                }))
            };
        }
        throw error;
    }
};

module.exports = {
    validatePromotion,
};