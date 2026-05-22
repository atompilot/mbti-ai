import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const TYPES = [
  "INTJ", "INTP", "ENTJ", "ENTP",
  "INFJ", "INFP", "ENFJ", "ENFP",
  "ISTJ", "ISFJ", "ESTJ", "ESFJ",
  "ISTP", "ISFP", "ESTP", "ESFP",
];

export default function ChatIndexPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16 space-y-8">
      <div className="space-y-3">
        <Badge variant="outline">Week 2 · planned</Badge>
        <h1 className="text-4xl font-semibold tracking-tight">Chat with a type</h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Pick a personality to start a conversation. Each type uses a dedicated
          system prompt plus a curated few-shot library.
        </p>
      </div>

      <div className="grid gap-3 grid-cols-2 sm:grid-cols-4">
        {TYPES.map((code) => (
          <Link
            key={code}
            href={`/chat/${code.toLowerCase()}`}
            className="group"
          >
            <Card className="transition group-hover:border-zinc-900 dark:group-hover:border-zinc-50">
              <CardHeader className="text-center">
                <CardTitle className="font-mono">{code}</CardTitle>
                <CardDescription>coming soon</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
