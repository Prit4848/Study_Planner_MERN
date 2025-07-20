const mongoose = require("mongoose");
require('dotenv').config();

// Connect to MongoDB
const dbConnection = mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/studyplanner")
  .then((result) => {
    console.log("Database connected successfully!",result.connection.host)
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Export the mongoose connection
module.exports = dbConnection;