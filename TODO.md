# TODO

Living checklist of what's left. Update as items ship.

## Now (待你手动验证)

- [ ] 配置 `.env.local`：`cp .env.example .env.local` 后填入 `LLM_API_KEY`（火山引擎 Ark）
- [ ] 重启 dev server 验证四个闭环：
  - [ ] `/test` — 28 题答题流程、自动前进、进度条
  - [ ] `/result` — 雷达图渲染、4 维百分比条对得上
  - [ ] `/types/[code]` — 16 个百科页可点开（抽样 3-4 个）
  - [ ] `/chat/[type]` — 流式吐字、回答符合人格、无报错

---

## Week 2（对话体验）

- [ ] **few-shot 样本库**：当前 system prompt 只用了 `sampleQuotes` 作为语气锚点；为每个 MBTI 类型准备 3-5 段完整的对话样例（用户问 → 该人格回答），按场景检索注入
- [ ] **对话历史 trim**：长对话需在客户端按 token 估算截断，保留最近 N 轮 + system，避免请求超长
- [ ] **Markdown 渲染**：助手回复支持基本 Markdown（粗体、代码、引用），用轻量 lib（如 `react-markdown` + `remark-gfm`）
- [ ] **请求节流 + 中止**：连续点 Send 时排队或忽略；当前已用 `AbortController`，但 UI 上没有 Stop 按钮
- [ ] **临时对话历史**：用 `sessionStorage` 按 `mbti-ai:chat:<type>` 存当前会话，刷新不丢
- [ ] **错误 UI**：把内嵌的 `[error] ...` 文本换成带重试按钮的卡片

## Week 3（账号与数据）

- [ ] **Supabase 接入**：创建项目、`@supabase/ssr` 客户端、`.env.local` 加 `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] **Auth**：邮箱 magic link + GitHub OAuth；未登录可测可聊（限流），登录后保存
- [ ] **DB schema 落地**（草案见 README 设计）：
  - [ ] `mbti_results`（user_id, share_id, mbti_type, scores, mode, created_at）
  - [ ] `chat_sessions`（user_id, agent_type, user_type, created_at）
  - [ ] `chat_messages`（session_id, role, content, created_at）
- [ ] **历史保存**：测试结果与对话会话写入 DB；登录后 `/profile` 列出
- [ ] **结果短链分享**：`/result/[shareId]` 路由 + 服务端读 DB
- [ ] **OG 图自动生成**：用 `@vercel/og` 为每个结果页生成精美社交卡片

## Week 4（打磨与上线）

- [ ] **Framer Motion 动画**：题目切换、Likert 选中反馈、结果页雷达入场动画
- [ ] **dark mode toggle**：当前依赖系统偏好，加手动切换
- [ ] **SEO**：sitemap、robots.txt、每页结构化数据
- [ ] **Analytics**：Vercel Analytics 或 Umami
- [ ] **Vercel 部署**：连接 GitHub、配置 env vars、绑定域名
- [ ] **README 更新**：去掉 WIP badge、加上线 URL、加首页截图

---

## 题库扩展

- [ ] **93 题完整版**：扩 `lib/mbti/questions.ts`，分 `QUICK_QUESTIONS`（已有）/ `FULL_QUESTIONS`
- [ ] **测试模式选择页**：`/test` 入口让用户选 quick(28) / full(93)
- [ ] **题库元数据**：估算时长、维度覆盖说明

## 16 型百科扩展

- [ ] **每页加扩展段落**：`PERSONALITIES` 增加 `longDescription`、`famousExamples`、`career`、`relationships` 字段
- [ ] **类型间兼容性矩阵**：`lib/mbti/compatibility.ts` + `/types/[code]/compatibility` 子页面
- [ ] **配对页**：`/match` 输入两个类型，看相处建议

## 长期 / 可选

- [ ] **国际化**：当前题库已 zh+en，但 UI 文案是英文；接 `next-intl` 做 zh/en 切换
- [ ] **付费门控**：免费用户限对话轮数，订阅解锁
- [ ] **微调实验**（参考 Machine-Mindset）：用 DPO 数据集训练 LoRA，对比 prompt+RAG 与微调的稳定性
- [ ] **TTS 语音对话**（参考 `my-doubao` 的 tts）：让 16 型 AI 有不同语音

---

## 已知问题 / 技术债

- [ ] `/result` 在 SSR 时返回空 `<main>`（等待 hydrate 读 sessionStorage），不利于 SEO；待 DB 接入后改用 `/result/[shareId]` 服务端取数
- [ ] `ChatPanel` 没自动滚到底部（多轮后需手动滚）
- [ ] `LikertScale` 按钮在窄屏（<360px）会挤压，需 `flex-wrap` 或更小尺寸适配
- [ ] `personalities.ts` 中文描述是 LLM 时代风格，可能不够"科普通用"；上线前过一遍语言风格
- [ ] 没有 E2E 测试；仅 `pnpm test:scoring` 覆盖计分

---

## 已完成

参见 `git log --oneline`，目前 8 个 commit：

- `c0208fc` ECharts 4 维雷达图
- `f1ab733` Doubao 流式对话接入
- `d742c94` 16 型人格数据 + 动态 `/chat/[type]` `/types/[code]`
- `cd90822` 28 题答题流程 + 结果页（sessionStorage）
- `523cc59` MBTI 类型模型 + 题库 + 计分引擎
- `ea6a171` shadcn/ui + 路由骨架
- `9818115` Next.js 15 + Tailwind v4 脚手架
- `0b3cd34` Initial commit
