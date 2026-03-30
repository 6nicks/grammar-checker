# Grammar Checker

AI-powered English grammar checker built with Next.js.

[中文文档](./README_CN.md)

## Features

- 🤖 AI grammar checking powered by Qwen
- 🌐 Bilingual explanations (Chinese/English)
- ⚡ Real-time error detection and correction
- 🎨 Modern dark theme UI with animated grid background
- 💾 MongoDB integration for history
- 🐳 Docker deployment ready

## Demo

Live demo: https://grammar.koalakoala.cn

## Tech Stack

| Category | Technology |
|----------|-------------|
| Frontend | Next.js 14, React, TailwindCSS |
| Backend | Next.js API Routes |
| AI | Alibaba Qwen (DashScope API) |
| Database | MongoDB 7 |
| Deploy | Docker, Docker Compose |

## Quick Start

### Prerequisites

- Node.js 18+
- pnpm
- MongoDB (or use Docker)

### Installation

```bash
# Clone the repository
git clone https://github.com/6nicks/grammar-checker.git
cd grammar-checker

# Install dependencies
pnpm install

# Configure environment
cp apps/web/.env.example apps/web/.env.local
```

### Configuration

Edit `apps/web/.env.local`:

```env
DASHSCOPE_API_KEY=your-dashscope-api-key
MONGODB_URI=mongodb://localhost:27017
MONGODB_DB=grammar_checker
```

Get your API key from [Alibaba Cloud DashScope](https://dashscope.console.aliyun.com/).

### Development

```bash
pnpm dev
```

Open http://localhost:3000

### Production with Docker

```bash
# Build and start
docker compose up -d --build

# Or with environment file
docker compose --env-file .env up -d
```

## Project Structure

```
grammar-checker/
├── apps/
│   └── web/                 # Next.js application
│       ├── app/             # App Router pages and APIs
│       ├── components/      # React components
│       └── lib/             # Utilities
├── packages/
│   └── shared/              # Shared code (reserved)
├── Dockerfile
├── docker-compose.yml
└── README.md
```

## API Reference

### POST /api/grammar

Check English grammar.

**Request:**
```json
{
  "text": "He go to school yesterday"
}
```

**Response:**
```json
{
  "original": "He go to school yesterday",
  "corrected": "He went to school yesterday",
  "errors": [
    {
      "original": "go",
      "correction": "went",
      "explanationZh": "过去时态应使用过去式",
      "explanationEn": "Past tense requires past form"
    }
  ],
  "isCorrect": false
}
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.