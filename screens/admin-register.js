const bcrypt = require("bcrypt");
const Admin = require("../models/admin-model");

const adminRegister = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await Admin.findOne({ email });
    if (existingUser) return next({ status: 409, message: "Already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await Admin.create({ name, email, password: hashedPassword, role });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    next(error);
  }
};

module.exports = adminRegister;
