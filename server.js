const dotenv = require("dotenv").config();
const { NODE_ENV, PORT } = process.env;
require("colors");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/ProductRoutes");
const errorHandler = require("./middleware/errorMiddlware");
const app = express();
const connectDB = require("./config/dbConnect");

// database connection
connectDB();
//Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: ["http://localhost:3000", "https://shopIQ.vercel.app"],
    credentials: true,
  })
);

//Routes

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send("Home Page..");
});

// errormiddleware
app.use(errorHandler);

// App Running
app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON :-> "${NODE_ENV}"!`.cyan);
  console.log(`SERVER LISTENING ON PORT :-> ${PORT}!`.green);
});
