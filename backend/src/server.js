const express = require("express");

const app = express();

app.get("/", (req, res) => {
  return res.json({
    name: "eduardo",
    color: "red",
    sexo: "undefined"
  });
});

app.listen(3333);
