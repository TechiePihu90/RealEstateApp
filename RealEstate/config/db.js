const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables


const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI)
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    // });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;



