const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const USER = require("../models/userSchema");

const getCustomerToken = require("../services/customerToken");

const router = express.Router();
const app = express();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

module.exports = () => {
  router.post("/", async (req, response) => {
    const { email } = req.body;
    let user = await USER.findOne({ email: email })
      .then((data) => data)
      .catch((err) => null);

    if (user) {
      console.log(req.body.merchantRefNum, user.customerId);
      let result = await getCustomerToken(
        req.body.merchantRefNum,
        user.customerId
      );
      response.send(result);
    } else {
      response.send(null);
    }
  });
  return router;
};
