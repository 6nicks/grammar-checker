# Grammar Checker

基于 Next.js 的 AI 英语语法检查工具。

[English](./README.md)

## 功能特点

- 🤖 千问 AI 驱动的语法检查
- 🌐 中英文双语解释
- ⚡ 实时错误检测和修正
- 🎨 现代深色主题 UI，带动态网格背景
- 💾 MongoDB 历史记录存储
- 🐳 支持 Docker 部署

## 在线演示

访问地址：https://grammar.koalakoala.cn

## 技术栈

| 类别 | 技术 |
|------|------|
| 前端 | Next.js 14, React, TailwindCSS |
| 后端 | Next.js API Routes |
| AI | 阿里云千问 (DashScope API) |
| 数据库 | MongoDB 7 |
| 部署 | Docker, Docker Compose |

## 快速开始

### 环境要求

- Node.js 18+
- pnpm
- MongoDB（或使用 Docker）

### 安装

```bash
# 克隆仓库
git clone https://github.com/6nicks/grammar-checker.git
cd grammar-checker

# 安装依赖
pnpm install

# 配置环境变量
cp apps/web/.env.example apps/web/.env.local
```

### 配置

编辑 `apps/web/.env.local`：

```env
DASHSCOPE_API_KEY=你的千问API密钥
MONGODB_URI=mongodb://localhost:27017
MONGODB_DB=grammar_checker
```

从 [阿里云百炼控制台](https://dashscope.console.aliyun.com/) 获取 API Key。

### 开发

```bash
pnpm dev
```

访问 http://localhost:3000

### Docker 部署

```bash
# 构建并启动
docker compose up -d --build

# 或指定环境文件
docker compose --env-file .env up -d
```

## 项目结构

```
grammar-checker/
├── apps/
│   └── web/                 # Next.js 应用
│       ├── app/             # 页面和 API
│       ├── components/      # React 组件
│       └── lib/             # 工具函数
├── packages/
│   └── shared/              # 共享代码（预留）
├── Dockerfile
├── docker-compose.yml
└── README.md
```

## API 接口

### POST /api/grammar

检查英语语法。

**请求：**
```json
{
  "text": "He go to school yesterday"
}
```

**响应：**
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

## 开发故事

阅读 [开发故事](./docs/promotion-article.md) 了解从想法到上线的过程。

## 许可证

MIT

## 贡献

欢迎提交 Pull Request！