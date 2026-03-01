
import fetch from 'node-fetch';
import "dotenv/config";

async function test() {
  const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const cleanKey = apiKey ? apiKey.replace(/"/g, '') : null;
  if (!cleanKey) return;

  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${cleanKey}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.models) {
      data.models.forEach(m => console.log(m.name));
    } else {
      console.log(JSON.stringify(data, null, 2));
    }
  } catch (error) {
    console.error("Fetch Error:", error);
  }
}

test();
