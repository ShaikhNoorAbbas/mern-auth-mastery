import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
// configuring env path
dotenv.config({ path: ".env" });

//assigning express inside app
let app = express();

// Middlewares 
app.use(express.json()) // -> Allows us to read JSON data sent from React (req.body)
app.use(cors()); // ->  Allows React to talk to us basically communication between different ports

// Connecting to MongoDB and calling function
connectDB()

//Route
app.get('/', (req, res) => {
    res.send("Server is Running");
})

const PORT = process.env.PORT || 5000;

// listning to port
app.listen(PORT, () => console.log(`Server is Running on Port ${PORT}\n http://localhost:${PORT}`))