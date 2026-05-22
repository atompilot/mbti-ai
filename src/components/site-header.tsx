import Link from "next/link";

const NAV = [
  { href: "/test", label: "Test" },
  { href: "/chat", label: "Chat" },
  { href: "/types", label: "16 Types" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200/60 bg-white/70 backdrop-blur dark:border-zinc-800/60 dark:bg-zinc-950/70">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="inline-block h-2 w-2 rounded-full bg-orange-500" />
          mbti-ai
        </Link>
        <nav className="flex items-center gap-6 text-sm text-zinc-600 dark:text-zinc-400">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition hover:text-zinc-900 dark:hover:text-zinc-50"
            >
              {item.label}
            </Link>
          ))}
          <a
            href="https://github.com/atompilot/mbti-ai"
            target="_blank"
            rel="noreferrer"
            className="text-zinc-500 transition hover:text-zinc-900 dark:hover:text-zinc-50"
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}
