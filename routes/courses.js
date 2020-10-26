const express = require("express");
const Joi = require("joi");
const router = express.Router();

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];

// app object has methods corresponding to the http methods
router.get("/", (req, res) => {
  //query a database irl
  res.send(courses);
});

//http post request to create a new course
router.post("/", (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) {
    // 400 bad request
    return res.status(400).send(error.details[0].message);
  }

  const course = {
    id: courses.length + 1,
    //validate what client sends you
    name: req.body.name,
  };
  courses.push(course);
  // client always needs to know about the properties of the course
  res.send(course);
});

router.put("/:id", (req, res) => {
  // find course
  // if not existing return 404
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    // 404
    return res
      .status(404)
      .send(`The course with the given ID ${req.params.id} was not found`);
  }

  //validate
  // if invalid return 400 - Bad request
  const { error } = validateCourse(req.body);
  if (error) {
    // 400 bad request
    return res.status(400).send(error.details[0].message);
  }
  //Update course
  // Return the updated course
  course.name = req.body.name;
  res.send(course);
});

// api/courses/1
router.get("/:id", (req, res) => {
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

router.delete("/:id", (req, res) => {
  //Look up
  // Not existing, return 404
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    // 404
    return res
      .status(404)
      .send(`The course with the given ID ${req.params.id} was not found`);
  }
  //Delete
  const index = courses.indexOf(course);
  courses.splice(index, 1);
  //Return the same course
  res.send(courses);
});

const validateCourse = (course) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(course);
};

module.exports = router;
