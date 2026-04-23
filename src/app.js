const express = require("express");

const app = express();

app.get("/user/:userId/:name/:password", (req, res) => {
  console.log(req.params);
  res.send({ firstName: "Pradeep", lastName: "Etika" });
});

app.listen(3000, () => {
  console.log("Server connected successfully on port 3000...");
});
