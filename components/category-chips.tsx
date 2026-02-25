"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { FILTER_CATEGORIES } from "@/lib/categories";

const COLLAPSED_MAX_HEIGHT = 88; // ~2 rows of chips

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
  const [expanded, setExpanded] = useState(false);
  const [overflows, setOverflows] = useState(false);
  const [hiddenCount, setHiddenCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    function measure() {
      if (!el) return;
      const hasOverflow = el.scrollHeight > COLLAPSED_MAX_HEIGHT + 4;
      setOverflows(hasOverflow);

      if (hasOverflow && !expanded) {
        // Count how many chips are hidden
        const chips = Array.from(el.children) as HTMLElement[];
        let count = 0;
        for (const chip of chips) {
          if (chip.offsetTop + chip.offsetHeight > COLLAPSED_MAX_HEIGHT) {
            count++;
          }
        }
        setHiddenCount(count);
      }
    }

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [expanded]);

  return (
    <div className={cn("relative", className)}>
      <motion.div
        ref={containerRef}
        animate={{ maxHeight: expanded ? 1000 : COLLAPSED_MAX_HEIGHT }}
        initial={false}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="flex flex-wrap gap-2 overflow-hidden"
      >
        {FILTER_CATEGORIES.map((category) => {
          const isActive = selected === category;
          return (
            <button
              key={category}
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
      </motion.div>

      <AnimatePresence>
        {overflows && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setExpanded((prev) => !prev)}
            className="mt-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            {expanded
              ? "Show less"
              : `+${hiddenCount} more`}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
