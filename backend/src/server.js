const express = require("express");
const mongoose = require("mongoose");
const mongooseKey = require("../credentials/universal_key.json").key;
const routes = require("./routes");

const app = express();

mongoose.connect(
  `mongodb+srv://eduhdev:${mongooseKey}@cluster0-hsic3.mongodb.net/airbnb?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

app.use(express.json());
app.use(routes);

app.listen(3333);
