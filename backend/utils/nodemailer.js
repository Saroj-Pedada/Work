const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.hostinger.com',
    port: 587,  // Use 465 for SSL, 587 for TLS
    secure: false,  // Set to true if using port 465 (SSL)
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

function generateOTP(length = 6) {
    const digits = '0123456789';
    let otp = '';
    for (let i = 0; i < length; i++) {
        otp += digits[Math.floor(Math.random() * digits.length)];
    }
    return otp;
}

function sendOTP(email) {
    return new Promise((resolve, reject) => {
        const otp = generateOTP(6);

        // Mail options for the OTP email
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Your OTP for Verification',
            text: `Your OTP is: ${otp}`,
            html: `<p>Your OTP is: <strong>${otp}</strong></p>`
        };

        // Send the email with OTP
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject('Error sending OTP: ' + error);
            } else {
                resolve(otp);
            }
        });
    });
}

function sendEmail(email, subject, message) {
    // Mail options for the email
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject,
        text: message
    };

    // Send the email    
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email: ' + error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = {sendOTP, sendEmail};
