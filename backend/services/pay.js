const { json } = require("express");

fetch = require("node-fetch");
let pay = async (body) => {
  var options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Basic cHJpdmF0ZS03NzUxOkItcWEyLTAtNWYwMzFjZGQtMC0zMDJkMDIxNDQ5NmJlODQ3MzJhMDFmNjkwMjY4ZDNiOGViNzJlNWI4Y2NmOTRlMjIwMjE1MDA4NTkxMzExN2YyZTFhODUzMTUwNWVlOGNjZmM4ZTk4ZGYzY2YxNzQ4",
      Simulator: "EXTERNAL",
    },
  };
  let mybody = body;
  delete mybody.email;
  options["body"] = JSON.stringify(mybody);
  let status = await fetch(
    "https://api.test.paysafe.com/paymenthub/v1/payments",
    options
  )
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      return json.status;
    });
  return status;
};
module.exports = pay;
