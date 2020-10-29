const fetch = require("node-fetch");

let getCustomerToken = async (merchantRefNum, customerId) => {
  console.log("customerId", customerId);
  let options, uri, result;
  options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Basic cHJpdmF0ZS03NzUxOkItcWEyLTAtNWYwMzFjZGQtMC0zMDJkMDIxNDQ5NmJlODQ3MzJhMDFmNjkwMjY4ZDNiOGViNzJlNWI4Y2NmOTRlMjIwMjE1MDA4NTkxMzExN2YyZTFhODUzMTUwNWVlOGNjZmM4ZTk4ZGYzY2YxNzQ4",
      Simulator: "EXTERNAL",
    },
    body: {
      merchantRefNum,
      paymentTypes: ["CARD"],
    },
  };
  options["body"] = JSON.stringify(options.body);
  uri = `https://api.test.paysafe.com/paymenthub/v1/customers/${customerId}/singleusecustomertokens`;
  result = await fetch(uri, options)
    .then((res) => res.json())
    .then((json) => json);
  //console.log("result customer ", uri, result);
  return result;
};
module.exports = getCustomerToken;
