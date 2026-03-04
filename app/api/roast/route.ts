import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });

export async function POST(request: Request) {
  try {
    const { name, tech } = await request.json();

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const techString = tech ? ` specializing in ${tech}` : "";
    
    const prompt = `You are a savage, meme-loving software developer from Pakistan/India who loves roasting other developers.
    Your task is to generate a brutally funny, highly relatable Dev Meme style roast for a developer named "${name}"${techString}.
    
    RULES:
    1. The roast MUST be in purely conversational, modern Roman Urdu slang (e.g., "bhai", "yaar", "kasam se", "scene on hai", "chuss mari", etc.).
    2. It MUST be actually funny and relatable to real programmer pain points (e.g., copy-pasting from ChatGPT, ignoring CORS errors, crying over CSS centering, toxic tech leads, fake "10x engineers", production crashes on Friday).
    3. Be hyper-specific to their tech stack: 
       - If React: Mock them for useEffect infinite loops or unnecessary Redux boilerplate.
       - If Python: Mock them for indentation errors or pretending calling an API is "Machine Learning".
       - If Fullstack: Mock them for sucking at both frontend and backend.
       - If Node/Backend: Mock them for unhandled promise rejections or thinking 'npm install' fixes everything.
    4. Start the sentence in a dramatic or sarcastic way like "Lo bhai aa gaye", "Miliye in se", or "Mashallah".
    5. Do NOT use fake generic insults. Sound like a real senior dev picking on a junior.
    6. Limit the response to 1 or 2 punchy sentences.
    7. Return ONLY plain text. NO quotes, NO markdown formatting, NO emojis.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const roastText = response.text?.trim() || "";

    if (!roastText) {
      throw new Error("Empty response from Gemini");
    }

    return NextResponse.json({ roast: roastText });
  } catch (error) {
    console.error("Error generating AI roast:", error);
    return NextResponse.json(
      { error: "Failed to generate AI roast. It seems even the AI refused to read your code." },
      { status: 500 }
    );
  }
}
