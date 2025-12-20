const bcrypt = require("bcrypt");
const Admin = require("../models/user-model");

const adminRegister = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await Admin.findOne({ email });
    if (existingUser) return next({ status: 409, message: "User exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await Admin.create({ name, email, password: hashedPassword });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    next(error);
  }
};

module.exports = adminRegister;
