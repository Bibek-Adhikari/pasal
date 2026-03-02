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
${SHOP_DETAILS}

FINAL REMINDER: Your primary language is Nepali (Devanagari). Always start in Nepali unless the user's message is in English.`;


export async function generateStoreResponse(userPrompt: string) {
  // Check environment variables
  const geminiKey = (process.env.GEMINI_API_KEY || "").replace(/"/g, '');
  const groqKey = (process.env.GROQ_API_KEY || "").replace(/"/g, '');

  // Try Groq first (faster)
  if (groqKey) {
    try {
      return await generateWithGroq(SYSTEM_PROMPT, userPrompt, groqKey);
    } catch (error: any) {
      console.error("Groq Error:", error.message || error);
    }
  }
  
  // Fallback to Gemini
  if (geminiKey) {
    try {
      return await generateWithGemini(SYSTEM_PROMPT, userPrompt, geminiKey);
    } catch (error: any) {
      console.error("Gemini Error:", error.message || error);
      if (error.message?.includes("429") || error.message?.includes("quota") || error.message?.includes("limit")) {
        return "The AI service (Gemini) has reached its free tier limit. Please wait a minute or provide a Groq API key for faster service.";
      }
    }
  }
  
  // If neither works
  if (!geminiKey && !groqKey) {
    console.error("No API keys found!");
    return "I am sorry, the AI assistant is not properly configured. Please add an API key (GEMINI_API_KEY or GROQ_API_KEY) to your .env.local file.";
  }
  
  return "I encountered an error connecting to our AI service. This might be due to a rate limit or invalid API key. Please check your configuration.";
}

async function generateWithGemini(systemPrompt: string, userPrompt: string, apiKey: string): Promise<string> {
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const tryModel = async (modelName: string) => {
    // For Gemini 1.5/2.0, we can use systemInstruction for system prompt
    const model = genAI.getGenerativeModel({ 
      model: modelName,
      systemInstruction: systemPrompt 
    });
    const result = await model.generateContent(userPrompt);
    return result.response.text();
  };

  try {
    // Try Gemini 2.0 Flash first
    return await tryModel("gemini-2.0-flash");
  } catch (error: any) {
    // If rate limited or quota hit, try Gemini 1.5 Flash as fallback
    if (error.message?.includes("429") || error.message?.includes("quota") || error.message?.includes("limit")) {
      console.log("Gemini 2.0 throttled, trying Gemini 1.5 Flash...");
      try {
        return await tryModel("gemini-1.5-flash");
      } catch (fallbackError) {
        console.error("Gemini 1.5 Fallback Error:", fallbackError);
        throw error; // Re-throw original error if fallback also fails
      }
    }
    throw error;
  }
}

async function generateWithGroq(systemPrompt: string, userPrompt: string, apiKey: string): Promise<string> {
  const tryModel = async (model: string) => {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: model,
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: userPrompt
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
      throw new Error(`Groq API error (${model}): ${response.status} - ${error}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content;
  };

  try {
    // Try primary 70B model first
    const result = await tryModel('llama-3.3-70b-versatile');
    if (result) return result;
  } catch (error: any) {
    console.error("Groq 70B Error:", error.message);
    
    // Fallback to faster/more available 8B model if 70B fails or is limited
    try {
      console.log("Trying Groq 8B fallback...");
      const result = await tryModel('llama-3.1-8b-instant');
      if (result) return result;
    } catch (fallbackError: any) {
      console.error("Groq 8B Fallback Error:", fallbackError.message);
      throw error; // Re-throw original error
    }
  }
  
  return "I am sorry, I could not generate a response.";
}
