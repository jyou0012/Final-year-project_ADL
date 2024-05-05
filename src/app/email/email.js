var nodemailer = require('nodemailer');

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: '7098group25y@gmail.com',
        pass: 'comp7098'
    }
});

// Function to send email
const sendEmail = (to, subject, text) => {
    const mailOptions = {
        from: '7098group25y@gmail.com',
        to: to,
        subject: subject,
        text: text
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email: ', error);
        } else {
            console.log('Email sent: ', info.response);
        }
    });
};

module.exports = sendEmail;
