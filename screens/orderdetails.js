const Order = require("../models/checkout-model");

const OrderDetails = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Validate ObjectId
        const checkOrderId = await Order.findOne({ orderid: id });

        if (!checkOrderId) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json({ message: "Order retrieved successfully", order: checkOrderId });
    } catch (error) {
        next({
            status: 500,
            message: "Something went wrong",
            extraMessage: error.message,
        });
    }
};

module.exports = OrderDetails;