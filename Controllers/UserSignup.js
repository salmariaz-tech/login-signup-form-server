import User from "../Models/User.js";
import { signjwt } from "../Utils/jwt.js";

export const UserSignup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ ok: false, message: "All fields are required" });
    }

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ ok: false, message: "User already exists" });
    }

    // Create new user
    const newUser = await User.create({ name, email, password });

    // Generate JWT token
    const jwtToken = signjwt({ id: newUser._id, email: newUser.email });

    res.status(201).json({
      ok: true,
      message: "User registered successfully",
      jwtToken,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ ok: false, message: "Server error" });
  }
};
