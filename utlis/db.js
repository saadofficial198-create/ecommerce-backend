const mongooes = require("mongoose");


const UIR = process.env.MONGOOES_URI;

const connectDb = async () => {
  try {
    await mongooes.connect(UIR);
  } catch (error) {
    console.error("Error in connecting to database");
    process.exit(1);
  }
};
module.exports = { connectDb };
