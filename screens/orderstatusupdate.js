const Order = require("../models/checkout-model");
const formatCustomDate = require("../utlis/orderController");

const orderStatusUpdate = async (req, res, next) => {
  try {
    const { orderid, status } = req.params;

    const order = await Order.findOne({ orderid });
    if (!order) return next({ status: 404, message: "Order not found" });

    const existingStatusIndex = order.statusHistory.findIndex(
      (item) => item.status === status
    );

    if (existingStatusIndex !== -1) {
      // ✅ Agar status already hai to bas date update karo
      order.statusHistory[existingStatusIndex].changedAt = formatCustomDate();
    } else {
      // ✅ Agar status nahi hai to naya add karo
      order.statusHistory.push({ status, changedAt: formatCustomDate() });
    }

    order.status = status;
    await order.save();

    return next({
      status: 200,
      message: "Order status updated successfully",
      data: order.statusHistory,
    });

  } catch (error) {
    next({
      status: 500,
      message: "Something went wrong",
      extraMessage: error.message,
    });
  }
};

module.exports = orderStatusUpdate;