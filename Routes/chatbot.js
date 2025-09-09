import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// ✅ OpenAI GPT Route
router.post("/ask", async (req, res) => {
  try {
    const { query, userName } = req.body;

    if (!query) {
      return res.status(400).json({ success: false, message: "Query is required" });
    }

    // ✅ Call OpenAI GPT API
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo", // ✅ Stable and free model
        messages: [
          {
            role: "system",
            content: `You are an AI Assistant. Always call the user by their name (${userName}). Answer only AI-related questions. If it's unrelated, reply: "I don't have knowledge about that."`
          },
          { role: "user", content: query }
        ]
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
        }
      }
    );

    const aiResponse =
      response.data.choices[0].message.content || "I couldn't find an answer for that.";

    return res.json({ success: true, reply: aiResponse });
  } catch (error) {
    console.error("OpenAI API Error:", error.response?.data || error.message);
    return res.status(500).json({ success: false, message: "Chatbot API failed" });
  }
});

export default router;
