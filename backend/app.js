const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const bb = require("express-busboy");

const campsRouter = require("./routes/campsRouter");
const registrationRouter = require("./routes/registrationRouter");
const hospitalRouter = require("./routes/hospitalRouter");

const app = express();

const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:3002"],
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

bb.extend(app, {
  upload: true,
  path: __dirname + "/uploads",
  allowedPath: /./,
  strip: function (value, type) {
    return value;
  },
});

app.use("/camps", campsRouter);
app.use("/registration", registrationRouter);
app.use("/hospital",hospitalRouter);

app.listen(3002, () => {
  console.log("Server running...");
});
