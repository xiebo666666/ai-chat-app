# AI Chat Application

一个基于 React 和 Node.js 的 AI 聊天应用，集成了 Google Gemini AI 模型。

## 功能特点

- 🎨 现代化的聊天界面
- 🤖 集成 Google Gemini AI 模型
- 💬 实时对话交互
- 🔒 安全的 API 密钥管理
- ⚡ 快速响应
- 📱 响应式设计

## 技术栈

### 前端
- React 18
- CSS3（现代化动画和渐变）
- Fetch API

### 后端
- Node.js
- Express.js
- Google Generative AI SDK
- CORS
- dotenv

## 项目结构

```
ai-chat-app/
├── backend/              # 后端服务
│   ├── server.js        # Express 服务器
│   ├── package.json     # 后端依赖
│   ├── .env            # 环境变量（包含 API key）
│   └── .env.example    # 环境变量示例
├── frontend/            # 前端应用
│   ├── public/         # 静态文件
│   ├── src/            # React 源代码
│   │   ├── App.js     # 主应用组件
│   │   ├── App.css    # 样式文件
│   │   ├── index.js   # 入口文件
│   │   └── index.css  # 全局样式
│   └── package.json   # 前端依赖
├── .gitignore          # Git 忽略文件
└── README.md           # 项目说明
```

## 安装步骤

### 1. 克隆仓库

```bash
git clone <repository-url>
cd ai-chat-app
```

### 2. 安装后端依赖

```bash
cd backend
npm install
```

### 3. 配置环境变量

后端的 `.env` 文件已经包含了 Gemini API key，你也可以根据需要修改：

```bash
GEMINI_API_KEY=your_api_key_here
PORT=5000
```

### 4. 安装前端依赖

```bash
cd ../frontend
npm install
```

## 运行应用

### 启动后端服务器

```bash
cd backend
npm start
```

后端服务器将在 `http://localhost:5000` 运行。

### 启动前端应用

在新的终端窗口中：

```bash
cd frontend
npm start
```

前端应用将在 `http://localhost:3000` 自动打开。

## API 端点

### POST /api/chat

发送消息给 AI 并获取回复。

**请求体：**
```json
{
  "message": "你好，请问你能做什么？"
}
```

**响应：**
```json
{
  "success": true,
  "reply": "你好！我是 AI 助手..."
}
```

**错误响应：**
```json
{
  "error": "错误信息描述"
}
```

### GET /api/health

健康检查端点。

**响应：**
```json
{
  "status": "ok",
  "message": "Server is running"
}
```

## 安全性

- ✅ API key 存储在后端环境变量中
- ✅ 前端代码中不包含任何敏感信息
- ✅ 使用 .gitignore 防止 .env 文件被提交
- ✅ 完善的错误处理机制
- ✅ 输入验证

## 开发模式

后端使用 nodemon 进行热重载：

```bash
cd backend
npm run dev
```

## 生产部署

### 构建前端

```bash
cd frontend
npm run build
```

### 生产环境运行

确保设置正确的环境变量，然后：

```bash
cd backend
NODE_ENV=production npm start
```

## 故障排除

### 端口已被占用

如果端口 5000 或 3000 已被占用，可以修改：

- 后端：修改 `backend/.env` 中的 `PORT` 值
- 前端：设置环境变量 `PORT=3001` 后启动

### API 调用失败

1. 检查后端服务器是否正在运行
2. 验证 `.env` 文件中的 API key 是否正确
3. 检查网络连接
4. 查看浏览器控制台和后端日志

## 许可证

ISC
