import mongoose from "mongoose";

const connectDB = async () => {
    try {
        // Connecting to Database and assigning db_Name 
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            dbName: "authLearning"
        });
        // Message to insure MongoDB is Connected
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1) // -> Stop the server if DB fails. No DB = No App.
    }
}

export default connectDB;