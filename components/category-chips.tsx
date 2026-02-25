"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { FILTER_CATEGORIES } from "@/lib/categories";

interface CategoryChipsProps {
  selected: string;
  onSelect: (category: string) => void;
  className?: string;
}

export function CategoryChips({
  selected,
  onSelect,
  className,
}: CategoryChipsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 2);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    const observer = new ResizeObserver(checkScroll);
    observer.observe(el);

    return () => {
      el.removeEventListener("scroll", checkScroll);
      observer.disconnect();
    };
  }, [checkScroll]);

  // Auto-scroll active chip into view
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const active = el.querySelector("[data-active='true']") as HTMLElement;
    if (active) {
      active.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
    }
  }, [selected]);

  return (
    <div className={cn("relative", className)}>
      {/* Left fade */}
      <div
        className={cn(
          "pointer-events-none absolute left-0 top-0 z-10 h-full w-12 bg-gradient-to-r from-background to-transparent transition-opacity duration-200",
          canScrollLeft ? "opacity-100" : "opacity-0",
        )}
      />

      {/* Right fade */}
      <div
        className={cn(
          "pointer-events-none absolute right-0 top-0 z-10 h-full w-12 bg-gradient-to-l from-background to-transparent transition-opacity duration-200",
          canScrollRight ? "opacity-100" : "opacity-0",
        )}
      />

      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto scrollbar-none"
      >
        {FILTER_CATEGORIES.map((category) => {
          const isActive = selected === category;
          return (
            <button
              key={category}
              data-active={isActive}
              onClick={() => onSelect(category)}
              className={cn(
                "shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-foreground text-background shadow-md"
                  : "bg-secondary/60 text-muted-foreground hover:bg-secondary hover:text-foreground",
              )}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
}
