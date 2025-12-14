// backend/utils/emailService.js
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail", // you can use gmail, outlook, yahoo etc.
  auth: {
    user: process.env.EMAIL_USER, // your email
    pass: process.env.EMAIL_PASS, // your app password (not your real password!)
  },
});

const sendOrderConfirmation = async (to, orderId, firstname) => {
  try {
    await transporter.sendMail({
      from: `"E-come 2025" <${process.env.EMAIL_USER}>`,
      to,
      subject: "Your Order Confirmation",
      html: `
        <div style="font-family: Arial, sans-serif; padding:20px; border:1px solid #ddd;">
          <h2 style="color:#4CAF50;">Hello ${firstname},</h2>
          <p>Thank you for your order!</p>
          <p>Your order <b>#${orderId}</b> has been received and is being processed.</p>
          <hr/>
          <p style="font-size:12px; color:#555;">This is an automated message, please do not reply.</p>
        </div>
      `,
    });
    console.log("Order confirmation email sent to", to);
  } catch (error) {
    console.error("Email sending error:", error);
  }
};

module.exports = { sendOrderConfirmation };
