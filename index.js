import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { ConnectMongoDb } from "./Utils/mongodb.js";
import UserRoute from "./Routes/user.js";
import DashboardRoute from "./Routes/dashboard.js";
import ChatbotRoute from "./Routes/chatbot.js";

dotenv.config();
const app = express();

// ✅ CORS Configuration — Fixing Preflight Issues
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://login-signup-form-frontend.vercel.app");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// ✅ Enable CORS Middleware Properly
app.use(
  cors({
    origin: "https://login-signup-form-frontend.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// ✅ Connect to Database
ConnectMongoDb();

// ✅ Routes
app.use("/user", UserRoute);
app.use("/user/dashboard", DashboardRoute);
app.use("/api/chatbot", ChatbotRoute);

// ✅ Root Route
app.get("/", (req, res) => {
  res.send("🚀 Backend is running successfully!");
});

// ✅ 404 Handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// ✅ Error Handler
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err.stack);
  res.status(500).json({ success: false, message: err.message || "Internal Server Error" });
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
