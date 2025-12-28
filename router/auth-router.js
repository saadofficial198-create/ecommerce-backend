const express = require("express");
const router = express.Router();
const validators = require("../middlewares/validator-middleware");

// Screens
const login = require("../screens/login");
const adminRegister = require("../screens/admin-register");
const adminLogin = require("../screens/admin-login");
const register = require("../screens/register");
const admin = require("../screens/admin");
const media = require("../screens/media");
const addNewProduct = require("../screens/addnewproduct");
const allProducts = require("../screens/allproducts");
const uploadMedia = require("../screens/upload-media");
const editProduct = require("../screens/editproduct");
const getSingleProductData = require("../screens/singleproduct");
const getProductSlug = require("../screens/getproductslug")
const deleteProductData = require("../screens/deleteproductdata");
const checkOut = require("../screens/checkout");
const getsProductData = require("../screens/getsproductdata.js");
const Orders = require("../screens/orders");
const orderDetails = require("../screens/orderdetails");
const orderStatusUpdate = require("../screens/orderstatusupdate");
const getCloudinaryDetials = require("../screens/getcloudinarydetials");
// Middlewares
const authMiddleware = require("../middlewares/auth-middleware");
// const roleMiddleware = require("../middlewares/role-middleware");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });
// Validators
const { resisterValidator } = require("../validators/user-validators");
const { checkOutValidator } = require("../validators/checkout-validators");
// Routes
// Post Routes
router.route("/api/auth/admin-register").post(validators(resisterValidator), adminRegister);
router.route("/api/auth/admin-login").post(adminLogin);
router.route("/login").post(login);
router.route("/admin").post(admin);
router.route("/checkout").post(validators(checkOutValidator), checkOut);
router.route("/register").post(validators(resisterValidator), register);
router.route("/api/add-new-product").post(authMiddleware, addNewProduct);
router.route('/api/get-products-data/').post(authMiddleware, getsProductData);
router.route("/api/upload-medias").post(authMiddleware, upload.array("media"), uploadMedia);
// Get Routes
router.route("/api/all-medias").get(authMiddleware, media);
router.route("/api/all-orders").get(authMiddleware, Orders);
router.route('/api/product/slug/:slug').get(getProductSlug);
router.route("/api/all-products").get(authMiddleware, allProducts);
router.route('/api/order-details/:id').get(authMiddleware, orderDetails);
router.route('/api/single-product/:id').get(authMiddleware, getSingleProductData);
router.route("/api/get-cloudinary-details").get(authMiddleware, getCloudinaryDetials);
// Put  Routes
router.route('/api/update-product/:id').put(editProduct);
router.route("/api/update-order-status/:orderid/:status").put(authMiddleware, orderStatusUpdate);
// Delete Routes
router.route("/api/delete-product/:id").delete(authMiddleware, deleteProductData);

module.exports = router;