const Admin = require("../models/admin-model");
const admin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // Check if email is exist
    const checkEmail = await User.findOne({ email });
    if (!checkEmail) {
      const err = { status: 401, message: "Invalid Credentials" };
      return next(err);
    }
    const checkPass = await checkEmail.checkPassword(password);
    if (!checkPass) {
      const err = { status: 401, message: "Invalid Credentials" };
      return next(err);
    }
    // Every thing is perfect then send response
    const err = {
      status: 200,
      message: "Login Successfully",
      // token: await checkEmail.generateAuthToken(),
    };
    next(err);
  } catch (error) {
    const err = {
      status: 500,
      message: error.message,
      errorMessage: "Internal Server Error",
    };
    return next(err);
  }
};

module.exports = admin;
