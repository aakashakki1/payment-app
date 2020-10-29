const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const USER = require("../models/userSchema");

const router = express.Router();
const app = express();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

module.exports = () => {
  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Basic cHJpdmF0ZS03NzUxOkItcWEyLTAtNWYwMzFjZGQtMC0zMDJkMDIxNDQ5NmJlODQ3MzJhMDFmNjkwMjY4ZDNiOGViNzJlNWI4Y2NmOTRlMjIwMjE1MDA4NTkxMzExN2YyZTFhODUzMTUwNWVlOGNjZmM4ZTk4ZGYzY2YxNzQ4",
      Simulator: "EXTERNAL",
    },
  };

  router.post("/", async (req, response) => {
    const { email } = req.body;
    console.log(email);
    USER.findOne({ email: email })
      .then((data) => {
        if (data) {
        } else {
          response.send(null);
        }
      })
      .catch((err) => response.send(null));
  });
  return router;
};
