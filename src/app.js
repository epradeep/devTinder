const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignupData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  //valiadate the data
  validateSignupData(req);

  const { firstName, lastName, emailId, password } = req.body;

  //Encript the password
  const passwordHash = await bcrypt.hash(password, 10);

  //Creating new instance of the User model
  const user = new User({
    firstName,
    lastName,
    emailId,
    password: passwordHash,
  });

  try {
    await user.save();
    res.send("User added succeessfull!");
  } catch (err) {
    res.status(400).send("ERROR" + err.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    // const isPasswordValid = await bcrypt.compare(password, user.password);
    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      const token = await user.getJWT();

      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.send("Login Successfull!!");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR" + err.message);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR" + err.message);
  }
});

app.post("/sendConnectionReuest", userAuth, async (req, res) => {
  //sending a connection request
  const user = req.user;

  console.log("Sending a connection request");
  res.send(user.firstName + "Connection Request Sent!");
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
