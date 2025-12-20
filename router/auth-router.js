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
// Middlewares
const authMiddleware = require("../middlewares/auth-middleware");
const roleMiddleware = require("../middlewares/role-middleware");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });
// Validators
const { resisterValidator } = require("../validators/user-validators");
const { checkOutValidator } = require("../validators/checkout-validators");
// Routes
router.route("/api/auth/admin-register").post(authMiddleware, roleMiddleware(["admin"]), validators(resisterValidator), adminRegister);
router.route("/api/auth/admin-login").post(adminLogin);
router.route("/login").post(login);
router.route("/admin").post(admin);
router.route("/media").get(media);
router.route("/all-products").get(allProducts);
router.get("/all-orders", authMiddleware, roleMiddleware(["admin"]), Orders);
router.route("/register").post(validators(resisterValidator), register);
router.route("/checkout").post(validators(checkOutValidator), checkOut);
router.post("/upload-media", upload.array("media"), uploadMedia);
router.post("/add-new-product", authMiddleware, roleMiddleware(["admin", "product_entry_officer"]), addNewProduct);
router.post('/getsproductdata/', getsProductData);
router.get('/order-details/:id', orderDetails);
router.get('/product/slug/:slug', getProductSlug);
router.get('/single-product/:id', getSingleProductData);
router.put('/update-product/:id', editProduct);
router.put("/update-order-status/:orderid/:status", authMiddleware, roleMiddleware(["admin"]), orderStatusUpdate);
router.delete("/delete-product/:id", authMiddleware, roleMiddleware(["admin"]), deleteProductData);


module.exports = router;