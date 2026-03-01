
import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config";

async function test() {
  const apiKey = (process.env.GEMINI_API_KEY || "").replace(/"/g, '');
  console.log("Using API Key:", apiKey ? "FOUND" : "NOT FOUND");
  if (!apiKey) return;

  const genAI = new GoogleGenerativeAI(apiKey);
  const modelsToTry = ["gemini-1.5-flash", "gemini-flash-latest", "gemini-pro"];
  
  for (const modelName of modelsToTry) {
    try {
      console.log(`Testing model: ${modelName}...`);
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent("Hello, are you working?");
      console.log(`Success with ${modelName}:`, result.response.text());
      return;
    } catch (error) {
      console.error(`Error with ${modelName}:`, error.message);
    }
  }
}

test();
