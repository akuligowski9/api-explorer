import fs from "fs";
import path from "path";
import catalogRaw from "@/data/catalog.json";
import type { ApiEntry, CatalogData, PreviewData } from "./types";
import { slugify } from "./slugify";

const catalog = catalogRaw as CatalogData;

/**
 * Dynamically load all preview JSON files from data/previews/ at build time.
 * No more manual imports needed — just drop a .json file in the directory.
 */
function loadAllPreviews(): Map<string, PreviewData> {
  const previewDir = path.join(process.cwd(), "data", "previews");
  const map = new Map<string, PreviewData>();

  const files = fs.readdirSync(previewDir).filter((f) => f.endsWith(".json"));
  for (const file of files) {
    const raw = fs.readFileSync(path.join(previewDir, file), "utf-8");
    const data = JSON.parse(raw) as PreviewData;
    map.set(data.id, data);
  }

  return map;
}

const previewMap = loadAllPreviews();

function buildEntries(): ApiEntry[] {
  return catalog.entries.map((entry) => {
    const slug = slugify(entry.API);
    const preview = previewMap.get(slug);
    return { ...entry, slug, preview };
  });
}

let cachedEntries: ApiEntry[] | null = null;

export function getAllApis(): ApiEntry[] {
  if (!cachedEntries) {
    cachedEntries = buildEntries();
  }
  return cachedEntries;
}

export function getFeaturedApis(): ApiEntry[] {
  return getAllApis().filter((api) => api.preview !== undefined);
}

export function getApiBySlug(slug: string): ApiEntry | undefined {
  return getAllApis().find((api) => api.slug === slug);
}

export function getApisByCategory(category: string): ApiEntry[] {
  return getAllApis().filter((api) => api.Category === category);
}

export function getAllSlugs(): string[] {
  return getAllApis().map((api) => api.slug);
}

export function getSimilarApis(api: ApiEntry, limit = 6): ApiEntry[] {
  return getAllApis()
    .filter((a) => a.Category === api.Category && a.slug !== api.slug)
    .slice(0, limit);
}
