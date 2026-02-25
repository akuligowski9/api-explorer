"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Search, X, Unlock, Key, Lock, ShieldCheck, Globe, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { DEFAULT_FILTERS, countActiveFilters, type FilterState } from "@/lib/filters";

// ── Filter option types ──────────────────────────────────────────────

interface FilterOption {
  value: string;
  label: string;
}

const AUTH_OPTIONS: FilterOption[] = [
  { value: "any", label: "Any" },
  { value: "free", label: "Free" },
  { value: "apiKey", label: "API Key" },
  { value: "OAuth", label: "OAuth" },
];

const HTTPS_OPTIONS: FilterOption[] = [
  { value: "any", label: "Any" },
  { value: "yes", label: "HTTPS Only" },
];

const CORS_OPTIONS: FilterOption[] = [
  { value: "any", label: "Any" },
  { value: "yes", label: "Enabled" },
  { value: "no", label: "Disabled" },
  { value: "unknown", label: "Unknown" },
];

// ── Accent colors per filter value ───────────────────────────────────

function authAccent(value: string) {
  switch (value) {
    case "free":
      return "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400";
    case "apiKey":
      return "bg-amber-500/15 text-amber-600 dark:text-amber-400";
    case "OAuth":
      return "bg-violet-500/15 text-violet-600 dark:text-violet-400";
    default:
      return null;
  }
}

function authIcon(value: string) {
  if (value === "free") return <Unlock className="h-3 w-3" />;
  if (value === "apiKey") return <Key className="h-3 w-3" />;
  if (value === "OAuth") return <Lock className="h-3 w-3" />;
  return <Unlock className="h-3 w-3" />;
}

// ── InlineFilter sub-component ───────────────────────────────────────

type FilterKey = "auth" | "https" | "cors";

interface InlineFilterProps {
  filterKey: FilterKey;
  label: string;
  icon: React.ReactNode;
  value: string;
  options: FilterOption[];
  onChange: (value: string) => void;
  accentClass: string | null;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

function InlineFilter({
  label,
  icon,
  value,
  options,
  onChange,
  accentClass,
  isOpen,
  onToggle,
  onClose,
}: InlineFilterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isActive = value !== "any";
  const selectedLabel = options.find((o) => o.value === value)?.label ?? label;

  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    }

    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={onToggle}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all",
          isActive && accentClass
            ? accentClass
            : "bg-foreground/[0.04] text-muted-foreground hover:bg-foreground/[0.08] hover:text-foreground",
        )}
      >
        <span className="flex items-center justify-center">{icon}</span>
        <span>{isActive ? selectedLabel : label}</span>
        {isActive && (
          <span
            className="h-1.5 w-1.5 rounded-full bg-current animate-pulse"
          />
        )}
        <ChevronDown
          className={cn(
            "h-3 w-3 opacity-50 transition-transform",
            isOpen && "rotate-180",
          )}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 top-full z-50 mt-2 min-w-[160px] rounded-xl bg-popover/95 backdrop-blur-lg p-1 shadow-xl ring-1 ring-border/50"
          >
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  onClose();
                }}
                className={cn(
                  "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Main SearchFilterBar component ───────────────────────────────────

interface SearchFilterBarProps {
  query: string;
  onQueryChange: (value: string) => void;
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  resultCount: number;
  className?: string;
}

export function SearchFilterBar({
  query,
  onQueryChange,
  filters,
  onFiltersChange,
  resultCount,
  className,
}: SearchFilterBarProps) {
  const [openFilter, setOpenFilter] = useState<FilterKey | null>(null);
  const activeCount = countActiveFilters(filters);

  const toggleFilter = useCallback(
    (key: FilterKey) => {
      setOpenFilter((prev) => (prev === key ? null : key));
    },
    [],
  );

  const closeFilter = useCallback(() => setOpenFilter(null), []);

  return (
    <div className={cn("relative", className)}>
      <div
        className={cn(
          "overflow-hidden rounded-2xl",
          "bg-card/80 shadow-lg shadow-black/[0.03] ring-1 ring-border/50",
          "backdrop-blur-xl transition-shadow duration-300",
          "focus-within:shadow-xl focus-within:shadow-black/[0.06] focus-within:ring-ring/50",
          "dark:bg-card/80 dark:shadow-white/[0.02] dark:ring-border/50",
          "dark:focus-within:shadow-white/[0.04] dark:focus-within:ring-ring/50",
        )}
      >
        {/* Search row */}
        <div className="relative flex items-center">
          <Search className="ml-5 h-5 w-5 shrink-0 text-muted-foreground/60" />
          <input
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search 1,500+ APIs..."
            className={cn(
              "flex-1 bg-transparent px-4 py-4 text-base outline-none",
              "placeholder:text-muted-foreground/40",
            )}
          />
          {query && (
            <button
              onClick={() => onQueryChange("")}
              className="mr-3 rounded-lg p-1.5 text-muted-foreground/60 transition-colors hover:bg-black/[0.04] hover:text-foreground dark:hover:bg-white/[0.06]"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <div className="mr-5 shrink-0 text-xs text-muted-foreground/50">
            {resultCount.toLocaleString()} APIs
          </div>
        </div>

        {/* Divider */}
        <div className="mx-4 border-t border-border/30" />

        {/* Filter row */}
        <div className="flex items-center gap-2 px-4 py-2.5">
          <InlineFilter
            filterKey="auth"
            label="Auth"
            icon={authIcon(filters.auth)}
            value={filters.auth}
            options={AUTH_OPTIONS}
            onChange={(v) =>
              onFiltersChange({ ...filters, auth: v as FilterState["auth"] })
            }
            accentClass={authAccent(filters.auth)}
            isOpen={openFilter === "auth"}
            onToggle={() => toggleFilter("auth")}
            onClose={closeFilter}
          />

          <InlineFilter
            filterKey="https"
            label="HTTPS"
            icon={<ShieldCheck className="h-3 w-3" />}
            value={filters.https}
            options={HTTPS_OPTIONS}
            onChange={(v) =>
              onFiltersChange({ ...filters, https: v as FilterState["https"] })
            }
            accentClass={
              filters.https !== "any"
                ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                : null
            }
            isOpen={openFilter === "https"}
            onToggle={() => toggleFilter("https")}
            onClose={closeFilter}
          />

          <InlineFilter
            filterKey="cors"
            label="CORS"
            icon={<Globe className="h-3 w-3" />}
            value={filters.cors}
            options={CORS_OPTIONS}
            onChange={(v) =>
              onFiltersChange({ ...filters, cors: v as FilterState["cors"] })
            }
            accentClass={
              filters.cors !== "any"
                ? "bg-sky-500/15 text-sky-600 dark:text-sky-400"
                : null
            }
            isOpen={openFilter === "cors"}
            onToggle={() => toggleFilter("cors")}
            onClose={closeFilter}
          />

          <AnimatePresence>
            {activeCount > 0 && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.15 }}
                onClick={() => onFiltersChange(DEFAULT_FILTERS)}
                className="ml-auto text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                Clear filters
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
