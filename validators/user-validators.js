const z = require("zod");

const resisterValidator = z.object({
  name: z
    .string({ required_error: "Username is required" })
    .trim()
    .min(5, { message: "Username must be at least 5 characters" })
    .max(20, { message: "Username must be at most 20 characters" }),

  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email format" }),

  password: z
    .string({ required_error: "Password is required" })
    .min(8, "At least 8 characters required")
    .max(100, "At most 100 characters allowed"),

  phone: z
    .string({ required_error: "Phone number is required." })
    .trim()
    .min(1, { message: "Phone number is required." })
});
const loginValidator = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email format" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, { message: "Password is required" }),
});
const contantValidator = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(1, { message: "Name is required" }),
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email format" }),
  message: z
    .string({ required_error: "Password is required" })
    .min(1, { message: "Message is required" }),
});

module.exports = { resisterValidator, loginValidator, contantValidator };