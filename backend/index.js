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

app.use(cors({
    origin: 'https://csmmultipurposeorganisation.com',
    methods: ['GET', 'POST'],
    credentials: true,
    optionsSuccessStatus: 200
}));

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

// Endpoint to send OTP and set it as a cookie
app.post('/send-otp', async (req, res) => {
    const { email } = req.body;
    try {
        const otp = await sendOTP(email);
        res.cookie('otp', otp, {
            httpOnly: true,
            maxAge: 15 * 60 * 1000,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict'
        });

        res.status(200).send('OTP sent successfully');
    } catch (err) {
        res.status(500).send('Error sending OTP');
    }
});

// Endpoint to verify OTP using cookie
app.post('/verify-otp', (req, res) => {
    const { email, otp } = req.body;
    const otpFromCookie = req.cookies.otp;  // Get OTP from cookie

    // Compare OTP from cookie with the user-provided OTP
    if (otpFromCookie && otpFromCookie === otp) {
        res.status(200).send('OTP verified successfully');
        delete otpStore[email];  // OTP used, so delete it
    } else {
        res.status(400).send('Invalid OTP');
    }
});

const port = process.env.PORT || 3002;
app.listen(port, () => console.log(`Server listening on port ${port}!`));
