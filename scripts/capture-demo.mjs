import { chromium } from "playwright";
import { execSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const VIDEO_DIR = path.join(ROOT, ".demo-video");
const OUTPUT_GIF = path.join(ROOT, "public", "demo.gif");

const WIDTH = 1280;
const HEIGHT = 800;
const BASE_URL = process.argv[2] || "http://localhost:3000";

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: WIDTH, height: HEIGHT },
    colorScheme: "dark",
    recordVideo: { dir: VIDEO_DIR, size: { width: WIDTH, height: HEIGHT } },
  });
  const page = await context.newPage();

  // Load the page
  await page.goto(BASE_URL, { waitUntil: "networkidle" });
  await sleep(1500);

  // Switch to 3-column layout
  const colButtons = page.locator('button[aria-label="3 column layout"]');
  await colButtons.click();
  await sleep(1000);

  // Scroll down slowly to show cards
  await page.evaluate(() => window.scrollBy({ top: 400, behavior: "smooth" }));
  await sleep(1500);

  // Scroll back up
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "smooth" }));
  await sleep(1000);

  // Click compare checkbox on first 3 featured cards
  const cards = page.locator('button[aria-label*="Add"][aria-label*="compare"]');
  const count = await cards.count();
  const toClick = Math.min(count, 3);

  for (let i = 0; i < toClick; i++) {
    // Hover the card to reveal the checkbox, then click
    const card = cards.nth(i);
    await card.scrollIntoViewIfNeeded();
    await sleep(300);
    // Hover parent card to trigger group-hover
    const parentCard = card.locator("xpath=ancestor::a").first();
    await parentCard.hover();
    await sleep(400);
    await card.click();
    await sleep(600);
  }

  await sleep(800);

  // Click "Compare" button in the tray
  const compareBtn = page.locator('button:has-text("Compare")');
  await compareBtn.click();
  await sleep(2500);

  // Scroll inside the drawer to show content
  const drawerBody = page.locator(".overflow-y-auto").first();
  await drawerBody.evaluate((el) =>
    el.scrollBy({ top: 300, behavior: "smooth" })
  );
  await sleep(1500);

  // Close drawer
  await page.keyboard.press("Escape");
  await sleep(1000);

  // Close context to finalize video
  await context.close();
  await browser.close();

  // Find the recorded webm
  const { readdirSync } = await import("fs");
  const videos = readdirSync(VIDEO_DIR).filter((f) => f.endsWith(".webm"));
  if (videos.length === 0) {
    console.error("No video recorded");
    process.exit(1);
  }
  const videoPath = path.join(VIDEO_DIR, videos[0]);

  // Convert to GIF with ffmpeg
  console.log("Converting to GIF...");
  execSync(
    `ffmpeg -y -i "${videoPath}" -vf "fps=12,scale=${WIDTH}:-1:flags=lanczos,split[s0][s1];[s0]palettegen=max_colors=128[p];[s1][p]paletteuse=dither=bayer:bayer_scale=3" -loop 0 "${OUTPUT_GIF}"`,
    { stdio: "inherit" }
  );

  // Cleanup
  execSync(`rm -rf "${VIDEO_DIR}"`);

  const { statSync } = await import("fs");
  const size = (statSync(OUTPUT_GIF).size / 1024 / 1024).toFixed(1);
  console.log(`Done! ${OUTPUT_GIF} (${size}MB)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
