const express = require("express");

const app = express(); //by convection this func returns an object called app

// app object has methods corresponding to the http methods

// making a http get request at the end point '/'
app.get("/", (req, res) => {
  // callback function called a route handler
  res.send("Hello World");
});
// app.post();
// app.put();
// app.delete();
app.get("/api/courses", (req, res) => {
  //query a database irl
  res.send([1, 2, 3]);
});
app.listen(3000, () => {
  console.log("Listening on port 3000");
});
