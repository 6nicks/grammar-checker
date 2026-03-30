# Grammar Checker

AI-powered English grammar checker built with Next.js.

## Features

- AI grammar checking with bilingual explanations (Chinese/English)
- Real-time error detection and correction
- Modern dark theme UI
- MongoDB integration for history

## Tech Stack

- **Frontend**: Next.js 14, React, TailwindCSS
- **Backend**: Next.js API Routes
- **AI**: Alibaba Qwen (DashScope API)
- **Database**: MongoDB 7
- **Deploy**: Docker

## Quick Start

```bash
# Install dependencies
pnpm install

# Configure environment
cp apps/web/.env.example apps/web/.env.local

# Start development
pnpm dev
```

## Environment Variables

```
DASHSCOPE_API_KEY=your-api-key
MONGODB_URI=mongodb://localhost:27017
MONGODB_DB=grammar_checker
```

## License

MIT