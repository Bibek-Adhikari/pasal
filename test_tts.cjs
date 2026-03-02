const fetch = require('node-fetch');
require('dotenv').config({ path: '.env' });

async function testTTS() {
    const apiKey = (process.env.TTS_API_KEY || "").replace(/"/g, '');
    console.log("TTS API Key found:", !!apiKey);
    if (!apiKey) return;

    try {
        const response = await fetch('https://api.serveai.chat/v1/audio/speech', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'tts-1',
                voice: 'ash-append',
                input: 'नमस्ते, यो एक परीक्षण हो।',
                response_format: 'mp3'
            })
        });

        console.log("Response status:", response.status);
        if (response.ok) {
            console.log("TTS Key is working!");
        } else {
            const err = await response.text();
            console.error("TTS Error:", err);
        }
    } catch (error) {
        console.error("TTS Test Error:", error);
    }
}

testTTS();
