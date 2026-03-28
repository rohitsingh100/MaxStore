const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    console.log("uri",process.env.MONGO_URI)
    const connection = await mongoose.connect(
      // ProcessingInstruction.env.MONGO_URI
      process.env.MONGO_URI
    );

    if (connection.STATES.connecting) {
      console.log(`Connecting DB to ${connection.host}`);
    }

    if (connection.STATES.connected) {
      console.log(`DB connected`);
    }

    if (connection.STATES.disconnected) {
      console.log(`Disconnected DB from ${connection.connection.host}`);
    }
  } catch (error) {
    console.log("Error connecting to database", error);
  }
};

module.exports = { connectDb };
// const connectDb = require("./db/connection");

