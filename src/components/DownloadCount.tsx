"use client";

import { useState, useEffect } from "react";

export function CLIDownloadCount() {
  const [total, setTotal] = useState<number | null>(null);

  useEffect(() => {
    // Read the persisted ledger instead of the live GitHub API: the ledger
    // accumulates counts from removed releases (see scripts/update-download-stats.mjs),
    // so the total never drops when old releases are pruned.
    fetch("/download-stats.json", { cache: "no-cache" })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data: { total: number }) => {
        if (typeof data.total === "number") setTotal(data.total);
      })
      .catch(() => {});
  }, []);

  if (total === null) return null;

  return (
    <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
      Downloads: {total.toLocaleString()}
    </div>
  );
}

export function VSCodeDownloadCount() {
  const [installs, setInstalls] = useState<number | null>(null);

  useEffect(() => {
    fetch(
      "https://marketplace.visualstudio.com/_apis/public/gallery/extensionquery",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json;api-version=6.0-preview.1",
        },
        body: JSON.stringify({
          filters: [
            {
              criteria: [
                { filterType: 7, value: "superinference.ami-vscode" },
              ],
            },
          ],
          flags: 914,
        }),
      },
    )
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => {
        const ext = data?.results?.[0]?.extensions?.[0];
        const stat = ext?.statistics?.find(
          (s: { statisticName: string; value: number }) =>
            s.statisticName === "install",
        );
        if (stat) setInstalls(Math.round(stat.value));
      })
      .catch(() => {});
  }, []);

  if (installs === null) return null;

  return (
    <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
      Downloads: {installs.toLocaleString()}
    </div>
  );
}
