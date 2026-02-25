/**
 * Generate preview JSON files for all catalog entries that don't have one yet.
 * Uses heuristics based on category and API name to create reasonable sample data.
 *
 * Usage: node scripts/generate-previews.cjs
 */

const fs = require("fs");
const path = require("path");

const catalogPath = path.join(__dirname, "..", "data", "catalog.json");
const previewDir = path.join(__dirname, "..", "data", "previews");

const catalog = JSON.parse(fs.readFileSync(catalogPath, "utf-8"));
const existing = new Set(
  fs.readdirSync(previewDir).filter((f) => f.endsWith(".json")).map((f) => f.replace(".json", ""))
);

function slugify(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/, "");
}

// Truncate description to a reasonable subtitle length
function truncate(str, max = 60) {
  if (!str || str.length <= max) return str;
  return str.slice(0, max).replace(/\s+\S*$/, "") + "…";
}

function generatePreview(entry) {
  const slug = slugify(entry.API);
  const name = entry.API;
  const desc = entry.Description || "";
  const cat = entry.Category;
  const auth = entry.Auth || "None";

  // Default: card preview with API info
  const preview = {
    id: slug,
    previewType: "card",
    sampleResponse: {
      api: name,
      description: desc,
      category: cat,
      auth: auth === "" ? "None" : auth,
      https: entry.HTTPS,
      cors: entry.Cors,
    },
    previewConfig: {
      title: name,
      subtitle: truncate(desc),
      displayFields: ["description", "category", "auth"],
    },
  };

  return preview;
}

// Generate missing previews
let created = 0;
for (const entry of catalog.entries) {
  const slug = slugify(entry.API);
  if (existing.has(slug)) continue;

  const preview = generatePreview(entry);
  const filePath = path.join(previewDir, `${slug}.json`);
  fs.writeFileSync(filePath, JSON.stringify(preview, null, 2) + "\n");
  created++;
}

console.log(`Created ${created} preview files. Total: ${existing.size + created}`);
