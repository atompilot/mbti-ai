import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const TYPES = [
  { code: "INTJ", nickname: "Architect", group: "Analyst" },
  { code: "INTP", nickname: "Logician", group: "Analyst" },
  { code: "ENTJ", nickname: "Commander", group: "Analyst" },
  { code: "ENTP", nickname: "Debater", group: "Analyst" },
  { code: "INFJ", nickname: "Advocate", group: "Diplomat" },
  { code: "INFP", nickname: "Mediator", group: "Diplomat" },
  { code: "ENFJ", nickname: "Protagonist", group: "Diplomat" },
  { code: "ENFP", nickname: "Campaigner", group: "Diplomat" },
  { code: "ISTJ", nickname: "Logistician", group: "Sentinel" },
  { code: "ISFJ", nickname: "Defender", group: "Sentinel" },
  { code: "ESTJ", nickname: "Executive", group: "Sentinel" },
  { code: "ESFJ", nickname: "Consul", group: "Sentinel" },
  { code: "ISTP", nickname: "Virtuoso", group: "Explorer" },
  { code: "ISFP", nickname: "Adventurer", group: "Explorer" },
  { code: "ESTP", nickname: "Entrepreneur", group: "Explorer" },
  { code: "ESFP", nickname: "Entertainer", group: "Explorer" },
];

const GROUP_COLOR: Record<string, string> = {
  Analyst: "text-purple-600 dark:text-purple-400",
  Diplomat: "text-emerald-600 dark:text-emerald-400",
  Sentinel: "text-sky-600 dark:text-sky-400",
  Explorer: "text-amber-600 dark:text-amber-400",
};

export default function TypesIndexPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16 space-y-8">
      <div className="space-y-3">
        <Badge variant="outline">Week 3 · planned</Badge>
        <h1 className="text-4xl font-semibold tracking-tight">16 Personality Types</h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Encyclopedia entries for each MBTI type. Each page will include traits,
          strengths, blind spots, famous examples, and compatibility notes.
        </p>
      </div>

      <div className="grid gap-3 grid-cols-2 sm:grid-cols-4">
        {TYPES.map(({ code, nickname, group }) => (
          <Link key={code} href={`/types/${code.toLowerCase()}`} className="group">
            <Card className="transition group-hover:border-zinc-900 dark:group-hover:border-zinc-50">
              <CardHeader>
                <CardTitle className="font-mono">{code}</CardTitle>
                <CardDescription>
                  <span className={GROUP_COLOR[group]}>{group}</span> · {nickname}
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
