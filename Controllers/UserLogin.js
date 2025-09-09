import bcrypt from "bcrypt";
import User from "../Models/User.js";
import { signjwt } from "../Utils/jwt.js";

export const UserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ ok: false, message: "User not found" });
    }

    // ✅ Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ ok: false, message: "Invalid credentials" });
    }

    // ✅ Generate JWT Token
    const jwtToken = signjwt({
      userId: user._id,
      name: user.name,
      email: user.email,
    });

    res.status(200).json({
      ok: true,
      message: "Login successful",
      jwtToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ ok: false, message: "Server error" });
  }
};
