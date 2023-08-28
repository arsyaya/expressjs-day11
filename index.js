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

// dummy data (fake data) for testing
const dataBlog = [
  {
    // id: 1,
    name: "Hari-hari Semangat Ngoding",
    desc: "Ayo semuanya belajar ngoding ngopi standing yang mendang mending.",
    author: "Arsya Rizvadwinafisa",
    postAt: new Date(),
  },
  {
    // id: 2,
    name: "Mulai dengan nonton one piece",
    desc: "New World kami datang, bersiaplah para sichibukai aku akan menjadi raja bajak laut.",
    author: "Monkey D Luffy",
    postAt: new Date(),
  },
];

// routing render
app.get("/", home); // index home
app.get("/add-project", addProject); // add-project
app.get("/blog", blog); // blog
app.get("/blog-detail/:id", blogDetail); // blog-detail
app.get("/contact", contactMe); // contact me
app.get("/blog-edit/:id", editBlog); // halaman edit blog

// routing proses
app.post("/add-project", addBlog); // for post/create data in add-project
app.post("/blog-edit/:id", updateBlog); // for send update or edit blog
app.get("/delete-blog/:id", deleteBlog); // for delete blog data

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

// blog
function blog(req, res) {
  res.render("blog", { dataBlog });
}

// blog detail
function blogDetail(req, res) {
  const { id } = req.params;
  res.render("blog-detail", { data: dataBlog[id] });
}

// contact me
function contactMe(req, res) {
  res.render("contact-me");
}

// edit blog
function editBlog(req, res) {
  const { id } = req.params;
  res.render("blog-edit", { data: dataBlog[id], id });
}

// add new data blog
function addBlog(req, res) {
  const { name, desc } = req.body;

  const blog = {
    name,
    desc,
    image: "blog-img-detail.png",
    author: "Icang Markocang",
    postAt: new Date(),
  };

  dataBlog.push(blog);

  res.redirect("/blog");
}

// update edit
function updateBlog(req, res) {
  const { id } = req.params;

  const { name, desc } = req.body;

  dataBlog[id].name = name;
  dataBlog[id].desc = desc;
  console.log(dataBlog);
  res.redirect("/blog");
}

// delete
function deleteBlog(req, res) {
  const { id } = req.params;

  dataBlog.splice(id, 1);

  console.log({ id });

  res.redirect("/blog");
}
