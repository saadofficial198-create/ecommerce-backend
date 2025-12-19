const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 1. Find user & include password
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next({ status: 401, message: "Invalid credentials" });
    }

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next({ status: 401, message: "Invalid credentials" });
    }

    // 3. Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET_TOKEN,
    );

    // 4. Send response
    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    next("error");
  }
};

module.exports = login;