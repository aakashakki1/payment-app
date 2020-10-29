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
    let body = req.body;
    delete body.email;
    options.body = JSON.stringify(body);
    let status = await fetch(
      "https://api.test.paysafe.com/paymenthub/v1/payments",
      options
    )
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        return json.status;
      });
    //console.log(options);
    //console.log(status);
    return response.send(status);
  });
  return router;
};
