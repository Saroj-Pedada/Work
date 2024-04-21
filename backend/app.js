const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const bb = require("express-busboy");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const campsRouter = require("./routes/campsRouter");
const registrationRouter = require("./routes/registrationRouter");
const hospitalRouter = require("./routes/hospitalRouter");
const employeeRouter = require("./routes/employeeRouter");
const donationRouter = require("./routes/donationRouter");

const app = express();

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:3002",
    "https://medicalcamp-backend.onrender.com",
    "https://csm-multipurpose-organisation.vercel.app",
    "https://csm-backend.adaptable.app",
    "https://csmmultipurposeorganisation.com",
  ],
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

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
app.use("/employee", employeeRouter);
app.use("/donation", donationRouter);

const JWT_SECRET = process.env.JWT_SECRET;
const adminUser = { id: 1, username: process.env.ADMIN_USERNAME, password: process.env.ADMIN_PASSWORD };

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

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'csm@csmmultipurposeorganisation.com',
    pass: process.env.PASS,
  },
});

app.post('/send-email', (req, res) => {
  const { to, subject, text } = req.body;
  const mailOptions = {
    to: to,
    subject: subject,
    text: text,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error sending email');
    } else {
      res.status(200).send('Email sent successfully');
    }
  });
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
