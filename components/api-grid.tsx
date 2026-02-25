"use client";

import { useState, useMemo, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SearchBar } from "./search-bar";
import { CategoryChips } from "./category-chips";
import { ApiCard } from "./api-card";
import { searchApis } from "@/lib/search";
import { getCategoriesForFilter } from "@/lib/categories";
import { cn } from "@/lib/utils";
import type { ApiEntry } from "@/lib/types";

type Columns = 1 | 2 | 3;

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

const GRID_COLS: Record<Columns, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
};

const PAGE_SIZE = 36;

interface ApiGridProps {
  apis: ApiEntry[];
}

export function ApiGrid({ apis }: ApiGridProps) {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [columns, setColumns] = useState<Columns>(() =>
    typeof window !== "undefined" && window.innerWidth < 640 ? 1 : 3
  );

  const filtered = useMemo(() => {
    let result = apis;

    // Apply category filter
    const categories = getCategoriesForFilter(activeFilter);
    if (categories) {
      result = result.filter((api) => categories.includes(api.Category));
    }

    // Apply search
    result = searchApis(result, query);

    // Sort: featured first, then alphabetically
    result.sort((a, b) => {
      const aFeatured = a.preview ? 0 : 1;
      const bFeatured = b.preview ? 0 : 1;
      if (aFeatured !== bFeatured) return aFeatured - bFeatured;
      return a.API.localeCompare(b.API);
    });

    return result;
  }, [apis, query, activeFilter]);

  // Reset visible count when filters change
  const handleFilterChange = useCallback((cat: string) => {
    setActiveFilter(cat);
    setQuery("");
    setVisibleCount(PAGE_SIZE);
  }, []);

  const handleSearchChange = useCallback((value: string) => {
    setQuery(value);
    setVisibleCount(PAGE_SIZE);
  }, []);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;
  const remaining = filtered.length - visibleCount;

  return (
    <div className="space-y-6">
      <SearchBar
        value={query}
        onChange={handleSearchChange}
        resultCount={filtered.length}
      />

      <div className="flex items-center gap-2">
        <CategoryChips
          selected={activeFilter}
          onSelect={handleFilterChange}
          className="flex-1"
        />
        <div className="flex shrink-0 items-center gap-1 rounded-lg border border-border bg-card p-1">
          {([1, 2, 3] as Columns[]).map((cols) => (
            <button
              key={cols}
              onClick={() => setColumns(cols)}
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
      </div>

      {filtered.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-lg text-muted-foreground">No APIs found</p>
          <p className="mt-1 text-sm text-muted-foreground/60">
            Try a different search term or category
          </p>
        </div>
      ) : (
        <>
          <div className={cn("grid gap-4", GRID_COLS[columns])}>
            <AnimatePresence mode="popLayout">
              {visible.map((api, i) => (
                <ApiCard
                  key={api.slug}
                  api={api}
                  index={i}
                  featured={!!api.preview}
                />
              ))}
            </AnimatePresence>
          </div>

          {hasMore && (
            <motion.div
              className="flex justify-center pt-4 pb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <button
                onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                className="group flex items-center gap-2 rounded-full bg-foreground/5 px-8 py-3 text-sm font-medium text-foreground transition-all hover:bg-foreground/10 hover:shadow-md active:scale-[0.98]"
              >
                Show more
                <span className="text-xs text-muted-foreground">
                  ({Math.min(remaining, PAGE_SIZE)} of {remaining} remaining)
                </span>
              </button>
            </motion.div>
          )}
        </>
      )}
    </div>
  );
}
