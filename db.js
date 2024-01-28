// db.js
const mongoose = require("mongoose");

const connectToDatabase = async () => {
    try {
        await mongoose.connect(
            "mongodb+srv://sriramsenthilnathan:blue@cluster0.iqa0ckt.mongodb.net/Blue?retryWrites=true&w=majority",
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

module.exports = connectToDatabase;
