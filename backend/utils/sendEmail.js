import nodemailer from 'nodemailer';

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST, // Use your email provider
    port: process.env.SMTP_PORT, // Use your email provider's SMTP port
    service: 'gmail', // Use your email service provider
    auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email password or app-specific password
    },
});

// Function to send email
export const sendEmail = async (to, subject, text) => {
    const mailOptions = {
        from: process.env.EMAIL_USER, // Sender address
        to, // List of recipients
        subject, // Subject line
        text, // Plain text body
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully to:', to);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

export default sendEmail;
