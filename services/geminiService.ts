"use server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { translations } from "../constants/translations";

const SHOP_DETAILS = `
Shop Name: ${translations.en.brand} (${translations.ne.brand})
Tagline: ${translations.en.tagline} (${translations.ne.tagline})
Description: ${translations.en.aboutDesc}
Establishment: ${translations.en.estd}
Location: ${translations.en.addressValue}
Phone: +977 9842692437, +977 9842690562, +977 9817015744
Categories & Products:
1. ${translations.en.categories[0].title} (${translations.en.categories[0].subtitle}): ${translations.en.categories[0].description}
2. ${translations.en.categories[1].title} (${translations.en.categories[1].subtitle}): ${translations.en.categories[1].description}
3. ${translations.en.categories[2].title} (${translations.en.categories[2].subtitle}): ${translations.en.categories[2].description}

About Points:
${translations.en.aboutPoints.map(p => `- ${p}`).join('\n')}
`;

const SYSTEM_PROMPT = `You are the official AI assistant for Vinayak Suppliers (विनायक सप्लायर्स).
Your goal is to provide information ONLY about Vinayak Suppliers based on the details provided below.

Strict Rules:
1. Answer ONLY using the information in the "Shop Details" section.
2. LANGUAGE RULE (very important): 
   - ALWAYS respond in Nepali (Devanagari script) by default.
   - ONLY switch to English if the user's message is clearly written in English.
   - If the user writes in Nepali, ALWAYS reply in Nepali.
   - Never mix languages in a single reply unless quoting a product name or number.
3. If a user asks something unrelated to Vinayak Suppliers, its products, or services, politely decline in the same language the user used.
4. Be professional, welcoming, and helpful.

Shop Details:
${SHOP_DETAILS}`;

export async function generateStoreAudio(text: string) {
  // Try Groq first (faster)
  const groqKey = (process.env.GROQ_API_KEY || "").replace(/"/g, '');
  if (groqKey) {
    try {
      const result = await generateWithGroq(`${SYSTEM_PROMPT}\n\nTask: Generate a short store intro for: ${text}`, groqKey);
      return result;
    } catch (error) {
      console.error("Groq Error:", error);
    }
  }
  
  // Fallback to Gemini
  const geminiKey = (process.env.GEMINI_API_KEY || "").replace(/"/g, '');
  if (geminiKey) {
    try {
      const result = await generateWithGemini(`${SYSTEM_PROMPT}\n\nTask: Generate a short store intro for: ${text}`, geminiKey);
      return result;
    } catch (error) {
      console.error("Gemini Error:", error);
    }
  }
  
  return null;
}

export async function generateStoreResponse(userPrompt: string) {
  console.log("generateStoreResponse called");
  
  // Check environment variables
  const geminiKey = (process.env.GEMINI_API_KEY || "").replace(/"/g, '');
  const groqKey = (process.env.GROQ_API_KEY || "").replace(/"/g, '');
  
  console.log("GEMINI_API_KEY present:", !!geminiKey, geminiKey ? geminiKey.substring(0, 10) + "..." : "");
  console.log("GROQ_API_KEY present:", !!groqKey, groqKey ? groqKey.substring(0, 10) + "..." : "");
  
  // Try Groq first (faster)
  if (groqKey) {
    try {
      console.log("Trying Groq...");
      const result = await generateWithGroq(`${SYSTEM_PROMPT}\n\nUser Question: ${userPrompt}`, groqKey);
      console.log("Groq success!");
      return result;
    } catch (error: any) {
      console.error("Groq Error:", error.message || error);
    }
  }
  
  // Fallback to Gemini
  if (geminiKey) {
    try {
      console.log("Trying Gemini...");
      const result = await generateWithGemini(`${SYSTEM_PROMPT}\n\nUser Question: ${userPrompt}`, geminiKey);
      console.log("Gemini success!");
      return result;
    } catch (error: any) {
      console.error("Gemini Error:", error.message || error);
    }
  }
  
  // If neither works
  if (!geminiKey && !groqKey) {
    console.error("No API keys found!");
    return "I am sorry, the AI assistant is not properly configured. Please check the API key.";
  }
  
  return "I encountered an error connecting to our AI service. Please try again later.";
}

async function generateWithGemini(prompt: string, apiKey: string): Promise<string> {
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  const result = await model.generateContent(prompt);
  return result.response.text();
}

async function generateWithGroq(prompt: string, apiKey: string): Promise<string> {
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'llama-3.1-70b-versatile',
      messages: [
        {
          role: 'system',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1024,
      top_p: 1,
      stream: false
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Groq API error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  
  if (data.choices && data.choices[0] && data.choices[0].message) {
    return data.choices[0].message.content;
  }
  
  return "I am sorry, I could not generate a response.";
}
