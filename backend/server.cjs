const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// Middleware
const corsOptions = {
    origin: "https://idx.google.com/dragdrop-1708483",
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed methods
    credentials: true, // Allow credentials if needed
};

// Use CORS middleware
app.use(cors(corsOptions));
app.use(express.json());

async function connectDB() {
    try {
        await mongoose.connect("mongodb+srv://nik:1234@cluster0.lpymyoj.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0");
        console.log("Connected to DB");
    } catch (error) {
        console.log("DB Connection Error:", error);
    }
}

// Use the task routes
app.use("/tasks", require("./routes/task.routes.cjs"));


  


app.listen(5001, () => {
    connectDB(); // Start DB connection
    console.log("Server started on port 5000");
});
