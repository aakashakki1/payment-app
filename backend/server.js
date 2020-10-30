const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

const routes = require("./routes/initiatePayment");
const pay = require("./services/pay");
const app = express();

app.use(cors());

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

let port = process.env.PORT || 3000;
let host = "0.0.0.0";

// connecting with database

mongoose
  .connect(
    "mongodb+srv://ak:ROIIM123@cluster0.tht0j.mongodb.net/ROIIM?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  )
  .then(() => console.log("DATABASE CONNECTION SUCCESFULLY ESTABLISHED"))
  .catch((err) => console.log(err));

// initiating payment
app.use("/initiatePayment", routes());
// finsihing payment

app.post("/", async (req, response) => {
  let status = await pay(req.body);
  return response.send(status);
});

app.listen(port, host, () => {
  console.log(`Express server listening on port ${port}!`);
});
