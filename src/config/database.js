const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://namastedev:32KGOYbd5RDtWtPX@namastenode.lozzper.mongodb.net/devTinder",
  );
};

module.exports = connectDB;
