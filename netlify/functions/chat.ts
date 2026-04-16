import { Handler } from "@netlify/functions";
import { GoogleGenAI } from "@google/genai";

export const handler: Handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    const { messages, userMsg, systemPrompt } = JSON.parse(event.body || "{}");
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
          return {
            statusCode: 503,
            body: JSON.stringify({
              error: "The Zephyr 7B model is currently waking up on Hugging Face. Please wait 30 seconds and try again.",
            }),
          };
        } else if (response.status === 401 || response.status === 403) {
          return {
            statusCode: 401,
            body: JSON.stringify({
              error: "Access Denied: Please ensure your Hugging Face API key is correct and has 'Read' or 'Inference' permissions.",
            }),
          };
        }
        return {
          statusCode: response.status,
          body: JSON.stringify({
            error: errData.error || `Hugging Face API Error (${response.status})`,
          }),
        };
      }

      const result = await response.json();
      return {
        statusCode: 200,
        body: JSON.stringify({
          reply: result.choices[0].message.content,
          provider: "Zephyr 7B",
        }),
      };
    } else if (geminiKey) {
      // Fallback to Gemini
      const ai = new GoogleGenAI({ apiKey: geminiKey });
      
      const history = messages.map((m: any) => ({
        role: m.role,
        parts: [{ text: m.content }],
      }));

      const contents = [
        { role: "user", parts: [{ text: systemPrompt }] },
        { role: "model", parts: [{ text: "Understood. I am ready to help." }] },
        ...history,
        { role: "user", parts: [{ text: userMsg }] },
      ];

      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash", // Using 2.0 Flash as a safe, fast default
        contents,
      });
      
      return {
        statusCode: 200,
        body: JSON.stringify({
          reply: response.text || "I'm sorry, I couldn't process that right now.",
          provider: "Gemini",
        }),
      };
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "No API key provided. Please configure HUGGINGFACE_API_KEY or GEMINI_API_KEY in the Netlify settings.",
        }),
      };
    }
  } catch (error: any) {
    console.error("Netlify Function AI Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message || "Internal server error" }),
    };
  }
};
