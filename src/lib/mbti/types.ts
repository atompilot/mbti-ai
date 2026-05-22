export type Dimension = "EI" | "SN" | "TF" | "JP";

export type DimensionEnd = "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P";

export const DIMENSIONS: { code: Dimension; left: DimensionEnd; right: DimensionEnd; label: string }[] = [
  { code: "EI", left: "E", right: "I", label: "Extraversion ↔ Introversion" },
  { code: "SN", left: "S", right: "N", label: "Sensing ↔ Intuition" },
  { code: "TF", left: "T", right: "F", label: "Thinking ↔ Feeling" },
  { code: "JP", left: "J", right: "P", label: "Judging ↔ Perceiving" },
];

export const MBTI_TYPES = [
  "INTJ", "INTP", "ENTJ", "ENTP",
  "INFJ", "INFP", "ENFJ", "ENFP",
  "ISTJ", "ISFJ", "ESTJ", "ESFJ",
  "ISTP", "ISFP", "ESTP", "ESFP",
] as const;

export type MBTIType = (typeof MBTI_TYPES)[number];

export type LikertValue = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export const LIKERT_LABELS: Record<LikertValue, { en: string; zh: string }> = {
  1: { en: "Strongly disagree", zh: "非常不同意" },
  2: { en: "Disagree", zh: "不同意" },
  3: { en: "Slightly disagree", zh: "有点不同意" },
  4: { en: "Neutral", zh: "中立" },
  5: { en: "Slightly agree", zh: "有点同意" },
  6: { en: "Agree", zh: "同意" },
  7: { en: "Strongly agree", zh: "非常同意" },
};

/**
 * A single MBTI question.
 *
 * `dimension` is which axis it measures.
 * `polarity` is which end of the axis "agree" pushes the score toward.
 * Example: dimension="EI", polarity="E" — agreeing leans Extraverted.
 */
export interface MBTIQuestion {
  id: string;
  dimension: Dimension;
  polarity: DimensionEnd;
  text: { en: string; zh: string };
}

/**
 * Score for one dimension in range [-1, 1].
 * Negative → left letter (E/S/T/J), positive → right letter (I/N/F/P).
 * Magnitude is the strength of the lean.
 */
export interface DimensionScore {
  dimension: Dimension;
  score: number;
  letter: DimensionEnd;
  percentageLeft: number;
  percentageRight: number;
}

export interface TestResult {
  type: MBTIType;
  scores: Record<Dimension, DimensionScore>;
  answeredCount: number;
}
