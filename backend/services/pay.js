const USER = require("../models/userSchema");
const savedata = require("./saveUser");

fetch = require("node-fetch");
let pay = async (body) => {
  let addUser, mybody, email, merchantCustomerId;
  merchantCustomerId = "custom" + Math.floor(Math.random() * 1000000);
  addUser = false;
  var options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Basic cHJpdmF0ZS03NzUxOkItcWEyLTAtNWYwMzFjZGQtMC0zMDJkMDIxNDQ5NmJlODQ3MzJhMDFmNjkwMjY4ZDNiOGViNzJlNWI4Y2NmOTRlMjIwMjE1MDA4NTkxMzExN2YyZTFhODUzMTUwNWVlOGNjZmM4ZTk4ZGYzY2YxNzQ4",
      Simulator: "EXTERNAL",
    },
  };
  mybody = body;
  if (
    mybody.hasOwnProperty("customerOperation") &&
    mybody["customerOperation"] === "ADD"
  ) {
    addUser = true;
    delete mybody.customerOperation;
    let user = await USER.findOne({ email: email })
      .then((data) => data)
      .catch((err) => null);
    if (user) {
      options["customerId"] = user.customerId;
    } else {
      options["merchanCustomerId"] = merchantCustomerId;
    }
  }
  email = mybody.email;
  delete mybody.email;
  options["body"] = JSON.stringify(mybody);
  let response = await fetch(
    "https://api.test.paysafe.com/paymenthub/v1/payments",
    options
  )
    .then((res) => res.json())
    .then((json) => {
      return json;
    });
  console.log("breakpoint => ", response);
  if (addUser && response.status === "COMPLETED") {
    savedata(email, options, merchantCustomerId);
  }
  return response.status;
};
module.exports = pay;
