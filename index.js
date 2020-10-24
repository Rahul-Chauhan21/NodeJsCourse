const express = require("express");

const app = express(); //by convection this func returns an object called app

// middleware
app.use(express.json());

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];
// app object has methods corresponding to the http methods

// making a http get request at the end point '/'
app.get("/", (req, res) => {
  // callback function called a route handler
  res.send("Hello World!!");
});

// app.put();
// app.delete();
app.get("/api/courses", (req, res) => {
  //query a database irl
  res.send(courses);
});

//http post request to create a new course
app.post("/api/courses", (req, res) => {
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  // client always needs to know about the properties of the course
  res.send(course);
});

// api/courses/1
app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    // 404
    res
      .status(404)
      .send(`The course with the given ID ${req.params.id} was not found`);
  } else {
    res.send(course);
  }
});

//PORT
// port is dyanmically assigned by the hosting environment & we can't rely on 3000 to be available
// PORT is an an environment variable(is the part of environment on which the process runs).
// process is global object
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
