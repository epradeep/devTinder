const express = require("express");

const app = express();

app.use("/hello", (req, res) => {
  res.send("Hello Pradeep");
});

app.use("/test", (req, res) => {
  res.send("test from the server...");
});

app.listen(3000, () => {
  console.log("Server connected successfully on port 3000...");
});
