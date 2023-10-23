require("dotenv").config(); // Load environment variables from .env file

const mongoose = require("mongoose");

const connectDb = async () => {
  let dbString = process.env.MONGODB_URI;
  if (process.env.NODE_ENV === "test") {
    dbString = "mongodb://localhost:27017/testDB";
  }

  try {
    await mongoose.connect(dbString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};

module.exports = { connectDb };
