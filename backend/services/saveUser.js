const USER = require("../models/userSchema");
let savedata = async (email, options) => {
  let merchantCustomerId = "custom" + Math.floor(Math.random() * 1000000);
  options["body"] = { merchantCustomerId };
  options.body = JSON.stringify(options.body);
  console.log(options);
  let response = await fetch(
    "https://api.test.paysafe.com/paymenthub/v1/customers",
    options
  )
    .then((res) => res.json())
    .then((json) => {
      console.log("careting a customer", json);
      return json;
    });
  if (response.status === "ACTIVE") {
    console.log("id = ", response.id);
    const newuser = new USER({
      email: email,
      customerId: response.id,
    });
    newuser
      .save()
      .then((res) => res)
      .catch((err) => err);
  }
};

module.exports = savedata;
