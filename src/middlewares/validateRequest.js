const { z } = require('zod');

const dateRegex = /^\d{2}-\d{2}-\d{4}$/;
const dateTimeRegex = /^\d{2}-\d{2}-\d{4}T\d{2}:\d{2}:\d{2}$/;

const getDefaultDueDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 7); // Add 7 days
    return today.toISOString().split("T")[0].split("-").reverse().join("-"); // Convert to dd-mm-yyyy
};

// Define Task Schema Validation
const taskSchema = z.object({
    title: z.string().max(255, "Title too long"),
    description: z.string().optional(),
    due_date: z.string().refine((date) => {
        // Check if format is valid (dd-mm-yyyy)
        if (!dateRegex.test(date)) return false;

        // Convert to ISO format (yyyy-mm-dd) for validation
        const [day, month, year] = date.split("-");
        const parsedDate = new Date(`${year}-${month}-${day}`);
        // ✅ Ensure the comparison is only by date (ignore time)
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset time to 00:00:00
        parsedDate.setHours(0, 0, 0, 0);

        return !isNaN(parsedDate) && parsedDate >= today;
    }, { message: "Due date must be in 'dd-mm-yyyy' format and cannot be in the past" }).default(getDefaultDueDate()),
    // status: z.string().max(20).optional().default("Pending"),
    // completed_at: z.string().nullable().optional().refine((dateTime) => {
    //     if (!dateTime) return true; // Allow null or undefined

    //     if (!dateTimeRegex.test(dateTime)) return false;

    //     const [datePart, timePart] = dateTime.split("T");
    //     const [day, month, year] = datePart.split("-");
    //     const parsedDate = new Date(`${year}-${month}-${day}T${timePart}`);

    //     return !isNaN(parsedDate);
    // }, { message: "Completed date must be in 'dd-mm-yyyyTHH:MM:SS' format" }),
});

// Generic Middleware for Validation
const validateRequest = (schema) => (req, res, next) => {
    try {
        const result = schema.safeParse(req.body);

        if (!result.success) {
            // Extract meaningful error messages
            const errors = result.error.errors.map(err => ({
                field: err.path.join("."), // Field name
                message: err.message,      // Human-readable message
            }));
            return res.status(400).json({ errors });
        }

        req.body = result.data;
        next();
    } catch (error) {
        console.error("validateRequest:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { validateRequest, taskSchema };
