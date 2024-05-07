const nodemailer = require('nodemailer');

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false,
    auth: {
        user: 'group25y@outlook.com',
        pass: 'Comp7098'
    }
});

// Function to send email
const sendEmail = ({to = 'youjiayu99@gmail.com', subject, text}) => {
    const mailOptions = {
        from: 'group25y@outlook.com',
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
