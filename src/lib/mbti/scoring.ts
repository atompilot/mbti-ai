import {
  DIMENSIONS,
  type Dimension,
  type DimensionScore,
  type LikertValue,
  type MBTIQuestion,
  type MBTIType,
  type TestResult,
} from "./types";

/**
 * Convert a 1-7 Likert answer into a signed contribution in [-3, 3].
 * 4 (neutral) → 0; 7 (strongly agree) → +3; 1 (strongly disagree) → -3.
 */
function signedAnswer(value: LikertValue): number {
  return value - 4;
}

/**
 * Compute a single dimension's score from the relevant answered questions.
 *
 * For each question on the dimension:
 *   - signed answer ∈ [-3, 3]
 *   - if polarity matches the RIGHT letter, contribute +signed
 *   - if polarity matches the LEFT letter, contribute -signed
 *
 * Score is normalized into [-1, 1] by dividing by max possible magnitude (count * 3).
 * Negative → leans LEFT letter (E / S / T / J).
 * Positive → leans RIGHT letter (I / N / F / P).
 */
function scoreDimension(
  dimension: Dimension,
  questions: MBTIQuestion[],
  answers: Record<string, LikertValue>,
): DimensionScore {
  const spec = DIMENSIONS.find((d) => d.code === dimension);
  if (!spec) throw new Error(`Unknown dimension: ${dimension}`);

  const items = questions.filter((q) => q.dimension === dimension);
  let sum = 0;
  let answered = 0;

  for (const q of items) {
    const value = answers[q.id];
    if (value === undefined) continue;
    const contribution = signedAnswer(value) * (q.polarity === spec.right ? 1 : -1);
    sum += contribution;
    answered += 1;
  }

  const maxMagnitude = answered * 3 || 1;
  const score = sum / maxMagnitude;
  const letter = score >= 0 ? spec.right : spec.left;
  const leanRight = (score + 1) / 2;
  const percentageRight = Math.round(leanRight * 100);
  const percentageLeft = 100 - percentageRight;

  return {
    dimension,
    score,
    letter,
    percentageLeft,
    percentageRight,
  };
}

export function scoreTest(
  questions: MBTIQuestion[],
  answers: Record<string, LikertValue>,
): TestResult {
  const scores = {} as Record<Dimension, DimensionScore>;
  for (const { code } of DIMENSIONS) {
    scores[code] = scoreDimension(code, questions, answers);
  }

  const type = (scores.EI.letter +
    scores.SN.letter +
    scores.TF.letter +
    scores.JP.letter) as MBTIType;

  return {
    type,
    scores,
    answeredCount: Object.keys(answers).length,
  };
}
