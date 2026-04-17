const express = require("express");

const app = express();

app.get("/user", (req, res) => {
  res.send({ firstName: "Pradeep", lastName: "Etika" });
});

app.post("/user", (req, res) => {
  console.log(req.body);
  //saving data to DB
  res.send("Data successfully saved on database!");
});

app.patch("/user", (req, res) => {
  res.send("Data updated successfully!");
});

app.delete("/user", (req, res) => {
  res.send("Data deleted successfully!");
});

//this will match all the HTTP method API calls to /test
app.use("/test", (req, res) => {
  res.send("Hello Pradeep");
});

app.listen(3000, () => {
  console.log("Server connected successfully on port 3000...");
});
