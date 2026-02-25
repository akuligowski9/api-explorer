import { Compass, Github, Star } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-foreground text-background">
          <Compass className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-lg font-bold tracking-tight">API Explorer</h1>
          <p className="text-xs text-muted-foreground">
            Discover APIs visually
          </p>
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
        <ThemeToggle />
      </div>
    </header>
  );
}
