const z = require("zod");

const productSchema = z.object({
  id: z.string({ required_error: "Product ID is required" }).trim(),
  qty: z.number({ required_error: "Quantity is required" })
        .int({ message: "Quantity must be an integer" })
        .min(1, { message: "Quantity must be at least 1" }),
  variantIndex: z.number().int().optional(), // optional
});

const checkOutValidator = z.object({
  firstname: z
    .string({ required_error: "First name is required" })
    .trim()
    .min(4, { message: "First name must be at least 4 characters long" }),
  lastname: z
    .string({ required_error: "Last name is required" })
    .trim()
    .min(4, { message: "Last name must be at least 4 characters long" }),
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" }),
  phone: z
    .string({ required_error: "Phone number is required" })
    .trim()
    .min(10, { message: "Phone number must be at least 10 characters long" })
    .max(15, { message: "Phone number must be at most 15 characters long" }),
  address: z
    .string({ required_error: "Address is required" })
    .trim()
    .min(10, { message: "Address must be at least 10 characters long" })
    .max(100, { message: "Address must be at most 100 characters long" }),
  message: z
    .string()
    .trim()
    .min(10, { message: "Message must be at least 10 characters long" })
    .max(500, { message: "Message must be at most 500 characters long" })
    .or(z.literal("")),
  
  // ✅ Add productData validation
  productData: z
    .array(productSchema)
    .min(1, { message: "At least one product is required" }),
});

module.exports = { checkOutValidator };
