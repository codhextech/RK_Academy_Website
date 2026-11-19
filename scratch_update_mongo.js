const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const uri = "mongodb+srv://thigamparan12_db_user:Thigan123456@cluster0.2sqfcvl.mongodb.net/rk_academy?retryWrites=true&w=majority";

// Read the stories from frontend/data/store.json
const storePath = path.join(__dirname, 'frontend', 'data', 'store.json');
const storeData = JSON.parse(fs.readFileSync(storePath, 'utf8'));
const stories = storeData.stories;

console.log(`Found ${stories.length} stories in store.json`);

async function updateMongo() {
  try {
    console.log("Connecting to MongoDB Atlas...");
    await mongoose.connect(uri);
    console.log("Connected to MongoDB!");

    const db = mongoose.connection.db;
    const storiesCol = db.collection('stories');

    // Delete existing stories
    const deleteResult = await storiesCol.deleteMany({});
    console.log(`Deleted ${deleteResult.deletedCount} old stories from MongoDB.`);

    // Insert all 18 new stories
    const insertResult = await storiesCol.insertMany(stories);
    console.log(`Successfully inserted ${insertResult.insertedCount} authentic reviews into MongoDB!`);

    await mongoose.disconnect();
    console.log("Disconnected cleanly.");
  } catch (err) {
    console.error("MongoDB Error:", err);
    process.exit(1);
  }
}

updateMongo();
