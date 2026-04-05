const express = require("express");

// initialize express
const app = express();
const dotenv = require("dotenv");
dotenv.config();

// port Number
const port = process.env.PORT || 5000;
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const { readdirSync } = require("fs");
const { connectDb } = require("./db/connection");

const pincodeRoutes = require("./routes/pincodeRoutes");
const settingRoutes = require("./routes/settingRoutes");
const productRoutes = require("./routes/productRoutes");
const { getProducts } = require("./controllers/productController");
const paymentRoutes = require("./routes/paymentRoutes")
const orderRoutes = require("./routes/OrderRoutes")
const reviewRoutes = require("./routes/ReviewRoutes")

// handing connection errors
// app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(
  cors({
    origin: "https://mern-frontend-nine-iota.vercel.app/*",
  })
);
app.use(express.json());

connectDb();

// GET, PUT, POST, DELETE;
app.get("/", (req, res) => {
  res.send(`<center><h1>Server Running on PORT: ${port} </h1></center>`);
});

// dynamically include routes

app.use("/api/auth", authRoutes);
app.use("/api/auth", pincodeRoutes);

app.use("/api/settings", settingRoutes);
app.use("/api/products", productRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/order", orderRoutes);


app.use("/api/reviews", reviewRoutes);


// listen to port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
