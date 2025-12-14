const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  roll: {
    type: String,
    required: true, 
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// First time than hash the password before saving
adminSchema.pre("save", async function (next) {
  try {
    const admin = this;
    if (!admin.isModified("password")) {
      next();
    }
    const saltRound = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(admin.password, saltRound);
    admin.password = newPassword;
  } catch (error) {
    next(error);
  }
});
// Check password is same
adminSchema.methods.checkPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    console.error(error);
  }
};
// Auth Generate Token
adminSchema.methods.generateAuthToken = async function () {
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

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;