
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config({ path: '.env' });

async function testGemini() {
    const apiKey = (process.env.GEMINI_API_KEY || "").replace(/"/g, '');
    console.log("API Key found:", !!apiKey);
    if (!apiKey) return;

    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        const result = await model.generateContent("Hello, are you working?");
        console.log("Response text:", result.response.text());
    } catch (error) {
        console.error("Gemini Test Error:", error.message || error);
    }
}

testGemini();
