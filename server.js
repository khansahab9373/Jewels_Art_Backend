import dotenv from "dotenv";
dotenv.config(); // Load environment variables
import express from "express"; // Import express server
import bodyParser from "body-parser"; // Middleware for data transfer from binary language to JSON format
import cors from "cors"; // Secure API
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js"; // Import user routes

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors()); // Uncomment if needed

// Database connection
connectDB(process.env.DBURL);

// Routes
app.use("/", userRoutes); // Use user routes

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
