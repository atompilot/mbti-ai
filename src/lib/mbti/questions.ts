import type { MBTIQuestion } from "./types";

/**
 * Quick test: 28 questions, 7 per dimension.
 * Balanced polarity within each dimension to reduce acquiescence bias.
 */
export const QUICK_QUESTIONS: MBTIQuestion[] = [
  // ===== EI (Extraversion vs Introversion) =====
  { id: "ei-1", dimension: "EI", polarity: "E", text: { en: "I feel energized after spending time in a large group.", zh: "和一大群人相处后我会感到精力充沛。" } },
  { id: "ei-2", dimension: "EI", polarity: "I", text: { en: "I need quiet alone time to recharge.", zh: "我需要独处的安静时间来恢复精力。" } },
  { id: "ei-3", dimension: "EI", polarity: "E", text: { en: "I often start conversations with strangers.", zh: "我经常主动和陌生人攀谈。" } },
  { id: "ei-4", dimension: "EI", polarity: "I", text: { en: "I prefer deep one-on-one conversations to group chats.", zh: "我更喜欢深入的一对一交谈，而非多人聊天。" } },
  { id: "ei-5", dimension: "EI", polarity: "E", text: { en: "I think out loud while working through problems.", zh: "思考问题时我习惯说出来。" } },
  { id: "ei-6", dimension: "EI", polarity: "I", text: { en: "I find too much social interaction draining.", zh: "过多的社交会让我感到疲惫。" } },
  { id: "ei-7", dimension: "EI", polarity: "E", text: { en: "I would rather attend a party than read at home alone.", zh: "比起一个人在家读书，我更愿意去参加聚会。" } },

  // ===== SN (Sensing vs Intuition) =====
  { id: "sn-1", dimension: "SN", polarity: "S", text: { en: "I trust concrete facts more than hunches.", zh: "比起直觉，我更相信确凿的事实。" } },
  { id: "sn-2", dimension: "SN", polarity: "N", text: { en: "I often focus on the big picture rather than details.", zh: "我经常关注整体格局，而非具体细节。" } },
  { id: "sn-3", dimension: "SN", polarity: "S", text: { en: "I prefer step-by-step instructions to figuring things out.", zh: "比起自己摸索，我更喜欢按步骤说明操作。" } },
  { id: "sn-4", dimension: "SN", polarity: "N", text: { en: "I enjoy imagining how things could be different.", zh: "我喜欢想象事情可以是另一种样子。" } },
  { id: "sn-5", dimension: "SN", polarity: "S", text: { en: "I notice physical details others miss.", zh: "我能注意到别人忽略的物理细节。" } },
  { id: "sn-6", dimension: "SN", polarity: "N", text: { en: "I am drawn to abstract theories and patterns.", zh: "我会被抽象的理论和规律吸引。" } },
  { id: "sn-7", dimension: "SN", polarity: "S", text: { en: "I focus on what is, not what could be.", zh: "我关注现状，而非未来可能。" } },

  // ===== TF (Thinking vs Feeling) =====
  { id: "tf-1", dimension: "TF", polarity: "T", text: { en: "When making decisions, logic matters more than feelings.", zh: "做决定时，逻辑比感受更重要。" } },
  { id: "tf-2", dimension: "TF", polarity: "F", text: { en: "I weigh how a decision will affect people emotionally.", zh: "我会考虑决定对他人情感上的影响。" } },
  { id: "tf-3", dimension: "TF", polarity: "T", text: { en: "I value being right over being liked.", zh: "我宁愿被认为正确，也不愿仅仅被人喜欢。" } },
  { id: "tf-4", dimension: "TF", polarity: "F", text: { en: "I find it hard to give harsh but accurate feedback.", zh: "给出严厉但准确的反馈对我来说很难。" } },
  { id: "tf-5", dimension: "TF", polarity: "T", text: { en: "I can detach from my emotions to analyze a situation.", zh: "我能抽离情绪，客观分析一件事。" } },
  { id: "tf-6", dimension: "TF", polarity: "F", text: { en: "Harmony in a group is more important than winning an argument.", zh: "群体内的和谐比赢得争论更重要。" } },
  { id: "tf-7", dimension: "TF", polarity: "T", text: { en: "Fairness means treating everyone by the same rule.", zh: "公平就是用同一套规则对待所有人。" } },

  // ===== JP (Judging vs Perceiving) =====
  { id: "jp-1", dimension: "JP", polarity: "J", text: { en: "I prefer to have things planned and decided in advance.", zh: "我更喜欢提前安排好、决定好。" } },
  { id: "jp-2", dimension: "JP", polarity: "P", text: { en: "I keep my options open as long as possible.", zh: "我喜欢尽可能让选择保持开放。" } },
  { id: "jp-3", dimension: "JP", polarity: "J", text: { en: "Finishing tasks early gives me peace of mind.", zh: "提前完成任务会让我感到安心。" } },
  { id: "jp-4", dimension: "JP", polarity: "P", text: { en: "I work best with last-minute energy.", zh: "在最后关头的紧迫感下我效率最高。" } },
  { id: "jp-5", dimension: "JP", polarity: "J", text: { en: "I make to-do lists and stick to them.", zh: "我会列待办清单并严格执行。" } },
  { id: "jp-6", dimension: "JP", polarity: "P", text: { en: "I enjoy spontaneous plans more than scheduled ones.", zh: "比起计划好的安排，我更喜欢临时起意。" } },
  { id: "jp-7", dimension: "JP", polarity: "J", text: { en: "Uncertainty makes me uncomfortable.", zh: "不确定感会让我不舒服。" } },
];
