const mongoose = require("mongoose");

require('dotenv').config();
// Connect to MongoDB
const dbConnection = 
mongoose
  .connect(`${process.env.Mongodb_uri}/studyplanner`)
  .then(() => {
    console.log("db Connected succesfully!")
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

// Export the mongoose connection
module.exports = dbConnection;