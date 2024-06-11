const express = require("express");
const path = require("path");
const app = express();
const _PORT = process.env.PORT;
const cors = require("cors");
app.use(cors());
app.use(express.json());

const buildPath = path.join(__dirname, "../client/build");

app.use(express.static(buildPath));

// CONNECT TO DB
const username = process.env.USERNAME,
  password = process.env.PASSWORD,
  database = process.env.DB;

const mongoose = require("mongoose");
mongoose.connect(
  `mongodb+srv://${username}:${password}@cluster0.mdrhxlt.mongodb.net/${database}?retryWrites=true&w=majority&appName=Cluster0`
);

// USER MODEL
const UserModel = require("./models/Users");

// get request
app.get("/users", async (req, res) => {
  const users = await UserModel.find();
  res.json(users);
});

// create user
app.post("/createUser", async (req, res) => {
  const newUser = new UserModel(req.body);
  await newUser.save();

  res.json(req.body);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

app.listen(_PORT, () => {
  console.log("server works 11");
});
