import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { ConnectMongoDb } from "./Utils/mongodb.js";
import UserRoute from "./Routes/user.js";
import DashboardRoute from "./Routes/dashboard.js";
import ChatbotRoute from "./Routes/chatbot.js";

dotenv.config();
const app = express();

// ✅ CORS FIX — Allow Frontend Origin
app.use(
  cors({
    origin: "https://login-signup-form-frontend.vercel.app", // ✅ Frontend deployed URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ✅ Handle Preflight Requests Explicitly (IMPORTANT 🔥)
app.options("*", cors());

// ✅ Body Parser
app.use(express.json());

// ✅ Database Connection
ConnectMongoDb();

// ✅ API Routes
app.use("/user", UserRoute);
app.use("/user/dashboard", DashboardRoute);
app.use("/api/chatbot", ChatbotRoute);

// ✅ Health Check Route
app.get("/", (req, res) => {
  res.send("🚀 Backend is running successfully!");
});

// ✅ Start Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server running on PORT ${PORT}`);
});
