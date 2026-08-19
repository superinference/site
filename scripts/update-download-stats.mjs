// Accumulates GitHub release download counts into a persisted ledger so the
// total survives deletion of old releases.
//
// GitHub's `download_count` lives on a release asset and is destroyed when the
// release (or asset) is deleted. To keep a durable cumulative total we snapshot
// the per-release / per-asset counts into public/download-stats.json and merge
// on every run:
//   - live release+asset  -> max(stored, live)   (download_count is monotonic)
//   - removed release      -> kept frozen at last-known value
// The published `total` is the sum over the whole ledger.
//
// Run by .github/workflows/download-stats.yml (scheduled) or locally:
//   node scripts/update-download-stats.mjs
// Set GITHUB_TOKEN to raise the API rate limit (optional).

import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const REPO = "superinference/releases";
const OUT_PATH = join(
  dirname(fileURLToPath(import.meta.url)),
  "..",
  "public",
  "download-stats.json",
);

async function fetchAllReleases() {
  const headers = { Accept: "application/vnd.github.v3+json" };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const releases = [];
  for (let page = 1; ; page++) {
    const url = `https://api.github.com/repos/${REPO}/releases?per_page=100&page=${page}`;
    const res = await fetch(url, { headers });
    if (!res.ok) {
      throw new Error(`GitHub API ${res.status}: ${await res.text()}`);
    }
    const batch = await res.json();
    releases.push(...batch);
    if (batch.length < 100) break;
  }
  return releases;
}

async function loadLedger() {
  try {
    const raw = await readFile(OUT_PATH, "utf8");
    const src = JSON.parse(raw)?.releases;
    if (!src || typeof src !== "object") return {};
    // Sanitize so the rest of the script can trust the shape: drop non-object
    // buckets and non-finite counts (a hand-edited/corrupt file must not crash).
    const ledger = {};
    for (const [tag, bucket] of Object.entries(src)) {
      if (!bucket || typeof bucket !== "object") continue;
      const clean = {};
      for (const [name, count] of Object.entries(bucket)) {
        const n = Number(count);
        if (Number.isFinite(n)) clean[name] = n;
      }
      ledger[tag] = clean;
    }
    return ledger;
  } catch {
    return {};
  }
}

function mergeLive(ledger, releases) {
  for (const rel of releases) {
    const tag = rel.tag_name;
    if (!tag) continue;
    const bucket = (ledger[tag] ??= {});
    for (const asset of rel.assets ?? []) {
      const live = Number(asset.download_count) || 0;
      // Monotonic: never let a re-published asset lower a stored count.
      bucket[asset.name] = Math.max(bucket[asset.name] ?? 0, live);
    }
  }
  return ledger;
}

function sumLedger(ledger) {
  let total = 0;
  for (const bucket of Object.values(ledger)) {
    for (const count of Object.values(bucket)) total += count;
  }
  return total;
}

async function main() {
  const ledger = await loadLedger();
  const before = sumLedger(ledger);

  const releases = await fetchAllReleases();
  mergeLive(ledger, releases);

  const total = sumLedger(ledger);

  // Sort keys for a stable, review-friendly diff.
  const sortedReleases = {};
  for (const tag of Object.keys(ledger).sort()) {
    const bucket = ledger[tag];
    const sortedBucket = {};
    for (const name of Object.keys(bucket).sort()) sortedBucket[name] = bucket[name];
    sortedReleases[tag] = sortedBucket;
  }

  const output = {
    total,
    generated_at: new Date().toISOString(),
    repo: REPO,
    releases: sortedReleases,
  };

  await writeFile(OUT_PATH, JSON.stringify(output, null, 2) + "\n");
  console.log(
    `download-stats: ${releases.length} live releases, total ${before} -> ${total}`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
