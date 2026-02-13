"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

// וודא שהגדרת את המפתח הזה ב-Cloudflare Environment Variables
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function processBusinessRequest(prompt: string, history: any[], businessContext: any) {
  try {
    // שימוש במודל פלאש המהיר כפי שביקשת
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash", 
    });

    // חילוץ המידע מהקונטקסט העסקי הדינמי
    const bName = businessContext?.displayName || "SabanOS";
    const bPrompt = businessContext?.systemPrompt || `אתה העוזר של ${bName}.`;
    
    // בניית הוראת המערכת שכוללת את הלוגיקה הייחודית לבית העסק
    const systemInstruction = `${bPrompt} ענה בעברית קצרה וקולעת.`;

    const chat = model.startChat({
      history: [
        { role: "user", parts: [{ text: systemInstruction }] },
        { role: "model", parts: [{ text: "הבנתי. אני מוכן לסייע כעוזר מקצועי." }] },
        ...history.map(msg => ({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.content }],
        })),
      ],
    });

    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    return response.text();

  } catch (error) {
    console.error("Gemini Error:", error);
    return "אופס, חלה שגיאה קטנה בחיבור. נסה שוב?";
  }
}
