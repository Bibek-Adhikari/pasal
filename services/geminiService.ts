import { GoogleGenAI, Modality } from "@google/genai";
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
2. If a user asks something unrelated to Vinayak Suppliers, its products, or services (e.g., general knowledge, other shops, politics, personal questions), politely decline by saying: "I am sorry, but I can only provide information related to Vinayak Suppliers and our construction materials."
3. Be professional, welcoming, and helpful.
4. You can speak in both English and Nepali as requested.

Shop Details:
${SHOP_DETAILS}`;

export async function generateStoreAudio(text: string) {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY || "" });
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-exp",
      contents: [{ parts: [{ text: `${SYSTEM_PROMPT}\n\nTask: Speak the following intro in a clear way: ${text}` }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (base64Audio) {
      return `data:audio/mp3;base64,${base64Audio}`;
    }
    return null;
  } catch (error) {
    console.error("Gemini TTS Error:", error);
    return null;
  }
}

export async function generateStoreResponse(userPrompt: string) {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY || "" });
    const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });
    
    const result = await model.generateContent(`${SYSTEM_PROMPT}\n\nUser Question: ${userPrompt}`);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return "I am sorry, I am having trouble connecting right now. Please try again later or call us directly.";
  }
}
