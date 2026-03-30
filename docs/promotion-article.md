# 从"这句话对吗？"到AI语法检查工具：我的开发实录

## 起因：一个英语学习者的痛点

作为一个英语学习者，我经常会遇到这样的困扰：

- 写了一句英语，心里却总犯嘀咕："这句话语法对吗？"
- 用了某个短语，不确定是否地道自然
- 想表达一个意思，却不知道该怎么组织句子
- 查字典只能查单词，无法验证整句语法

比如，当我写下：
> "He go to school yesterday and buy some apple"

心里就开始打鼓：
- go 的过去式是 went 吧？
- buy 也要变过去式吗？
- apple 是可数名词，要不要加 s？

每次都要去各种语法网站、论坛搜索，效率极低。于是我萌生了一个想法：**做一个能自动检查英语语法的工具**。

---

## 开发过程：与 AI 结对的 4 小时

### 1. 项目初始化

我选择了 Next.js 作为技术栈，因为它可以同时处理前后端，非常适合这种全栈项目。

```
mm-demo/
├── apps/web/          # Next.js 应用
│   ├── app/           # 页面和 API
│   ├── components/    # React 组件
│   └── lib/           # 工具函数
└── packages/shared/   # 共享代码
```

### 2. AI API 选择

最初打算用 OpenAI 的 GPT 模型，但考虑到成本和网络问题，最终选择了阿里云的千问（Qwen）API。

选择千问的原因：
- 国内直接访问，速度快
- 价格实惠（Coding Plan 免费额度足够）
- 支持中英文混合输出

### 3. 核心功能实现

**语法检查 API** 核心代码：

```typescript
async function checkGrammar(text: string) {
  const response = await fetch('https://coding.dashscope.aliyuncs.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: 'qwen3.5-plus',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
      enable_thinking: false, // 关闭思考模式，加快响应
    }),
  })
  // ... 解析返回结果
}
```

### 4. 遇到的坑

#### 坑 1：响应时间过长

最初测试时，API 响应需要 60-80 秒，简直无法使用。

**排查过程**：
```
[web_search] 调用千问 API，返回时间: 78秒
[分析] 发现模型默认开启了 thinking 模式
[解决] 添加 enable_thinking: false 参数
[结果] 响应时间降至 3-5 秒 ✅
```

#### 坑 2：部署后无法访问

Docker 部署到服务器后，访问不了。

**排查过程**：
```bash
# 检查容器状态
docker ps -a | grep mm-demo

# 发现容器在重启
# 查看日志
docker logs mm-demo-web-1

# 问题：server.js 路径错误
# 修复 Dockerfile CMD 路径
CMD ["node", "apps/web/server.js"]
```

#### 坑 3：本地开发正常，线上 MongoDB 连接失败

**解决方案**：使用 Docker Compose 配置服务间网络

```yaml
services:
  web:
    depends_on:
      - mongo
  mongo:
    image: mongo:7
```

---

## 功能展示

### 界面设计

简洁明了的界面，突出核心功能：

![Grammar Checker 界面](./screenshots/interface.png)

### 功能演示

输入一个有语法错误的句子：

> "He go to school yesterday and buy some apple"

点击"检查语法"，AI 会返回：

![检查结果](./screenshots/result.png)

**错误详情**：
| 错误 | 修正 | 说明 |
|------|------|------|
| ~~go~~ | went | 过去时态应使用过去式 |
| ~~buy~~ | bought | 过去时态应使用过去式 |
| ~~apple~~ | apples | 可数名词需要复数形式 |

每个错误都有中英文双语解释，方便理解。

---

## 技术架构

### 前端
- **框架**: Next.js 14 (App Router)
- **样式**: TailwindCSS
- **交互**: React Hooks

### 后端
- **API**: Next.js API Routes
- **AI**: 阿里云千问 (Qwen 3.5 Plus)
- **数据库**: MongoDB 7

### 部署
- **容器化**: Docker + Docker Compose
- **服务器**: 阿里云 ECS
- **端口**: 3001

### 架构图

```
┌─────────────────────────────────────────────┐
│                   用户浏览器                  │
└─────────────────────┬───────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────┐
│              Next.js 应用 (Docker)           │
│  ┌─────────────┐  ┌─────────────────────┐   │
│  │   前端页面   │  │   API Routes        │   │
│  │  (React)    │  │   /api/grammar      │   │
│  └─────────────┘  └──────────┬──────────┘   │
└─────────────────────────────┼───────────────┘
                              │
              ┌───────────────┼───────────────┐
              ▼               ▼               ▼
      ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
      │  千问 API     │ │   MongoDB    │ │  (未来扩展)   │
      │  (语法检查)   │ │  (历史记录)   │ │              │
      └──────────────┘ └──────────────┘ └──────────────┘
```

---

## 部署全流程

### 1. 本地开发

```bash
# 安装依赖
pnpm install

# 配置环境变量
cp apps/web/.env.example apps/web/.env.local
# 编辑 .env.local 填入 API Key

# 启动开发服务器
pnpm dev
```

### 2. Docker 构建

```bash
# 构建镜像
docker compose build

# 本地测试
docker compose up -d
```

### 3. 部署到服务器

```bash
# 打包项目
tar --exclude='node_modules' --exclude='.next' -czvf mm-demo.tar.gz .

# 上传到服务器
scp mm-demo.tar.gz root@your-server:/opt/mm-demo/

# SSH 登录服务器
ssh root@your-server

# 解压并部署
cd /opt/mm-demo
tar -xzf mm-demo.tar.gz
docker compose up -d --build
```

### 4. 验证部署

```bash
# 检查容器状态
docker ps | grep mm-demo

# 测试访问
curl http://localhost:3001
```

---

## 未来规划

### 短期目标
- [ ] 添加语音输入功能
- [ ] 支持批量检查
- [ ] 添加检查历史记录页面
- [ ] 支持导出报告

### 长期目标
- [ ] 用户账号系统
- [ ] 个性化学习建议
- [ ] 语法知识库
- [ ] 浏览器插件

---

## 技术总结

### 学到的经验

1. **AI API 的坑**：不同模型的参数配置差异很大，需要仔细阅读文档
2. **Docker 部署**：路径问题是最常见的错误，需要仔细检查 Dockerfile
3. **性能优化**：关闭不必要的 AI "思考"功能，大幅提升响应速度

### 开发效率

得益于 AI 辅助编程，从想法到上线仅用了 **4 小时**：
- 1 小时：项目初始化 + 基础功能
- 1 小时：UI 优化 + 多语言支持
- 1 小时：Docker 配置 + 部署调试
- 1 小时：文档 + 测试

---

## 试用地址

**在线体验**: http://120.79.225.117:3001

**GitHub**: https://github.com/6nicks/grammar-checker

---

## 写在最后

这个项目虽然简单，但解决了我的实际痛点。如果你也经常为英语语法犯愁，欢迎试用！

如果你是开发者，这个项目也是一个很好的 Next.js + AI API 的入门案例。完整代码已开源，欢迎 Star ⭐

---

*本文记录了 2026 年 3 月 28 日的开发过程，感谢阅读！*