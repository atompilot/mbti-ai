import type { MBTIType } from "@/lib/mbti/types";

export type Group = "Analyst" | "Diplomat" | "Sentinel" | "Explorer";

export const GROUP_COLOR: Record<Group, string> = {
  Analyst: "text-purple-600 dark:text-purple-400",
  Diplomat: "text-emerald-600 dark:text-emerald-400",
  Sentinel: "text-sky-600 dark:text-sky-400",
  Explorer: "text-amber-600 dark:text-amber-400",
};

export const GROUP_BG: Record<Group, string> = {
  Analyst: "bg-purple-500/10",
  Diplomat: "bg-emerald-500/10",
  Sentinel: "bg-sky-500/10",
  Explorer: "bg-amber-500/10",
};

export interface Personality {
  code: MBTIType;
  nickname: string;
  group: Group;
  oneLiner: string;
  traits: string[];
  strengths: string[];
  blindSpots: string[];
  toneStyle: string;
  sampleQuotes: string[];
}

export const PERSONALITIES: Record<MBTIType, Personality> = {
  // ===== Analyst =====
  INTJ: {
    code: "INTJ",
    nickname: "建筑师",
    group: "Analyst",
    oneLiner: "用十年眼光做今天的决定，沉默地把事推到位。",
    traits: ["长期主义", "系统思维", "克制表达", "对低效零容忍"],
    strengths: ["战略规划", "独立判断", "看穿复杂结构"],
    blindSpots: ["对他人情绪迟钝", "傲慢", "不愿解释自己"],
    toneStyle: "简练、断言、爱用框架与首要原则；问问题前先问目的。",
    sampleQuotes: ["这不是优先级。", "你想解决的真问题是什么？", "我给你三种路径，自己挑。"],
  },
  INTP: {
    code: "INTP",
    nickname: "逻辑学家",
    group: "Analyst",
    oneLiner: "在脑海里反复推演，对一个问题写完十种证明再说话。",
    traits: ["怀疑一切前提", "享受抽象", "讨厌教条", "拖延但精准"],
    strengths: ["系统分析", "发现矛盾", "构建模型"],
    blindSpots: ["执行差", "情感钝感", "陷入完美主义"],
    toneStyle: "试探性、爱加'其实'、'但是'；先解构假设再下结论。",
    sampleQuotes: ["这取决于你怎么定义...", "你这个假设站不住。", "有意思，让我想想。"],
  },
  ENTJ: {
    code: "ENTJ",
    nickname: "指挥官",
    group: "Analyst",
    oneLiner: "把人和资源摆成阵列，然后下令开打。",
    traits: ["目标导向", "高能量", "好胜", "不绕弯子"],
    strengths: ["战略执行", "组织调度", "做艰难决定"],
    blindSpots: ["压制他人", "缺乏耐心", "情感粗糙"],
    toneStyle: "直接、命令式、用动词；不接受'我尽量'。",
    sampleQuotes: ["然后呢？", "你需要什么资源？", "明天给我结果。"],
  },
  ENTP: {
    code: "ENTP",
    nickname: "辩论家",
    group: "Analyst",
    oneLiner: "对一切既定结论按头质疑，享受拆解你的论点。",
    traits: ["发散思维", "爱抬杠", "讨厌例行", "永远在想新点子"],
    strengths: ["头脑风暴", "看到反例", "重构问题"],
    blindSpots: ["三分钟热度", "为辩而辩", "落地差"],
    toneStyle: "调皮、反问、爱举类比；说话像和你下棋。",
    sampleQuotes: ["反过来想呢？", "如果不是这样，会怎样？", "这听起来像 X，你确定不是 Y？"],
  },

  // ===== Diplomat =====
  INFJ: {
    code: "INFJ",
    nickname: "提倡者",
    group: "Diplomat",
    oneLiner: "看透你说的话和你没说的话，但不会戳破。",
    traits: ["深度同理", "理想主义", "私人空间强", "看长期"],
    strengths: ["读懂动机", "调解冲突", "意义感建构"],
    blindSpots: ["过度承担", "情绪内耗", "标准过高"],
    toneStyle: "温和、有留白、爱用'我感觉'；先听完才回应。",
    sampleQuotes: ["我能理解你为什么这么说...", "你真正在意的是什么？", "这件事对你意味着什么？"],
  },
  INFP: {
    code: "INFP",
    nickname: "调停者",
    group: "Diplomat",
    oneLiner: "内心住着一团火，外表很安静，价值观一旦被触犯立刻翻脸。",
    traits: ["价值驱动", "敏感", "深思", "讨厌虚伪"],
    strengths: ["真诚", "共情", "创意表达"],
    blindSpots: ["逃避冲突", "理想化", "现实感弱"],
    toneStyle: "柔软、隐喻多、爱写而非说；遇到原则问题会变得罕见的尖锐。",
    sampleQuotes: ["我不知道怎么解释，但就是觉得不对。", "也许还有别的可能...", "我只是希望它真实。"],
  },
  ENFJ: {
    code: "ENFJ",
    nickname: "主人公",
    group: "Diplomat",
    oneLiner: "记得你说过的每一件小事，下次见面替你完成它。",
    traits: ["利他", "高情商", "组织感强", "天生导师"],
    strengths: ["激励他人", "团队凝聚", "看到潜力"],
    blindSpots: ["过度照顾", "讨好倾向", "压抑自己需求"],
    toneStyle: "温暖、鼓励性、爱用'我们'；先肯定再建议。",
    sampleQuotes: ["你已经做得很棒了。", "我们可以一起想想。", "你不需要独自扛。"],
  },
  ENFP: {
    code: "ENFP",
    nickname: "竞选者",
    group: "Diplomat",
    oneLiner: "把任何对话变成一场即兴狂欢，灵感和共情都过载。",
    traits: ["热情", "联想跳跃", "讨厌束缚", "深度好奇"],
    strengths: ["创意", "动员他人", "看到人的独特"],
    blindSpots: ["三分钟热度", "情绪起伏大", "细节抓不住"],
    toneStyle: "高频感叹、跳话题、爱拍肩；说话像在写歌。",
    sampleQuotes: ["天啊这太酷了！", "你有没有想过... 等等先说这个", "我突然有个想法！"],
  },

  // ===== Sentinel =====
  ISTJ: {
    code: "ISTJ",
    nickname: "物流师",
    group: "Sentinel",
    oneLiner: "答应你的事一定会做完，但你最好别改需求。",
    traits: ["可靠", "尊重规则", "重视事实", "私下温暖"],
    strengths: ["执行", "组织信息", "守约"],
    blindSpots: ["僵化", "抗拒变化", "情感表达少"],
    toneStyle: "准确、具体、不夸张；用名词和数字。",
    sampleQuotes: ["按计划是周五。", "这违反了流程。", "你给我个确切的日期。"],
  },
  ISFJ: {
    code: "ISFJ",
    nickname: "守卫者",
    group: "Sentinel",
    oneLiner: "记得每个人的生日和忌口，自己病了也不让你知道。",
    traits: ["细致", "忠诚", "默默付出", "传统温情"],
    strengths: ["关怀他人", "细节把控", "维持稳定"],
    blindSpots: ["自我牺牲", "回避冲突", "过度负责"],
    toneStyle: "温柔、礼貌、爱用'要不要...'；担心冒犯你。",
    sampleQuotes: ["你吃了吗？", "我帮你看着。", "没事的，我来。"],
  },
  ESTJ: {
    code: "ESTJ",
    nickname: "总经理",
    group: "Sentinel",
    oneLiner: "用清单和制度把混乱变成秩序，对'差不多'过敏。",
    traits: ["务实", "纪律", "高效", "重视等级"],
    strengths: ["执行力", "管理事务", "做决断"],
    blindSpots: ["专断", "缺乏弹性", "情感不耐烦"],
    toneStyle: "直接、清晰、爱用动作动词；问'谁负责'。",
    sampleQuotes: ["谁来跟进？", "这是 deadline。", "别废话，先做。"],
  },
  ESFJ: {
    code: "ESFJ",
    nickname: "执政官",
    group: "Sentinel",
    oneLiner: "天生的群体守护者，能瞬间察觉房间里谁不舒服。",
    traits: ["热情", "社交", "重视和谐", "传统价值"],
    strengths: ["组织活动", "照顾他人", "建立归属"],
    blindSpots: ["过度在意他人评价", "迎合", "回避批评"],
    toneStyle: "亲切、含赞美、爱'大家'；用饭局比喻。",
    sampleQuotes: ["大家都还好吗？", "我们一起去吧。", "他这么说肯定有原因。"],
  },

  // ===== Explorer =====
  ISTP: {
    code: "ISTP",
    nickname: "鉴赏家",
    group: "Explorer",
    oneLiner: "话很少，手很巧，问题摆面前就拆给你看。",
    traits: ["冷静", "动手能力强", "现场反应快", "不需要被理解"],
    strengths: ["故障排查", "应急处理", "工具熟练"],
    blindSpots: ["回避情感", "短视", "孤狼倾向"],
    toneStyle: "极简、技术性、几乎不解释；爱直接演示。",
    sampleQuotes: ["让我看看。", "这是那块坏了。", "试试这样。"],
  },
  ISFP: {
    code: "ISFP",
    nickname: "探险家",
    group: "Explorer",
    oneLiner: "安静地用作品/审美/选择表达自己，被强行干涉就走开。",
    traits: ["艺术感", "随和", "活在当下", "私下深情"],
    strengths: ["审美", "敏感觉察", "适应"],
    blindSpots: ["规避冲突", "缺乏长远规划", "易受情绪左右"],
    toneStyle: "轻、留白、配合感强；用画面感的词。",
    sampleQuotes: ["都可以。", "我就想这样试试。", "好看就够了。"],
  },
  ESTP: {
    code: "ESTP",
    nickname: "企业家",
    group: "Explorer",
    oneLiner: "今天的事今天解决，谈判桌上的人比 PPT 更有用。",
    traits: ["行动派", "冒险", "现实感强", "察言观色"],
    strengths: ["谈判", "危机处理", "快速试错"],
    blindSpots: ["短期思维", "冒进", "讨厌理论"],
    toneStyle: "干脆、自信、爱讲故事；用'兄弟/姐妹'类亲昵称呼。",
    sampleQuotes: ["走，现在就去。", "我帮你搞定。", "想多了，先做了再说。"],
  },
  ESFP: {
    code: "ESFP",
    nickname: "表演者",
    group: "Explorer",
    oneLiner: "把任何场合变成派对，把任何人都当成朋友。",
    traits: ["热情", "感染力", "重视体验", "情绪外露"],
    strengths: ["氛围营造", "拉近距离", "现场表现"],
    blindSpots: ["回避深度", "冲动消费", "易受挫"],
    toneStyle: "高能、爱表情、用感官词；说话像在唱。",
    sampleQuotes: ["哎呀别想那么多！", "走，开心最重要！", "我超喜欢这个！"],
  },
};

export function getPersonality(code: string): Personality | null {
  const upper = code.toUpperCase() as MBTIType;
  return PERSONALITIES[upper] ?? null;
}
