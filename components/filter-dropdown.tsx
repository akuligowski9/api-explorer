"use client";

import { useState, useRef, useEffect, useCallback, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface FilterOption {
  value: string;
  label: string;
}

interface FilterDropdownProps {
  label: string;
  icon: ReactNode;
  value: string;
  options: FilterOption[];
  onChange: (value: string) => void;
  accentClass?: string;
}

export function FilterDropdown({
  label,
  icon,
  value,
  options,
  onChange,
  accentClass,
}: FilterDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const isActive = value !== options[0]?.value;
  const selectedLabel = options.find((o) => o.value === value)?.label ?? label;

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;

    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        close();
      }
    }

    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, close]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-all",
          "border",
          isActive
            ? accentClass ?? "border-foreground/20 bg-foreground/5 text-foreground"
            : "border-border bg-background text-muted-foreground hover:bg-secondary/60 hover:text-foreground",
        )}
      >
        <span className="flex h-4 w-4 items-center justify-center">{icon}</span>
        <span>{selectedLabel}</span>
        <svg
          className={cn(
            "h-3 w-3 transition-transform",
            open && "rotate-180",
          )}
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M3 5l3 3 3-3" />
        </svg>
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-1 min-w-[160px] rounded-lg border border-border bg-popover p-1 shadow-lg">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value);
                close();
              }}
              className={cn(
                "flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                value === option.value
                  ? "bg-accent text-accent-foreground font-medium"
                  : "text-popover-foreground hover:bg-accent/50",
              )}
            >
              <span
                className={cn(
                  "flex h-4 w-4 items-center justify-center rounded-full border-2",
                  value === option.value
                    ? "border-foreground"
                    : "border-muted-foreground/40",
                )}
              >
                {value === option.value && (
                  <span className="h-2 w-2 rounded-full bg-foreground" />
                )}
              </span>
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
