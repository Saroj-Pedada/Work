const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const cookieParser = require('cookie-parser');
const { sendOTP } = require('./utils/nodemailer');
const userRouter = require('./routes/userRouter');
const campRouter = require('./routes/campRouter');
const hospitalRouter = require('./routes/hospitalRouter');
const workRouter = require('./routes/workRouter');
const authRouter = require('./routes/authRouter');
const donationRouter = require('./routes/donationRouter');
const presidentRouter = require('./routes/presidentRouter');
const { createTables } = require('./utils/db');
const bodyParser = require("body-parser");
let otpStore = {};

app.use(cors({
    origin: [
        "http://localhost:3000",
        "http://localhost:3002",
        "https://medicalcamp-backend.onrender.com",
        "https://csm-backend.adaptable.app",
        "https://csmmultipurposeorganisation.com",
    ],
    credentials: true,
    optionSuccessStatus: 200,
}
));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/user", userRouter);
app.use("/camp", campRouter);
app.use("/hospital", hospitalRouter);
app.use("/work", workRouter);
app.use("/auth", authRouter);
app.use("/donation", donationRouter);
app.use("/president", presidentRouter);
createTables();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Endpoint to send OTP and set it as a cookie
app.post('/send-otp', async (req, res) => {
    const { email } = req.body;
    try {
        const otp = await sendOTP(email);
        otpStore[email] = otp; // Store OTP in memory
        res.status(200).send('OTP sent successfully');
    } catch (err) {
        res.status(500).send('Error sending OTP');
    }
});

// Endpoint to verify OTP
app.post('/verify-otp', (req, res) => {
    const { email, otp } = req.body;

    // Compare OTP from store with the user-provided OTP
    if (otpStore[email] && otpStore[email] === otp) {
        res.status(200).send('OTP verified successfully');
        delete otpStore[email];  // OTP used, so delete it
    } else {
        res.status(400).send('Invalid OTP');
    }
});

const port = process.env.PORT || 3002;
app.listen(port, () => console.log(`Server listening on port ${port}!`));
