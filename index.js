const debug = require("debug")("app:startup");
const config = require("config");
const morgan = require("morgan");
const helmet = require("helmet");
const logger = require("./middleware/logger");
const authenticate = require("./middleware/authentication");
const courses = require("./routes/courses");
const home = require("./routes/home");
const express = require("express");
const app = express(); //by convection this func returns an object called app

app.set("view engine", "pug");

// middleware
app.use(express.json()); //parse the body of request into a json object by setting/populating the request.body property
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public")); //served from the root
app.use(helmet());
app.use("/api/courses", courses);
app.use("/", home);

// Config
console.log("Application Name: " + config.get("name"));
console.log("Mail Server: " + config.get("mail.host"));
console.log("Mail Password: " + config.get("mail.password"));

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  debug("Morgan enabled...");
}

app.use(logger);
app.use(authenticate);

//PORT
// port is dyanmically assigned by the hosting environment & we can't rely on 3000 to be available
// PORT is an an environment variable(is the part of environment on which the process runs).
// process is global object
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
