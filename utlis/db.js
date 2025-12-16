const mongoose = require("mongoose");

const URI = "mongodb+srv://SaadOfficial198:PA98tCSEd8V6fOJj@cluster0.zgveznu.mongodb.net/ecom-2025?retryWrites=true&w=majority";

const connectDb = async () => {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to database:", error);
    process.exit(1);
  }
};
module.exports = { connectDb };
