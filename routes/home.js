const express = require("express");
const router = express.Router();
// making a http get request at the end point '/'
router.get("/", (req, res) => {
  // callback function called a route handler
  res.render("index", { title: "My Express App", message: "Hello" });
});

module.exports = router;
