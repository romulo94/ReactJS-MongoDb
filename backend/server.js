const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const dbRoute = require("./db");
const departament = require("./api/routes/departament")
const user = require("./api/routes/user")
const transition = require("./api/routes/transition")

const API_PORT = 3001;
var cors = require('cors');

const app = express();
app.use(cors());

mongoose.connect(
  dbRoute.DB,
  { useNewUrlParser: true }
);

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger("dev"));

app.use("/departament", departament)
app.use("/user", user)
app.use("/transition", transition)
app.use("/transition/:id", transition)
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));