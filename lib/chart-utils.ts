export interface DataPoint {
  label: string;
  value: number;
}

/**
 * Find the first array value within a record, then map its items into
 * { label, value } pairs using the configured keys.
 */
export function extractDataPoints(
  sampleResponse: Record<string, unknown>,
  labelKey: string,
  dataKey: string,
): DataPoint[] {
  for (const val of Object.values(sampleResponse)) {
    if (Array.isArray(val) && val.length > 0) {
      return val.map((item: Record<string, unknown>) => ({
        label: String(item[labelKey] ?? ""),
        value: Number(item[dataKey] ?? 0),
      }));
    }
  }
  return [];
}

/**
 * Build an SVG path string for a smooth line using quadratic bezier curves.
 */
export function buildSmoothPath(
  points: Array<{ x: number; y: number }>,
): string {
  if (points.length === 0) return "";
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;

  let d = `M ${points[0].x} ${points[0].y}`;

  for (let i = 0; i < points.length - 1; i++) {
    const current = points[i];
    const next = points[i + 1];
    const midX = (current.x + next.x) / 2;
    const midY = (current.y + next.y) / 2;

    if (i === 0) {
      d += ` Q ${current.x} ${current.y} ${midX} ${midY}`;
    } else {
      d += ` Q ${current.x} ${current.y} ${midX} ${midY}`;
    }
  }

  const last = points[points.length - 1];
  const secondLast = points[points.length - 2];
  d += ` Q ${secondLast.x + (last.x - secondLast.x) / 2} ${last.y} ${last.x} ${last.y}`;

  return d;
}

/**
 * Build the area fill path (line path + close at bottom).
 */
export function buildAreaPath(
  points: Array<{ x: number; y: number }>,
  chartHeight: number,
): string {
  if (points.length < 2) return "";
  const linePath = buildSmoothPath(points);
  const lastPoint = points[points.length - 1];
  const firstPoint = points[0];
  return `${linePath} L ${lastPoint.x} ${chartHeight} L ${firstPoint.x} ${chartHeight} Z`;
}

/**
 * Format a chart value for display (compact notation).
 */
export function formatChartValue(v: number): string {
  if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(1)}M`;
  if (v >= 1_000) return `${(v / 1_000).toFixed(1)}K`;
  if (v < 1 && v > 0) return v.toFixed(3);
  return v.toFixed(1);
}
