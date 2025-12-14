const Orders = require("../models/checkout-model")

const allOrders = async (req, res, next) => {
  try {
    const orders = await Orders.find(); // <-- sari orders nikal layga
    res.status(200).json(orders); // front-end ko data bhej dega
  } catch (error) {
    next({
      status: 500,
      message: "Something went wrong",
      extraMessage: error.message,
    });
  }
};

module.exports = allOrders;