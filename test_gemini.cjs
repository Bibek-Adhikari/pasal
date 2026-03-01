
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

async function test() {
  const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const cleanKey = apiKey ? apiKey.replace(/"/g, '') : null;
  console.log("Using API Key:", cleanKey ? "FOUND" : "NOT FOUND");
  if (!cleanKey) return;

  try {
    const genAI = new GoogleGenerativeAI(cleanKey);
    console.log("Listing models...");
    const models = await genAI.listModels();
    models.forEach(m => console.log(`- ${m.name} (${m.supportedMethods.join(', ')})`));
  } catch (error) {
    console.error("Error listing models:", error);
  }
}

test();
