# Pasal - Business Website

A modern business website built with Next.js, featuring services, products, about section, contact functionality, and AI-powered chatbot.

## Features

- **Responsive Design** - Mobile-first responsive layout
- **Hero Section** - Engaging video background with call-to-action
- **Services Section** - Showcase of business services
- **Products Section** - Product gallery with images
- **About Section** - Company information
- **Contact Section** - Contact form and information
- **AI Chatbot (Vinayak Assistant)** - Gemini-powered AI assistant with TTS support
- **Audio Player** - Background audio playback
- **Multi-language Support** - Translation infrastructure (English & Nepali)
- **Floating Contact Menu** - Quick access contact options

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: CSS Modules / Global CSS
- **AI**: Groq API (Llama 3.1 70B Versatile) + Google Gemini (fallback)
- **TTS**: Web Speech API / Serve AI TTS
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Environment Variables

Create a `.env.local` file with the following variables:

```env
GEMINI_API_KEY=your_gemini_api_key_here
GROQ_API_KEY=your_groq_api_key_here
TTS_API_KEY=your_tts_api_key_here
```

## AI Features (Vinayak Assistant)

The AI-powered chatbot uses both Groq and Gemini for natural language processing:

### Text Generation
- **Primary**: Groq API with Llama 3.1 70B Versatile model (faster)
- **Fallback**: Google Gemini 1.5 Flash model
- Tries Groq first, falls back to Gemini if Groq fails
- Responds in Nepali (Devanagari) by default
- Switches to English when user writes in English
- Provides shop-specific information only

### Text-to-Speech (TTS)
The chatbot supports TTS for reading AI responses aloud:

#### Option 1: Browser-Native TTS (Default)
- Uses Web Speech API (SpeechSynthesis)
- No additional API key required
- Works in modern browsers
- Supports Nepali and English languages
- Click the speaker icon on bot messages to hear the response

#### Option 2: External TTS API (Optional)
- Configure `TTS_API_KEY` in `.env.local`
- Uses OpenAI-compatible TTS API (e.g., Serve AI)
- Higher quality audio output
- Get API key from https://serveai.chat or similar providers

Example:
```env
TTS_API_KEY=sk_your_api_key_here
```

To enable TTS, the chatbot includes a speaker button on each bot message. Click it to hear the AI response spoken aloud.

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/            # React components
│   ├── AboutSection.tsx
│   ├── AudioPlayer.tsx
│   ├── ChatBotOverlay.tsx
│   ├── ContactSection.tsx
│   ├── FloatingContactMenu.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── ProductSection.tsx
│   └── ServiceSection.tsx
├── constants/             # Constants and translations
│   └── translations.ts
├── public/                # Static assets
│   ├── images/
│   ├── videos/
│   └── audio/
├── services/              # API services
│   ├── geminiService.ts   # Gemini AI integration
│   ├── ttsService.ts      # Text-to-Speech service
│   └── navigation.ts
├── package.json
├── tsconfig.json
└── next.config.js
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Build for Production

```bash
npm run build
npm run start
```

## License

MIT
