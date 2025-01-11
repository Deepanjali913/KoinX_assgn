import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connect.js";
import cryptoRoutes from "./routes/cryptoRoutes.js"
import fetchCryptoData from "./jobs/fetchCryptoJob.js";
import cron from "node-cron"


dotenv.config();

const app = express();
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api", cryptoRoutes);


// Schedule the job to run every 2 hours
cron.schedule("0 */2 * * *", fetchCryptoData);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
