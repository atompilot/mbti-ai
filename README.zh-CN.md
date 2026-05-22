[English](README.md) | 中文

# mbti-ai

> 做完 MBTI 测试，立刻和一个"真的像那种人格"的 AI 聊天。

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js%2015-black)](https://nextjs.org/)
[![Status: WIP](https://img.shields.io/badge/Status-WIP-orange)]()

> 🚧 **开发中** — 项目处于设计与落地阶段，路线图见下方。

## 这是什么

市面上的 MBTI 网站大多给你一个标签和静态报告就结束了。

**mbti-ai** 不一样：测完后你可以持续地和任意 16 型人格 AI 对话 —— 和自己同型、互补型，或你好奇的那一型。

## 核心功能

- **7 级 Likert 量表**测试 —— 93 题完整版 + 28 题快速版
- **4 维度光谱**展示 —— 给出每个维度的百分比（E↔I / S↔N / T↔F / J↔P），而非硬标签
- **16 型 AI Agent** —— INTJ、ENFP、ISTP… 每个类型有独立的思维方式与语气
- **兼容性配对** —— 两个类型并排对比，模拟相处互动
- **结果可分享** —— 每个结果页自动生成精美 OG 图

## AI 人格如何实现

考察了三种方案：

| 方案 | 取舍 |
|------|------|
| 纯 Prompt 注入 | 成本最低，但性格容易漂移（[Machine-Mindset 论文](https://arxiv.org/abs/2312.12999)已验证）|
| **Prompt + RAG few-shot 样本** ✅ | 成本低 + 表现稳定 —— 本项目采用 |
| 微调 16 个独立模型 | 效果最佳，但需 GPU 训练与自建推理服务 |

每个类型配备 50+ 条精心编写的对话样本，按上下文检索后作为 few-shot 注入。

## 技术栈

- **前端**：Next.js 15 (App Router) + TypeScript + Tailwind v4 + shadcn/ui
- **动效**：Framer Motion
- **图表**：ECharts（维度光谱可视化）
- **后端**：Next.js API Routes + SSE 流式对话
- **数据库**：Supabase（Postgres + Auth）
- **LLM**：豆包（火山引擎）+ Claude 兜底
- **部署**：Vercel

## 快速开始

```bash
git clone git@github.com:atompilot/mbti-ai.git
cd mbti-ai
pnpm install
cp .env.example .env.local   # 填入 LLM 与 Supabase 的密钥
pnpm dev
```

访问 `http://localhost:3000`。

## 项目结构

```
mbti-ai/
├── app/                    Next.js App Router 页面
│   ├── test/               答题流程
│   ├── result/[shareId]/   结果页 + ECharts 光谱
│   ├── chat/[type]/        与指定 MBTI 类型对话
│   └── types/[code]/       16 型百科页面
├── lib/
│   ├── mbti/               计分逻辑与类型定义
│   ├── agents/             16 套 system prompt + few-shot 库
│   └── llm/                LLM 客户端抽象（Doubao / Claude）
├── components/             UI 组件
└── supabase/               数据库 schema 与迁移
```

## 路线图

- [ ] **Week 1** —— 93 题答题流、7 级 Likert UI、维度计分、ECharts 光谱结果页
- [ ] **Week 2** —— 16 套 system prompt、few-shot 样本库、SSE 流式对话
- [ ] **Week 3** —— Supabase 登录、历史保存、OG 图生成、16 型百科页
- [ ] **Week 4** —— 动效打磨、SEO、站点地图、Vercel 部署

## 免责声明

本项目将 MBTI 用于自我探索与娱乐用途，不作为临床心理评估依据。

## 许可

[MIT](LICENSE) © atompilot
