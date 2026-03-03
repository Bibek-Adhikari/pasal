# Vinayak Suppliers - Construction Materials Website

A modern, bilingual (English/Nepali) Next.js website for Vinayak Suppliers, a trusted construction materials provider in Kamal-2, Campa Chowk, Jhapa, Nepal with over 10 years of experience.

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![React](https://img.shields.io/badge/React-19-61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind CSS-4-38B2AC)

## 🌟 Features

- **Bilingual Support**: Full English and Nepali language support with seamless switching
- **AI Chatbot**: Intelligent chatbot powered by Gemini AI and Groq API for customer support
- **Text-to-Speech**: Natural voice responses using Web Speech API or TTS service
- **Responsive Design**: Fully responsive layout for all device sizes
- **Modern UI**: Beautiful animations using Motion library
- **SEO Optimized**: Automatic sitemap and robots.txt generation
- **Image Optimization**: Next.js optimized images with WebP/AVIF support

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- API keys for AI features (optional)

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd Pasal
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Setup

Copy the example environment file and configure your API keys:

```bash
cp .env.example .env
```

Edit `.env` with your API keys:

```env
# Required for AI Chatbot
GEMINI_API_KEY="your_gemini_api_key"
GROQ_API_KEY="your_groq_api_key"

# Optional - For enhanced features
NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY="your_maps_api_key"
TTS_API_KEY="your_tts_api_key"
APP_URL="http://localhost:3000"
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for production

```bash
npm run build
npm start
```

## 🛠️ Tech Stack

- **Framework**: Next.js 16
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4
- **Animations**: Motion (framer-motion)
- **Icons**: Lucide React
- **AI Integration**: Google Gemini AI, Groq API
- **Database**: Better SQLite3 (for caching)
- **Language**: TypeScript

## 📁 Project Structure

```
pasal/
├── app/                      # Next.js App Router
│   ├── [lang]/              # Internationalized routes
│   │   ├── layout.tsx       # Root layout with translations
│   │   └── page.tsx         # Home page
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   ├── robots.ts            # SEO robots.txt
│   └── sitemap.ts           # SEO sitemap
├── components/              # React components
│   ├── Hero.tsx             # Hero section with stats
│   ├── ProductSection.tsx   # Products/services display
│   ├── CommitmentSection.tsx# Company commitments
│   ├── AboutSection.tsx     # About company
│   ├── ContactSection.tsx   # Contact form & map
│   ├── Header.tsx           # Navigation header
│   ├── Footer.tsx           # Site footer
│   ├── ChatBotOverlay.tsx   # AI chatbot widget
│   └── ...
├── constants/
│   └── translations.ts      # English & Nepali translations
├── services/
│   ├── geminiService.ts     # Gemini AI integration
│   └── ttsService.ts        # Text-to-speech service
├── public/                  # Static assets
│   └── images & media files
├── middleware.ts            # Internationalization middleware
├── next.config.js           # Next.js configuration
└── package.json             # Dependencies
```

## 🔧 Configuration

### Image Optimization

The project supports remote images from Unsplash and Picsum. Add your own image sources in `next.config.js`:

```javascript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'your-domain.com',
      pathname: '/**',
    },
  ],
}
```

### Language Support

Translations are managed in `constants/translations.ts`. Add new languages by extending the translations object:

```typescript
export const translations = {
  ne: { /* Nepali */ },
  en: { /* English */ },
  // Add new language here
};
```

## 📱 Features Overview

### Hero Section
- Company branding with tagline
- Key statistics (10+ years, 5000+ clients, 100% quality)
- Bilingual content display

### Products & Services
- Cement & Steel (Solid Foundation)
- Paints & Colors (Colorful Dreams)
- Plumbing & Electricals (Complete Solutions)

### AI Chatbot
- Floating chat button
- AI-powered responses about construction materials
- Text-to-Speech for voice responses
- Supports both English and Nepali

### Contact Section
- Business address: Kamal-2, Campa Chowk, Jhapa
- Phone contact
- Google Maps integration

## 🔐 API Keys

Get your free API keys:

- **Gemini API**: [Google AI Studio](https://aistudio.google.com/app/apikey)
- **Groq API**: [Groq Console](https://console.groq.com/keys)
- **Google Maps**: [Google Cloud Console](https://console.cloud.google.com/)

## 📄 License

This project is for demonstration purposes.

## 👏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons by [Lucide](https://lucide.dev/)
- Animations by [Motion](https://motion.dev/)

---

**Vinayak Suppliers** - दशक लामो अनुभव र अटुट विश्वास | A Decade of Experience and Trust
