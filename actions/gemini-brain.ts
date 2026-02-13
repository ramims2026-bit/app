"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

// וודא שהגדרת את המפתח הזה ב-Cloudflare Environment Variables
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function processBusinessRequest(prompt: string, history: any[], businessContext: any) {
  try {
    // שימוש במודל פלאש המהיר
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash", 
    });

    const bName = businessContext?.name || "SabanOS";
    const systemInstruction = `אתה העוזר של ${bName}. ענה בעברית קצרה וקולעת.`;

    const chat = model.startChat({
      history: history.map(msg => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.content }],
      })),
    });

    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    return response.text();

  } catch (error) {
    console.error("Gemini Error:", error);
    return "אופס, חלה שגיאה קטנה בחיבור. נסה שוב?";
  }
}
