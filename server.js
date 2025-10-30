const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Sample base64 image (1x1 pixel placeholder - replace with your actual base64 image)
// To convert your image: https://elmah.io/tools/base64-image-encoder/
const sampleImage =
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";

// Professional data - Customize this with your information
const professionalData = {
  professionalName: "Henry Ugochukwu",
  base64Image: sampleImage,
  nameLink: {
    firstName: "Henry",
    url: "https://www.example.com",
  },
  primaryDescription: " is a Full Stack Developer",
  workDescription1:
    "I specialize in building modern web applications using React, Node.js, and MongoDB. With a passion for clean code and user-centric design, I create solutions that are both functional and beautiful.",
  workDescription2:
    "Currently working on exciting projects involving cloud infrastructure, microservices architecture, and responsive web design. Always eager to learn new technologies and tackle challenging problems.",
  linkTitleText: "Connect with me:",
  linkedInLink: {
    text: "LinkedIn Profile",
    link: "https://www.linkedin.com/in/ugochukwuhenryy",
  },
  githubLink: {
    text: "GitHub Profile",
    link: "https://github.com/ugochukwu16henry",
  },
  contactText:
    "Feel free to reach out for collaborations or just a friendly chat!",
};

// GET endpoint for professional data
app.get("/professional", (req, res) => {
  res.json(professionalData);
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Test the API at: http://localhost:${PORT}/professional`);
});
