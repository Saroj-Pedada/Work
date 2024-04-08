const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const bb = require("express-busboy");
const jwt = require("jsonwebtoken");

const campsRouter = require("./routes/campsRouter");
const registrationRouter = require("./routes/registrationRouter");
const hospitalRouter = require("./routes/hospitalRouter");

const app = express();

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:3002",
    "https://medicalcamp-backend.onrender.com",
  ],
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
app.use("/hospital", hospitalRouter);

const JWT_SECRET = "mysecretkey";
const adminUser = { id: 1, username: "admin", password: "password" };

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === adminUser.username && password === adminUser.password) {
    const token = jwt.sign({ userId: adminUser.id }, JWT_SECRET);
    res.json({ token });
  } else {
    res.status(401).json({ message: "Invalid username or password" });
  }
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
