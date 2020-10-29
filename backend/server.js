const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

const app = express();
const port = 3000;
app.use(cors());

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Basic cHJpdmF0ZS03NzUxOkItcWEyLTAtNWYwMzFjZGQtMC0zMDJkMDIxNDQ5NmJlODQ3MzJhMDFmNjkwMjY4ZDNiOGViNzJlNWI4Y2NmOTRlMjIwMjE1MDA4NTkxMzExN2YyZTFhODUzMTUwNWVlOGNjZmM4ZTk4ZGYzY2YxNzQ4",
    Simulator: "EXTERNAL",
  },
};

app.post("/payment", async (req, response) => {
  options["body"] = JSON.stringify(req.body);
  let status = await fetch(
    "https://api.test.paysafe.com/paymenthub/v1/payments",
    options
  )
    .then((res) => res.json())
    .then((json) => json.status);
  response.send(status);
});

app.listen(3000, () => {
  console.log(`Express server listening on port ${port}!`);
});
