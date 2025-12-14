const Product = require("../models/product-model")
const Deleteproductdata = async (req, res, next) => {
    const { id } = req.params;
    try {
        const result = await Product.findByIdAndDelete(id); // Mongoose
        if (!result) return next({ status: 404, message: "Product Not Found" });
        next({
            status: 200,
            message: "Product Delete Successfully",
        });
    } catch (err) {
        next({
            status: 500,
            message: "Internal server error",
        });
    }
};
module.exports = Deleteproductdata;