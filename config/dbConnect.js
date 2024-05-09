const mongoose = require("mongoose");
const { MONGO_URI, NODE_ENV } = process.env;

const connectDB = async (req, res) => {
  try {
    const conn = await mongoose.connect(MONGO_URI);
    console.log(`MONGODB CONNECTED AT :-> "${NODE_ENV}"`.cyan);
    console.log(`MONGODB CONNECTED AT :-> ${conn.connection.host}`.cyan);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

mongoose.connection.on("disconnected", () => {
  console.log(`MONGODB DISCONNECTED FROM :-> "${NODE_ENV}" Database`.red);
});

mongoose.connection.on("connected", () => {
  console.log(`MONGODB CONNECTED WITH :-> "${NODE_ENV}" Database`.green);
});

module.exports = connectDB;
