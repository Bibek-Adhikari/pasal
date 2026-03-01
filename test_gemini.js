
import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config";

async function test() {
  const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const cleanKey = apiKey ? apiKey.replace(/"/g, '') : null;
  console.log("Using API Key:", cleanKey ? "FOUND" : "NOT FOUND");
  if (!cleanKey) return;

  try {
    const genAI = new GoogleGenerativeAI(cleanKey);
    console.log("Listing models...");
    // Since we are in the latest version, let's try to just use a model directly if listModels is still tricky
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent("Hello, who are you?");
    console.log("Response:", result.response.text());
  } catch (error) {
    console.error("Error details:", error);
  }
}

test();
