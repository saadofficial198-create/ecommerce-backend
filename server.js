require("dotenv").config();
const express = require("express");
const app = express();
const router = require("./router/auth-router");
const db = require("./utlis/db");
const responseMiddleware = require("./middlewares/response-handler");
const cors = require("cors");


const allowedOrigins = [
  "https://admin-professional.vercel.app/"
];


app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 Backend server is running successfully",
  });
});

app.use(express.json());
app.use("/", router);
app.use(responseMiddleware);

// Check Connection
const port = process.env.PORT || 7000;
db.connectDb().then(
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  })
);
