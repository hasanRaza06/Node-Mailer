import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: parseInt(process.env.MAIL_PORT), 
  secure: false, 
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export const sendEmail = async ({ recipants, subject, message }) => {
  try {
    const result = await transport.sendMail({
      from: 'hasan.numetry@gmail.com', 
      to: recipants,
      subject,
      text: message,
      html: message,
    });
    console.log('Email sent successfully:', result);
    return result;
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
