import express from "express";
import { UserLogin } from "../Controllers/UserLogin.js";
import { UserSignup } from "../Controllers/UserSignup.js";
import { AdminRequests } from "../Controllers/AdminRequests.js";

const router = express.Router();

// ✅ Handle preflight requests for CORS
router.options("*", (req, res) => res.sendStatus(200));

// Public Routes
router.post("/signup", UserSignup);
router.post("/login", UserLogin);

// Protected Routes
router.get("/requests", AdminRequests);

export default router;
