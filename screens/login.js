const User = require("../modles/user-modle");
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // Check if email is exist
    const checkEmail = await User.findOne({ email });
    if (!checkEmail) {
      const err = { status: 404, message: "Email is not exist Register first" };
      return next(err);
    }
    const checkPass = await checkEmail.checkPassword(password);
    if (!checkPass) {
      const err = { status: 401, message: "Invaled Credentials" };
      return next(err);
    }
    // Every thing is perfect then send response
    const err = {
      status: 200,
      message: "User Lohin Successfully",
      token: await checkEmail.generateAuthToken(),
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

module.exports = login;
