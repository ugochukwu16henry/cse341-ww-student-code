const { MongoClient } = require("mongodb");

// Your MongoDB Atlas connection string
const MONGO_URI =
  "mongodb+srv://ugochukwuhenry:1995Mobuchi@cluster.mongodb.net/";

async function testConnection() {
  let client;

  try {
    console.log("Attempting to connect to MongoDB...");

    // Create a new MongoClient
    client = new MongoClient(MONGO_URI);

    // Connect to MongoDB
    await client.connect();

    console.log("✅ Successfully connected to MongoDB Atlas!");

    // Test the connection by listing databases
    const adminDb = client.db().admin();
    const dbList = await adminDb.listDatabases();

    console.log("\n📁 Available databases:");
    dbList.databases.forEach((db) => {
      console.log(
        `  - ${db.name} (${(db.sizeOnDisk / 1024 / 1024).toFixed(2)} MB)`
      );
    });

    // Test a simple operation
    const testDb = client.db("portfolioDB");
    const collections = await testDb.listCollections().toArray();

    console.log("\n📦 Collections in portfolioDB:");
    if (collections.length === 0) {
      console.log("  (No collections yet - will be created on first insert)");
    } else {
      collections.forEach((col) => {
        console.log(`  - ${col.name}`);
      });
    }

    console.log("\n✨ Connection test completed successfully!");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:");
    console.error("Error:", error.message);

    if (error.message.includes("authentication")) {
      console.log("\n💡 Tip: Check your username and password");
    } else if (error.message.includes("network")) {
      console.log(
        "\n💡 Tip: Check your network connection and Atlas IP whitelist"
      );
    }
  } finally {
    // Close the connection
    if (client) {
      await client.close();
      console.log("\n🔌 Connection closed.");
    }
  }
}

// Run the test
testConnection();
