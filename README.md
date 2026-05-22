English | [中文](README.zh-CN.md)

# mbti-ai

> Take an MBTI test, then chat with an AI that actually thinks like that type.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js%2015-black)](https://nextjs.org/)
[![Status: WIP](https://img.shields.io/badge/Status-WIP-orange)]()

> 🚧 **Work in Progress** — This project is in active design phase. See [Roadmap](#roadmap) below.

## What is this?

Most MBTI sites give you a label and a static report. That's it.

**mbti-ai** is different: after the test, you can have an ongoing conversation with an AI agent that embodies any of the 16 MBTI personality types — including your own, your opposite, or the type you're curious about.

## Features

- **7-point Likert MBTI test** — 93-question full version + 28-question quick version
- **4-dimension spectrum** — see your percentage on each axis (E↔I, S↔N, T↔F, J↔P), not just a hard label
- **16 personality agents** — chat with INTJ, ENFP, ISTP… each with distinct reasoning style and tone
- **Compatibility matchmaking** — compare two types side by side and explore how they would interact
- **Shareable results** — auto-generated OG images for each result page

## How the personality agents work

Three architectures were considered:

| Approach | Trade-off |
|----------|-----------|
| Pure prompt injection | Cheapest, but personality drifts (validated by the [Machine-Mindset paper](https://arxiv.org/abs/2312.12999)) |
| **Prompt + RAG few-shot examples** ✅ | Stable behavior at low cost — chosen for this project |
| Fine-tuned 16 models | Most stable, but requires GPU training and self-hosted inference |

Each type ships with a curated library of 50+ in-character dialogue samples that get retrieved as few-shot context.

## Tech Stack

- **Frontend**: Next.js 15 (App Router) + TypeScript + Tailwind v4 + shadcn/ui
- **Animation**: Framer Motion
- **Charts**: ECharts (dimension spectrum visualization)
- **Backend**: Next.js API Routes + Server-Sent Events for streaming chat
- **Database**: Supabase (Postgres + Auth)
- **LLM**: Doubao (ByteDance Volcengine) with Claude as fallback
- **Deploy**: Vercel

## Quick Start

```bash
git clone git@github.com:atompilot/mbti-ai.git
cd mbti-ai
pnpm install
cp .env.example .env.local   # add your LLM and Supabase keys
pnpm dev
```

Visit `http://localhost:3000`.

## Project Structure

```
mbti-ai/
├── app/                    Next.js App Router pages
│   ├── test/               Test flow
│   ├── result/[shareId]/   Result page with spectrum chart
│   ├── chat/[type]/        Chat with a specific MBTI type
│   └── types/[code]/       Encyclopedia entries for each type
├── lib/
│   ├── mbti/               Scoring logic, type definitions
│   ├── agents/             16 system prompts + few-shot libraries
│   └── llm/                LLM client abstraction (Doubao / Claude)
├── components/             UI components
└── supabase/               DB schema and migrations
```

## Roadmap

- [ ] **Week 1** — 93-question test flow, 7-point Likert UI, dimension scoring, result page with ECharts spectrum
- [ ] **Week 2** — 16 system prompts, few-shot sample library, SSE streaming chat
- [ ] **Week 3** — Supabase auth, history persistence, OG image generation, 16-type encyclopedia
- [ ] **Week 4** — Animation polish, SEO, sitemap, Vercel deploy

## Disclaimer

MBTI is used here for self-exploration and entertainment, not as a clinical psychological assessment.

## License

[MIT](LICENSE) © atompilot
