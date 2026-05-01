const express = require("express");

const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");

requestRouter.post("/sendConnectionReuest", userAuth, async (req, res) => {
  //sending a connection request
  const user = req.user;

  console.log("Sending a connection request");
  res.send(user.firstName + "Connection Request Sent!");
});

module.exports = requestRouter;
