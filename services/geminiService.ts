import { GoogleGenAI } from "@google/genai";
import { SYSTEM_PROMPT, ModelId } from "../types";

const apiKey = process.env.API_KEY;

// Initialize Gemini client only if API key is available
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const generateStoryboard = async (
  novelText: string, 
  model: ModelId = 'gemini-3-flash-preview'
): Promise<string> => {
  if (!ai) {
    throw new Error("API Key is missing. Please check your environment configuration.");
  }

  if (!novelText.trim()) {
    throw new Error("Please enter text to generate a storyboard.");
  }

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: [
        {
          role: "user",
          parts: [{ text: novelText }],
        },
      ],
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.7, // Slightly creative but adhering to protocol
      },
    });

    const resultText = response.text;
    if (!resultText) {
      throw new Error("No content generated. Please try again.");
    }
    
    return resultText;
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    throw new Error(error.message || "Failed to generate storyboard. Please try again.");
  }
};