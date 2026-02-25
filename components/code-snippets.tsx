"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { colorizeCode } from "@/lib/syntax-highlight";
import { CopyButton } from "@/components/copy-button";
import { generateCurl, generateJavaScript, generatePython } from "@/lib/generate-snippets";
import type { ApiEntry } from "@/lib/types";

const tabs = [
  { id: "curl", label: "cURL", file: "request.sh" },
  { id: "javascript", label: "JavaScript", file: "request.js" },
  { id: "python", label: "Python", file: "request.py" },
] as const;

type TabId = (typeof tabs)[number]["id"];

interface CodeSnippetsProps {
  api: ApiEntry;
}

export function CodeSnippets({ api }: CodeSnippetsProps) {
  const [activeTab, setActiveTab] = useState<TabId>("curl");

  const snippets: Record<TabId, string> = {
    curl: generateCurl(api),
    javascript: generateJavaScript(api),
    python: generatePython(api),
  };

  const code = snippets[activeTab];
  const activeFile = tabs.find((t) => t.id === activeTab)!.file;
  const lines = code.split("\n");

  return (
    <section>
      <h2 className="mb-3 text-lg font-semibold">Code Snippets</h2>

      <div
        className={cn(
          "overflow-hidden rounded-xl bg-neutral-900 text-neutral-100",
          "ring-1 ring-white/[0.06]",
        )}
      >
        {/* Title bar */}
        <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-2.5">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-red-500/80" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
              <div className="h-3 w-3 rounded-full bg-green-500/80" />
            </div>
            <span className="text-xs text-neutral-500">{activeFile}</span>
          </div>
          <CopyButton
            text={code}
            label="Copy"
            className="rounded-md bg-transparent px-2.5 py-1 text-neutral-400 hover:bg-transparent hover:text-neutral-200 dark:bg-transparent dark:text-neutral-400 dark:hover:text-neutral-200"
          />
        </div>

        {/* Tab bar */}
        <div className="flex border-b border-white/[0.06]">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-4 py-2 text-xs font-medium transition-colors",
                activeTab === tab.id
                  ? "bg-white/[0.06] text-neutral-100"
                  : "text-neutral-500 hover:text-neutral-300",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Code content */}
        <div className="overflow-x-auto">
          <pre className="p-4 text-sm leading-relaxed">
            <code>
              {lines.map((line, i) => (
                <div key={i} className="flex">
                  <span className="mr-4 inline-block w-6 select-none text-right text-neutral-600">
                    {i + 1}
                  </span>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: colorizeCode(line, activeTab),
                    }}
                  />
                </div>
              ))}
            </code>
          </pre>
        </div>
      </div>
    </section>
  );
}

