const express = require("express");
const { dirname } = require("path");
const app = express();
const port = 5000;
const path = require("path");

// setup call hbs with sub folder
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "src/view"));

// set serving static file
app.use(express.static("src/asset"));

// parsing data from client
app.use(express.urlencoded({ extended: false }));

// routing
app.get("/", home); // index
app.get("/add-project", addProject); // add project
app.get("/contact", contactMe); // contact me
app.post("/add-project", addBlog);

// local server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// function for routing
// index
function home(req, res) {
  res.render("index");
}

// add project
function addProject(req, res) {
  res.render("add-project");
}

// add new data blog
function addBlog(req, res) {
  const { name, desc } = req.body;

  console.log(name);
  console.log(desc);

  res.redirect("/");
}

// contact me
function contactMe(req, res) {
  res.render("contact-me");
}
