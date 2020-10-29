const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const routes = require("./routes/initiatePayment");
const pay = require("./services/pay");
const app = express();

const port = 3000;
app.use(cors());

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

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
  console.log("my status", status);
  return response.send(status);
});

app.listen(3000, () => {
  console.log(`Express server listening on port ${port}!`);
});
