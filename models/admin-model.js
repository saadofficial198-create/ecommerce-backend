const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },

    role: {
      type: String,
      enum: ["admin", "product_entry_officer", "user"],
      default: "user",
    },
  },
  { timestamps: true }
);

const Admin = mongoose.model("Admin", userSchema);
module.exports = Admin;