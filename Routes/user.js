import express from "express";
import { UserLogin } from "../Controllers/UserLogin.js";
import { UserSignup } from "../Controllers/UserSignup.js";
import { AdminRequests } from "../Controllers/AdminRequests.js";

const router = express.Router();

// ✅ Preflight requests for this router
router.options("*", (req, res) => res.sendStatus(200));

// Public routes
router.post("/signup", UserSignup);
router.post("/login", UserLogin);

// Protected route
router.get("/requests", AdminRequests);

export default router;
