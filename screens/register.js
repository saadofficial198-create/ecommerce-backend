const User = require("../models/user-model");

const register = async (req, res, next) => {
  try {
    const { name, email, phone, password } = req.body;
    const emailIsExist = await User.findOne({ email: email });
    if (emailIsExist) {
      return res.status(409).json({
        message: "Email Already Exist",
      });
    }
    const userCreated = await User.create({
      name,
      email,
      phone,
      password,
    });
    const err = {
      status: 201,
      message: "User Created Successfully",
      token: await userCreated.generateAuthToken(),
    };
    next(err);
  } catch (error) {
    const err = {
      status: 400,
      message: "Internal Server Error",
      extraMessage: error.message,
    };
    next(err);
  }
};
module.exports = register;
