import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { ConnectMongoDb } from "./Utils/mongodb.js";
import UserRoute from "./Routes/user.js";
import DashboardRoute from "./Routes/dashboard.js";
import ChatbotRoute from "./Routes/chatbot.js";

dotenv.config();
const app = express();

// ✅ CORS Setup — allow frontend
app.use(
  cors({
    origin: "https://login-signup-form-frontend.vercel.app", // your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ✅ Preflight requests
app.options("*", cors());

// ✅ Body parser
app.use(express.json());

// ✅ Database
ConnectMongoDb();

// ✅ Routes
app.use("/user", UserRoute);
app.use("/user/dashboard", DashboardRoute);
app.use("/api/chatbot", ChatbotRoute);

// ✅ Health check
app.get("/", (req, res) => {
  res.send("🚀 Backend is running!");
});

// ✅ Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
