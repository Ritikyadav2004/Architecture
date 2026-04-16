import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for AI Chat
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages, userMsg, systemPrompt } = req.body;
      const hfApiKey = process.env.HUGGINGFACE_API_KEY;
      const geminiKey = process.env.GEMINI_API_KEY;

      if (hfApiKey && hfApiKey.trim() !== "") {
        // Use Hugging Face Mistral 7B
        const hfMessages = [
          { role: "system", content: systemPrompt },
          ...messages.map((m: any) => ({
            role: m.role === "model" ? "assistant" : "user",
            content: m.content,
          })),
          { role: "user", content: userMsg },
        ];

        const response = await fetch(
          "https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta/v1/chat/completions",
          {
            headers: {
              Authorization: `Bearer ${hfApiKey}`,
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
              model: "HuggingFaceH4/zephyr-7b-beta",
              messages: hfMessages,
              max_tokens: 500,
            }),
          }
        );

        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          if (response.status === 503) {
            return res.status(503).json({
              error:
                "The Zephyr 7B model is currently waking up on Hugging Face. Please wait 30 seconds and try again.",
            });
          } else if (response.status === 401 || response.status === 403) {
            return res.status(401).json({
              error:
                "Access Denied: Please ensure your Hugging Face API key is correct and has 'Read' or 'Inference' permissions.",
            });
          }
          return res.status(response.status).json({
            error: errData.error || `Hugging Face API Error (${response.status})`,
          });
        }

        const result = await response.json();
        return res.json({
          reply: result.choices[0].message.content,
          provider: "Zephyr 7B",
        });
      } else if (geminiKey) {
        // Fallback to Gemini
        const ai = new GoogleGenAI({ apiKey: geminiKey });
        const history = messages.map((m: any) => ({
          role: m.role,
          parts: [{ text: m.content }],
        }));

        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: [
            { role: "user", parts: [{ text: systemPrompt }] },
            { role: "model", parts: [{ text: "Understood. I am ready to help." }] },
            ...history,
            { role: "user", parts: [{ text: userMsg }] },
          ],
        });
        return res.json({
          reply: response.text || "I'm sorry, I couldn't process that right now.",
          provider: "Gemini",
        });
      } else {
        return res.status(400).json({
          error:
            "No API key provided. Please configure HUGGINGFACE_API_KEY or GEMINI_API_KEY in the .env file.",
        });
      }
    } catch (error: any) {
      console.error("Backend AI Error:", error);
      res.status(500).json({ error: error.message || "Internal server error" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
