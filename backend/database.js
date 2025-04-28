const mongoose = require('mongoose');

const mongoUrl = "mongodb://localhost:27017/topnews"; // Replace 'topnews' with your database name

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoUrl)
        console.log("Connected to MongoDB successfully!");
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error.message);
        process.exit(1); // Exit the process with failure
    }
};

module.exports = connectToMongo;
