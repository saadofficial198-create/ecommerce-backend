const APIFeatures = require("../utlis/apiFeatures");
const modelMap = require("../models/modelMap");

module.exports = async (req, res) => {
  const { resource } = req.params;
  const Model = modelMap[resource];

  if (!Model) {
    return res.status(404).json({
      success: false,
      message: "Invalid resource",
    });
  }

  const features = new APIFeatures(Model.find(), req.query)
    .filter()
    .sort()
    .paginate();

  const data = await features.query;

  res.json({
    success: true,
    results: data.length,
    data,
  });
};