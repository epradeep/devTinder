const express = require("express");

const app = express();

//app.use("/route", rh1, [rh2,rh3], rh4);

app.use(
  "/user",
  [
    (req, res, next) => {
      console.log("Route Handler 1");
      // res.send("Route Handler 1");
      next();
    },
    (req, res, next) => {
      console.log("Route Handler 2");
      // res.send("Route Handler 2");
      next();
    },
  ],
  (req, res) => {
    console.log("Route Handler 3");
    res.send("Route Handler 3");
  },
);

app.listen(3000, () => {
  console.log("Server connected successfully on port 3000...");
});
