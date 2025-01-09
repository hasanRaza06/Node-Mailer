import express from "express";
import dotenv from "dotenv";
import { sendEmail } from "./mailer.js";

dotenv.config();

const app = express();
app.use(express.json());

app.post("/send", async (req, res) => {
  const { name, email, message, subject } = req.body;

  if (!name || !email || !message || !subject) {
    return res.status(400).send("All fields (name, email, message, subject) are required.");
  }

  const recipants = `${name} <${email}>`;

  try {
    await sendEmail({ recipants, subject, message });
    console.log("Message sent");
    res.send(`Message successfully sent to ${email}`);
  } catch (err) {
    console.error("Error sending email:", err);
    res.status(500).json({message:"Failed to send the email."});
  }                       
});

app.listen(5000, () => {
  console.log("Your server is running on port 5000");
});
