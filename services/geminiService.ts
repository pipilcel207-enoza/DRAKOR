import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const getGeminiRecommendation = async (userQuery: string): Promise<string> => {
  try {
    const model = 'gemini-3-flash-preview';
    const prompt = `
      You are an expert Korean Drama (K-Drama) assistant for a streaming app.
      The user is asking: "${userQuery}".
      
      Provide a helpful, enthusiastic response. 
      If they ask for recommendations, suggest 3 popular dramas with a very brief reason why.
      Keep the response short (under 100 words) and friendly.
      Use emojis.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    return response.text || "Sorry, I couldn't find any dramas right now. Try again later! 🎬";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Oops! My K-Drama database is currently offline. Please try again in a moment. 😓";
  }
};