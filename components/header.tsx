import { Compass, Github, Star } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils";
import type { Columns } from "./home-client";

function ColIcon({ cols }: { cols: Columns }) {
  const sq = "bg-current rounded-[1px]";
  if (cols === 1) return (
    <div className="grid grid-cols-1 gap-[2px] w-4 h-4">
      <div className={sq} />
    </div>
  );
  if (cols === 2) return (
    <div className="grid grid-cols-2 gap-[2px] w-4 h-4">
      <div className={sq} /><div className={sq} />
    </div>
  );
  return (
    <div className="grid grid-cols-3 gap-[2px] w-4 h-4">
      <div className={sq} /><div className={sq} /><div className={sq} />
    </div>
  );
}

interface HeaderProps {
  columns?: Columns;
  onColumnsChange?: (cols: Columns) => void;
}

export function Header({ columns, onColumnsChange }: HeaderProps) {
  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-foreground text-background">
          <Compass className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-lg font-bold tracking-tight">API Explorer</h1>
          <p className="text-xs text-muted-foreground">Discover APIs visually</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <a
          href="https://github.com/akuligowski9/api-explorer"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          <Github className="h-4 w-4" />
          <Star className="h-3 w-3" />
          Star
        </a>
        {columns !== undefined && onColumnsChange && (
          <div className="flex items-center gap-1 rounded-lg border border-border bg-card p-1">
            {([1, 2, 3] as Columns[]).map((cols) => (
              <button
                key={cols}
                onClick={() => onColumnsChange(cols)}
                aria-label={`${cols} column layout`}
                className={cn(
                  "rounded-md p-1.5 transition-colors",
                  columns === cols
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <ColIcon cols={cols} />
              </button>
            ))}
          </div>
        )}
        <ThemeToggle />
      </div>
    </header>
  );
}
