const Media = require("../models/media-model");

const media = async (req, res, next) => {
  try {
    const data = await Media.find(); // <-- sari products nikal layga
    res.status(200).json(data); // front-end ko data bhej dega
  } catch (error) {
    next({
      status: 500,
      message: "Something went wrong",
      extraMessage: error.message,
    });
  }
};

module.exports = media;