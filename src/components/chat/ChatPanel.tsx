"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ChatPanelProps {
  type: string;
  greeting?: string;
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function ChatPanel({ type, greeting }: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>(
    greeting ? [{ role: "assistant", content: greeting }] : [],
  );
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  async function send() {
    const text = input.trim();
    if (!text || streaming) return;

    const userMsg: Message = { role: "user", content: text };
    const next = [...messages, userMsg];
    setMessages([...next, { role: "assistant", content: "" }]);
    setInput("");
    setStreaming(true);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, messages: next }),
        signal: controller.signal,
      });

      if (!res.ok || !res.body) {
        const errText = await res.text().catch(() => "Request failed");
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: "assistant",
            content: `[error] ${errText}`,
          };
          return updated;
        });
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: "assistant", content: acc };
          return updated;
        });
      }
    } catch (err) {
      if ((err as Error).name === "AbortError") return;
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content: `[network error] ${(err as Error).message}`,
        };
        return updated;
      });
    } finally {
      setStreaming(false);
      abortRef.current = null;
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800">
      <div className="border-b border-zinc-200 px-4 py-3 text-sm text-zinc-500 dark:border-zinc-800">
        Chat with {type.toUpperCase()}
      </div>

      <div className="space-y-3 p-4 min-h-[280px]">
        {messages.length === 0 && (
          <p className="text-sm text-zinc-400">Say something to start.</p>
        )}
        {messages.map((m, i) => (
          <div
            key={i}
            className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}
          >
            <div
              className={cn(
                "max-w-[80%] whitespace-pre-wrap rounded-2xl px-4 py-2 text-sm",
                m.role === "user"
                  ? "rounded-br-sm bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900"
                  : "rounded-bl-sm bg-zinc-100 dark:bg-zinc-900",
              )}
            >
              {m.content || (streaming && i === messages.length - 1 ? "…" : "")}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-end gap-2 border-t border-zinc-200 p-3 dark:border-zinc-800">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          rows={1}
          placeholder="Type a message…  (Enter to send, Shift+Enter for newline)"
          className="flex-1 resize-none rounded-lg border border-zinc-200 bg-transparent px-3 py-2 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:border-zinc-800 dark:focus:ring-zinc-700"
        />
        <Button onClick={send} disabled={streaming || !input.trim()}>
          {streaming ? "…" : "Send"}
        </Button>
      </div>
    </div>
  );
}
