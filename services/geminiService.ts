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
  // Note: Standard @google/generative-ai doesn't support direct TTS in the same way as the preview SDK.
  // We will fulfill the text generation part here, but the user might need a separate service for TTS.
  // However, since the user asked for "replay based on shop details only", we prioritize the content control.
  try {
    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY || "");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(`${SYSTEM_PROMPT}\n\nTask: Generate a short store intro for: ${text}`);
    return result.response.text(); 
  } catch (error) {
    console.error("Gemini Error:", error);
    return null;
  }
}

export async function generateStoreResponse(userPrompt: string) {
  try {
    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY || "");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const result = await model.generateContent(`${SYSTEM_PROMPT}\n\nUser Question: ${userPrompt}`);
    return result.response.text();
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return "I am sorry, I am having trouble connecting right now. Please try again later or call us directly.";
  }
}
