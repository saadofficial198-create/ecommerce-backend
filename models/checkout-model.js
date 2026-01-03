const mongoose = require("mongoose");
const Product = require("./product-model");
// ======================
// Utility to format time
// ======================
const formatCustomDate = require("../utlis/orderController");

// ==========================
// Product Sub Schema
// ==========================
const productSubSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    qty: {
        type: Number,
        required: true,
        default: 1,
    },
    variantIndex: {
        type: Number,
        required: false,
    }
}, { _id: false });

// ==========================
// Status History Sub Schema
// ==========================
const statusHistorySchema = new mongoose.Schema({
    status: {
        type: String,
        required: true,
        enum: [
            "pending",
            "processing",
            "on-hold",
            "shipped",
            "delivered",
            "failed",
            "cancelled",
            "returned",
            "refunded",
            "partially-shipped",
        ],
    },
    changedAt: {
        type: Object,
        default: null,
    },
}, { _id: false });

// ==========================
// Manual Default Status History
// ==========================
const defaultStatusHistory = [
    { status: "pending", changedAt: formatCustomDate() },
    { status: "processing", changedAt: null },
    { status: "on-hold", changedAt: null },
    { status: "partially-shipped", changedAt: null },
    { status: "shipped", changedAt: null },
    { status: "delivered", changedAt: null },
    { status: "returned", changedAt: null },
    { status: "refunded", changedAt: null },
    { status: "failed", changedAt: null },
    { status: "cancelled", changedAt: null },
];

// ==========================
// Checkout Schema
// ==========================
const checkOutSchema = new mongoose.Schema({
    orderid: {
        type: String,
        unique: true,
    },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    message: { type: String, default: "" },
    shipping: { type: String, default: "Standard Shipping (3-7 days)" },

    products: [productSubSchema],

    total: {
        type: Number,
        required: true,
        default: 0,
    },

    paymentMethod: {
        type: String,
        enum: ["Cash on Delivery", "Bank Transfer", "Check payments"],
        default: "Cash on Delivery",
    },

    status: {
        type: String,
        enum: [
            "pending",
            "processing",
            "on-hold",
            "shipped",
            "delivered",
            "failed",
            "cancelled",
            "returned",
            "refunded",
            "partially-shipped",
        ],
        default: "pending",
    },

    statusHistory: {
        type: [statusHistorySchema],
        default: defaultStatusHistory,
    },

    createdAtFormatted: {
        type: Object,
        default: formatCustomDate,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// ==========================
// Pre-save for Order ID
// ==========================
checkOutSchema.pre("save", async function (next) {
    if (!this.orderid) {
        let exists = true;
        let newId;

        while (exists) {
            newId = String(Math.floor(Math.random() * 10000)).padStart(4, "0");
            exists = await mongoose.model("orders").exists({ orderid: newId });
        }
        this.orderid = newId;
    }
    next();
});

// ✅ Automatic status push remove kar diya gaya hai
// ==========================
// Total calculation
// ==========================
checkOutSchema.pre("save", async function (next) {
    let totalAmount = 0;
    for (const item of this.products) {
        const productId = typeof item.productId === "string" ? item.productId.trim() : item.productId;
        let product;
        try {
            product = await Product.findById(productId);
        } catch (err) {
            continue; // skip invalid IDs
        }
        if (!product) continue;

        let price = product.price;

        if (Array.isArray(product.variants) && item.variantIndex !== undefined) {
            const variant = product.variants[item.variantIndex];
            if (variant && typeof variant.price === "number") {
                price = variant.price;
            }
        }

        totalAmount += price * item.qty;
    }

    this.total = totalAmount += 350; // Adding fixed shipping fee
    next();
});

const orderModel = mongoose.model("orders", checkOutSchema);
module.exports = orderModel;
