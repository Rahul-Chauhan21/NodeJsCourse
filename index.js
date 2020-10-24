const express = require("express");

const app = express(); //by convection this func returns an object called app

// app object has methods corresponding to the http methods

// making a http get request at the end point '/'
app.get("/", (req, res) => {
  // callback function called a route handler
  res.send("Hello World!!");
});
// app.post();
// app.put();
// app.delete();
app.get("/api/courses", (req, res) => {
  //query a database irl
  res.send([1, 2, 3]);
});

// api/courses/1
app.get("/api/courses/:id", (req, res) => {
  res.send(req.params.id);
});

//PORT
// port is dyanmically assigned by the hosting environment & we can't rely on 3000 to be available
// PORT is an an environment variable(is the part of environment on which the process runs).
// process is global object
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
