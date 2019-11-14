const express = require("express");
const mongoose = require("mongoose");
const mongooseKey = require("../credentials/universal_key.json").key;
const cors = require("cors");
const path = require("path");
const routes = require("./routes");

const app = express();

mongoose.connect(
  `mongodb+srv://eduhdev:${mongooseKey}@cluster0-hsic3.mongodb.net/airbnb?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

app.use(cors());
app.use(express.json());
app.use("/files", express.static(path.resolve(__dirname, "..", "uploads")));
app.use(routes);

app.listen(3333);
