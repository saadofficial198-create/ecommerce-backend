const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
// First time than hash the password before saving
userSchema.pre("save", async function (next) {
  try {
    const user = this;
    if (!user.isModified("password")) {
      next();
    }
    const saltRound = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(user.password, saltRound);
    user.password = newPassword;
  } catch (error) {
    next(error);
  }
});
// Check password is same
userSchema.methods.checkPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    console.error(error);
  }
};
// Auth Generate Token
userSchema.methods.generateAuthToken = async function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
      },
      process.env.JWT_SECRET_TOKEN,

    );
  } catch (error) {
    console.error(error);
  }
};

const User = mongoose.model("User", userSchema);
module.exports = User;
