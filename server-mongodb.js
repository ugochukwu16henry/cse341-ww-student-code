const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const app = express();
const PORT = 8080;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection string
const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb+srv://ugochukwuhenry:1995Mobuchi@cluster.mongodb.net/";
const DB_NAME = "portfolioDB";
const COLLECTION_NAME = "professional";

let db;
let professionalCollection;

// Connect to MongoDB
async function connectToMongoDB() {
  try {
    console.log("🔄 Attempting to connect to MongoDB Atlas...");

    const client = new MongoClient(MONGO_URI);
    await client.connect();

    console.log("✅ Connected to MongoDB Atlas successfully!");

    db = client.db(DB_NAME);
    professionalCollection = db.collection(COLLECTION_NAME);

    console.log(`📁 Using database: ${DB_NAME}`);
    console.log(`📦 Using collection: ${COLLECTION_NAME}`);

    // Check if data exists, if not, seed it
    const count = await professionalCollection.countDocuments();
    console.log(`📊 Documents in collection: ${count}`);

    if (count === 0) {
      console.log("🌱 No data found. Seeding database...");
      await seedData();
    } else {
      console.log("✨ Database already contains data");
    }
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);

    if (error.message.includes("authentication")) {
      console.error(
        "💡 Check your username and password in the connection string"
      );
    } else if (error.message.includes("network")) {
      console.error(
        "💡 Check your network and MongoDB Atlas IP whitelist settings"
      );
    }

    process.exit(1);
  }
}

// Seed initial data
async function seedData() {
  const sampleImage =
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";

  const initialData = {
    professionalName: "John Doe",
    base64Image: sampleImage,
    nameLink: {
      firstName: "John",
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
      link: "https://www.linkedin.com/in/yourprofile",
    },
    githubLink: {
      text: "GitHub Profile",
      link: "https://github.com/yourusername",
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
