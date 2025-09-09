import express from "express";
import { authMiddleware } from "../Utils/authMiddleware.js";

const router = express.Router();

// ✅ Protected Dashboard Route
router.get("/", authMiddleware, (req, res) => {
  res.status(200).json({
    ok: true,
    message: `Welcome to your dashboard, ${req.user.name}!`,
    user: {
      id: req.user.userId,
      name: req.user.name,
      email: req.user.email,
    },
  });
});

export default router;
