import { useEffect } from "react";

/**
 * Registers a keydown listener that fires `handler` when `key` is pressed.
 * The listener is only active while `enabled` is true (default: true).
 */
export function useKeydown(
  key: string,
  handler: () => void,
  enabled = true,
) {
  useEffect(() => {
    if (!enabled) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === key) handler();
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [key, handler, enabled]);
}
