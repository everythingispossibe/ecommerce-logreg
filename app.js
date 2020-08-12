const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");
const config = require("./config/database");
const Post = require("./angular-src/models/post");

//konekcija na bazu -> config/database.js
var Schema = mongoose.Schema;
mongoose.connect(config.database, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//provjera konekcije na bazu
mongoose.connection.on("connected", () => {
  console.log("Connected to database" + config.database);
});
mongoose.connection.on("error", (err) => {
  console.log("Database error" + err);
});

const app = express();

const users = require("./routes/users");

const port = 3000;

//CORS
app.use(cors());

//set static folder - ovaj kod se load-a na root-u
app.use(express.static(path.join(__dirname, "public")));

//Body parser Middleware
app.use(bodyParser.json());

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

require("./config/passport")(passport);

app.use("/users", users);

//index route
app.get("/", (req, res) => {
  res.send("Invalid Endpoint");
});

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    price: req.body.price,
    content: req.body.content,
  });
  console.log(post);
  post.save();
  res.status(201).json({
    message: "Post added successfully",
  });
});

app.get("/api/posts", (req, res, next) => {
  Post.find().then((documents) => {
    //post od mongoosa koji je exportovan
    console.log(documents);

    res.status(200).json({
      message: "posts fetched successfuly!",
      posts: documents,
    });
  });
});

app.get("/api/posts/:id", (req, res, next) => {
  Post.findById({ _id: req.params.id }).then((docs) => {
    console.log(docs);
    res.status(200).json({ message: "Nadjen" });
  });
});

app.listen(port, () => {
  console.log("Server startet on port: " + 3000);
});
