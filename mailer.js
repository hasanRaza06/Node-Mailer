import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER, 
    pass: process.env.MAIL_PASS,
  },
});

export const sendEmail = async (recipients, subject, message) => {
  if (!recipients) {
    throw new Error("Recipients are required");
  }

  const mailOptions = {
    from: process.env.MAIL_USER,  
    to: recipients,              
    subject,                     
    text: message,               
  };

  return transporter.sendMail(mailOptions);  
};
