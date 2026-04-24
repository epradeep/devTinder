const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();

app.post("/signup", async (req, res) => {
  //Creating new instance of the User model
  const user = new User({
    firstName: "Raju",
    lastName: "Nandu",
    emailId: "raju@gmail.com",
    password: "raju@123",
  });

  try {
    await user.save();
    res.send("User added succeessfull!");
  } catch (err) {
    res.status(400).send("Error saving the user" + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database connection established...");
    app.listen(3000, () => {
      console.log("Server connected successfully on port 3000...");
    });
  })
  .catch((err) => {
    console.error("Database connot be connected!!");
  });
