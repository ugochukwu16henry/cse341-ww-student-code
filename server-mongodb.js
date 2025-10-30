const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const app = express();
const PORT = 8080;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection string - Update with your credentials
const MONGO_URI = 'mongodb+srv://ugochukwuhenry:1995Mobuchi@cluster.mongodb.net/';
const DB_NAME = "portfolioDB";
const COLLECTION_NAME = "professional";

let db;
let professionalCollection;

// Connect to MongoDB
async function connectToMongoDB() {
  try {
    const client = new MongoClient(MONGO_URI);
    await client.connect();
    console.log("Connected to MongoDB successfully");

    db = client.db(DB_NAME);
    professionalCollection = db.collection(COLLECTION_NAME);

    // Check if data exists, if not, seed it
    const count = await professionalCollection.countDocuments();
    if (count === 0) {
      await seedData();
    }
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
}

// Seed initial data
async function seedData() {
  const sampleImage =
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";

  const initialData = {
    professionalName: "Henry Ugochukwu",
    base64Image: sampleImage,
    nameLink: {
      firstName: "Henry",
      url: "https://ugochukwu16henry.github.io/myportolio/",
    },
    primaryDescription: " is a Full Stack Developer",
    workDescription1:
      "I specialize in building modern web applications using React, Node.js, and MongoDB. With a passion for clean code and user-centric design, I create solutions that are both functional and beautiful.",
    workDescription2:
      "Currently working on exciting projects involving cloud infrastructure, microservices architecture, and responsive web design. Always eager to learn new technologies and tackle challenging problems.",
    linkTitleText: "Connect with me:",
    linkedInLink: {
      text: "LinkedIn Profile",
      link: "https://www.linkedin.com/in/ugochukwuhenry",
    },
    githubLink: {
      text: "GitHub Profile",
      link: "https://github.com/ugochukwu16henry",
    },
    contactText:
      "Feel free to reach out for collaborations or just a friendly chat!",
  };

  try {
    await professionalCollection.insertOne(initialData);
    console.log("Database seeded with initial data");
  } catch (error) {
    console.error("Error seeding data:", error);
  }
}

// GET endpoint for professional data
app.get("/professional", async (req, res) => {
  try {
    const data = await professionalCollection.findOne(
      {},
      { projection: { _id: 0 } }
    );

    if (!data) {
      return res.status(404).json({ error: "Professional data not found" });
    }

    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// PUT endpoint to update professional data (bonus)
app.put("/professional", async (req, res) => {
  try {
    const result = await professionalCollection.updateOne(
      {},
      { $set: req.body },
      { upsert: true }
    );

    res.json({ message: "Data updated successfully", result });
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Server is running",
    database: db ? "Connected" : "Disconnected",
  });
});

// Start server after MongoDB connection
connectToMongoDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Test the API at: http://localhost:${PORT}/professional`);
  });
});

// Graceful shutdown
process.on("SIGINT", async () => {
  console.log("\nShutting down gracefully...");
  process.exit(0);
});
