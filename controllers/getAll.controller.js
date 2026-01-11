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

  const filterObj = { ...req.query };
  const excludeFields = ["page", "sort", "limit"];
  excludeFields.forEach((el) => delete filterObj[el]);

  const totalCount = await Model.countDocuments(filterObj);

  const features = new APIFeatures(Model.find(), req.query)
    .filter()
    .sort()
    .paginate();

  const data = await features.query;

  res.json({
    success: true,
    totalCount,
    results: data.length,
    data,
  });
};