
import fetch from 'node-fetch';
import "dotenv/config";

async function test() {
  const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const cleanKey = apiKey ? apiKey.replace(/"/g, '') : null;
  if (!cleanKey) {
    console.log("No API Key found");
    return;
  }

  const tests = [
    { name: "flash-v1", url: `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${cleanKey}` },
    { name: "flash-v1beta", url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${cleanKey}` },
    { name: "pro-v1beta", url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${cleanKey}` }
  ];
  
  for (const t of tests) {
    console.log(`\nTesting: ${t.name}`);
    try {
      const response = await fetch(t.url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: "Hello" }] }]
        })
      });
      const data = await response.json();
      console.log("Status:", response.status);
      if (response.status !== 200) {
        console.log("Body:", JSON.stringify(data, null, 2));
      } else {
        console.log("Success!");
      }
    } catch (error) {
      console.error(`Error in ${t.name}:`, error.message);
    }
  }
}

test();
