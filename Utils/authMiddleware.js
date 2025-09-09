import { verifyJWT } from "./jwt.js";

export const authMiddleware = (req, res, next) => {
  try {
    // ✅ Token extract karo safely
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).json({ ok: false, message: "No token provided" });
    }

    // ✅ Remove "Bearer " from token
    const token = authHeader.split(" ")[1];
    const decoded = verifyJWT(token);

    if (!decoded) {
      return res.status(401).json({ ok: false, message: "Invalid or expired token" });
    }

    req.user = decoded; // ✅ Attach decoded data to request object
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    res.status(500).json({ ok: false, message: "Server error" });
  }
};
