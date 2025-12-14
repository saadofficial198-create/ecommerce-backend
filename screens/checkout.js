const Order = require("../models/checkout-model");
const { sendOrderConfirmation } = require("../utlis/emailService");

const checkOut = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      email,
      phone,
      address,
      message,
      productData,
      paymentMethod
    } = req.body;

    const formattedProducts = productData.map(p => ({
      productId: p.id,
      qty: p.qty,
      ...(p.variantIndex !== undefined && { variantIndex: p.variantIndex })
    }));

    const orderCreated = await Order.create({
      firstname,
      lastname,
      email,
      phone,
      address,
      message,
      products: formattedProducts,
      paymentMethod: paymentMethod || "Cash on Delivery"
    });

    // send email to customer
    sendOrderConfirmation(email, orderCreated.orderid, firstname);

    return res.status(201).json({
      message: "Order Received Successfully",
      orderId: orderCreated.orderid,
    });
  } catch (error) {
    console.error("Checkout error:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      extraMessage: error.message,
    });
  }
};

module.exports = checkOut;
