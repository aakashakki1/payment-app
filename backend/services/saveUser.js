const USER = require("../models/userSchema");

let savedata = async (email, options) => {
  let merchantCustomerId = "custom" + Math.floor(Math.random() * 1000000);

  options["body"] = { merchantCustomerId };
  options.body = JSON.stringify(options.body);
  let response = await fetch(
    "https://api.test.paysafe.com/paymenthub/v1/customers",
    options
  )
    .then((res) => res.json())
    .then((json) => {
      return json;
    });

  if (response.status === "ACTIVE") {
    // means the customer profile is created at paysafe
    const newuser = new USER({
      email: email,
      customerId: response.id,
    });
    // saving user to database
    newuser
      .save()
      .then((res) => res)
      .catch((err) => err);
  }
};

module.exports = savedata;
