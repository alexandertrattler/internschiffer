#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const agenciesPath = path.join(rootDir, "agencies.json");
const outputDir = path.join(rootDir, "previews");

const args = new Map();
process.argv.slice(2).forEach((arg, index, allArgs) => {
  if (!arg.startsWith("--")) return;
  const [key, inlineValue] = arg.slice(2).split("=");
  args.set(key, inlineValue ?? allArgs[index + 1] ?? true);
});

const limit = Number(args.get("limit") || 0);
const onlyIds = String(args.get("ids") || "")
  .split(",")
  .map((id) => Number(id.trim()))
  .filter(Boolean);
const force = args.has("force");
const width = Number(args.get("width") || 1440);
const height = Number(args.get("height") || 1000);
const timeout = Number(args.get("timeout") || 18000);

const usage = `Usage:
  node scripts/capture-previews.mjs [--limit 5] [--ids 1,2,3] [--force]

Options:
  --limit N       Capture only the first N matching agencies.
  --ids 1,2,3    Capture only selected agency ids.
  --force         Overwrite existing screenshots.
  --width N       Viewport width. Default: 1440.
  --height N      Viewport height. Default: 1000.
  --timeout N     Page load timeout in ms. Default: 18000.
`;

if (args.has("help")) {
  console.log(usage);
  process.exit(0);
}

const loadPlaywright = async () => {
  try {
    return await import("playwright");
  } catch {
    console.error("Playwright is required to capture website previews.");
    console.error("Install it with: npm install -D playwright && npx playwright install chromium");
    process.exit(1);
  }
};

const normalizeText = (value) => String(value || "")
  .toLowerCase()
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .replaceAll("ß", "ss");

const slugify = (agency) => {
  const base = agency.domain && agency.domain !== "Missing"
    ? agency.domain
    : agency.name;
  return normalizeText(base)
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
};

const candidateUrl = (agency) => {
  const candidates = [agency.sourceUrl, agency.providedUrl, agency.domain];
  const value = candidates.find((item) => item && item !== "Missing" && item !== "");
  if (!value) return "";
  if (/^https?:\/\//i.test(value)) return value;
  if (/^[a-z0-9.-]+\.[a-z]{2,}/i.test(value)) return `https://${value}`;
  return "";
};

const main = async () => {
  const { chromium } = await loadPlaywright();
  const agencies = JSON.parse(await fs.readFile(agenciesPath, "utf8"));
  const selected = agencies
    .filter((agency) => onlyIds.length === 0 || onlyIds.includes(agency.id))
    .filter((agency) => candidateUrl(agency));
  const queue = limit > 0 ? selected.slice(0, limit) : selected;

  await fs.mkdir(outputDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width, height },
    deviceScaleFactor: 1
  });

  const manifest = [];

  for (const agency of queue) {
    const url = candidateUrl(agency);
    const filename = `${String(agency.id).padStart(3, "0")}-${slugify(agency)}.jpg`;
    const outputPath = path.join(outputDir, filename);
    const relativePath = path.relative(rootDir, outputPath);

    if (!force) {
      try {
        await fs.access(outputPath);
        console.log(`skip existing ${relativePath}`);
        manifest.push({ id: agency.id, name: agency.name, url, previewImage: relativePath, status: "skipped" });
        continue;
      } catch {
        // File does not exist yet.
      }
    }

    try {
      console.log(`capture ${agency.id}: ${agency.name} -> ${url}`);
      await page.goto(url, { waitUntil: "domcontentloaded", timeout });
      await page.waitForTimeout(1800);
      await page.screenshot({
        path: outputPath,
        type: "jpeg",
        quality: 76,
        fullPage: false
      });
      manifest.push({ id: agency.id, name: agency.name, url, previewImage: relativePath, status: "captured" });
    } catch (error) {
      console.warn(`failed ${agency.id}: ${agency.name} -> ${error.message}`);
      manifest.push({ id: agency.id, name: agency.name, url, previewImage: "", status: "failed", error: error.message });
    }
  }

  await browser.close();
  await fs.writeFile(
    path.join(outputDir, "preview-manifest.json"),
    `${JSON.stringify(manifest, null, 2)}\n`
  );

  const captured = manifest.filter((item) => item.status === "captured").length;
  const skipped = manifest.filter((item) => item.status === "skipped").length;
  const failed = manifest.filter((item) => item.status === "failed").length;
  console.log(`done: ${captured} captured, ${skipped} skipped, ${failed} failed`);
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
