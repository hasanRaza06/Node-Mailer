import express from "express";
import { sendEmail } from "./mailer.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.post("/send-email", async (req, res) => {
  const { to, subject, text } = req.body;

  if (!to || !subject || !text) {
    return res.status(400).json({ message: "Missing required fields: to, subject, text" });
  }

  try {
    const info = await sendEmail(to, subject, text);
    res.status(200).json({ message: "Email sent successfully", info });
  } catch (error) {
    console.error("Error sending email:", error.message);
    res.status(500).json({ message: "Failed to send email", error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
