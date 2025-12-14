const express = require("express");
const router = express.Router();
const validators = require("../middlewares/validator-middleware");

// Screens
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
// Middlewares
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });
// Validators
const { resisterValidator } = require("../validators/user-validators");
const { checkOutValidator } = require("../validators/checkout-validators");
// Routes
router.route("/admin").post(admin);
router.route("/media").get(media);
router.route("/all-products").get(allProducts);
router.route("/all-orders").get(Orders);
router.post("/add-new-product", addNewProduct);
router.post("/upload-media", upload.array("media"), uploadMedia);
router.route("/register").post(validators(resisterValidator), register);
router.put('/update-product/:id', editProduct);
router.get('/single-product/:id', getSingleProductData);
router.get('/product/slug/:slug', getProductSlug);
router.post('/getsproductdata/', getsProductData);
router.delete('/delete-product/:id', deleteProductData);
router.route("/checkout").post(validators(checkOutValidator), checkOut);
router.get('/order-details/:id', orderDetails);
router.put('/update-order-status/:orderid/:status', orderStatusUpdate);


module.exports = router;