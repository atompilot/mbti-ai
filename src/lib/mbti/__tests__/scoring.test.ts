/**
 * Lightweight self-check for the scoring engine.
 * Run with: pnpm tsx src/lib/mbti/__tests__/scoring.test.ts
 *
 * No test runner dependency — just throws on failure.
 */
import { QUICK_QUESTIONS } from "../questions";
import { scoreTest } from "../scoring";
import type { LikertValue } from "../types";

function assert(cond: unknown, msg: string): asserts cond {
  if (!cond) throw new Error("ASSERT FAIL: " + msg);
}

function answersFor(picker: (q: { dimension: string; polarity: string }) => LikertValue) {
  const a: Record<string, LikertValue> = {};
  for (const q of QUICK_QUESTIONS) a[q.id] = picker(q);
  return a;
}

// Case 1: agree strongly with every E/S/T/J polarity question → expect ESTJ
{
  const a = answersFor((q) =>
    (["E", "S", "T", "J"] as const).includes(q.polarity as "E") ? 7 : 1,
  );
  const r = scoreTest(QUICK_QUESTIONS, a);
  assert(r.type === "ESTJ", `expected ESTJ, got ${r.type}`);
  assert(r.scores.EI.percentageLeft === 100, "EI should be 100% E");
  assert(r.scores.SN.percentageLeft === 100, "SN should be 100% S");
}

// Case 2: agree strongly with every I/N/F/P polarity question → expect INFP
{
  const a = answersFor((q) =>
    (["I", "N", "F", "P"] as const).includes(q.polarity as "I") ? 7 : 1,
  );
  const r = scoreTest(QUICK_QUESTIONS, a);
  assert(r.type === "INFP", `expected INFP, got ${r.type}`);
  assert(r.scores.EI.percentageRight === 100, "EI should be 100% I");
}

// Case 3: all neutral → tie breaks toward right letter, expect INFP
{
  const a = answersFor(() => 4);
  const r = scoreTest(QUICK_QUESTIONS, a);
  assert(r.type === "INFP", `tie should resolve to INFP, got ${r.type}`);
  for (const s of Object.values(r.scores)) {
    assert(s.percentageLeft === 50 && s.percentageRight === 50, "should be 50/50");
  }
}

// Case 4: partial answers — only one EI question answered, lean E
{
  const a: Record<string, LikertValue> = { "ei-1": 7 };
  const r = scoreTest(QUICK_QUESTIONS, a);
  assert(r.scores.EI.letter === "E", `partial EI lean should be E, got ${r.scores.EI.letter}`);
}

// eslint-disable-next-line no-console
console.log("✓ scoring self-checks passed");
