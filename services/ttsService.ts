"use server";

// TTS Service for AI Vinayak Assistant
// Uses Web Speech API for browser-native TTS
// Can be extended to use external TTS APIs

interface TTSOptions {
  text: string;
  lang?: string;
  voice?: string;
  rate?: number;
  pitch?: number;
  volume?: number;
}

// Browser-native Web Speech API TTS
// This runs on the client side
export async function synthesizeSpeech(text: string, lang: string = 'ne-NP'): Promise<string> {
  try {
    // Return the text to be spoken - actual TTS happens on client
    // We return a data URL with base64 encoded audio if using external API
    // For now, we return the text and lang for client-side SpeechSynthesis
    
    // Check if we should use external TTS API
    const apiKey = process.env.TTS_API_KEY;
    
    if (apiKey && apiKey.startsWith('sk_')) {
      // Use OpenAI-compatible TTS API
      return await synthesizeWithExternalAPI(text, lang, apiKey);
    }
    
    // Return text for browser-native TTS
    return JSON.stringify({ text, lang, type: 'browser' });
  } catch (error) {
    console.error('TTS Error:', error);
    return JSON.stringify({ text, lang, type: 'browser' });
  }
}

async function synthesizeWithExternalAPI(text: string, lang: string, apiKey: string): Promise<string> {
  try {
    // Map language codes
    const voiceMap: { [key: string]: string } = {
      'ne-NP': 'ash-append',
      'en-US': 'onyx-append'
    };
    
    const voice = voiceMap[lang] || 'ash-append';
    
    // Call external TTS API (OpenAI-compatible)
    const response = await fetch('https://api.serveai.chat/v1/audio/speech', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'tts-1',
        voice: voice,
        input: text,
        response_format: 'mp3'
      })
    });

    if (!response.ok) {
      throw new Error(`TTS API error: ${response.status}`);
    }

    // Convert to base64
    const arrayBuffer = await response.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString('base64');
    
    return JSON.stringify({ 
      audio: base64, 
      type: 'external', 
      format: 'mp3' 
    });
  } catch (error) {
    console.error('External TTS Error:', error);
    return JSON.stringify({ text, lang, type: 'browser' });
  }
}

// Get available voices for a language
export async function getAvailableVoices(): Promise<{ name: string; lang: string }[]> {
  // This is primarily handled on client-side via SpeechSynthesis.getVoices()
  // Returning common voices for reference
  return [
    { name: 'Google हिंदी', lang: 'hi-IN' },
    { name: 'Google US English', lang: 'en-US' },
    { name: 'Google Nepali', lang: 'ne-NP' }
  ];
}
