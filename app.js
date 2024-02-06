// const express = require("express");
// const connection = require("./connection/db");
// require('dotenv').config();
// const userRoutes = require("./routes/user");

// const app = express();
// app.use(express.json());

// // Register user routes
// app.use("/api/user", userRoutes);

// app.listen(process.env.PORT, async () => {
//   try {
//     await connection;
//     console.log("Connected to MongoDB");
//   } catch (error) {
//     console.error("Error connecting to MongoDB:", error);
//   }
//   console.log(`Server is running at ${process.env.PORT}`);
// });
const express = require("express");
const connection = require("./connection/db");
require('dotenv').config();
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin"); // Import admin routes

const app = express();
app.use(express.json());

// Authentication middleware - Example: assuming you have a middleware function to authenticate users


// Register user routes
app.use("/api/user", userRoutes);
// Apply authentication middleware to admin routes
app.use("/api/admin", adminRoutes);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
  console.log(`Server is running at ${process.env.PORT}`);
});
