const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");
const config = require("./config/database");

//konekcija na bazu -> config/database.js
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

app.listen(port, () => {
  console.log("Server startet on port: " + 3000);
});
