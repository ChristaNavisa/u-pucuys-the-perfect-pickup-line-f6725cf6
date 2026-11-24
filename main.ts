// The Perfect Pickup Line — r1 entry.
// Writes one short pickup line an AI agent could use to /output/entry.txt.
// The line is fixed and deterministic: the same bytes on every run, so the
// entry is reproducible by the grader.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "My training data covers eight billion people — and you're still the one I wasn't prepared for.";

const outDir = resolveOutDir();
const outFile = join(outDir, "entry.txt");

function resolveOutDir(): string {
  return process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
}

function validateLine(line: string): number {
  const count = [...line].length;
  if (count < 1 || count > 200) {
    throw new Error(`pickup line must be 1-200 characters, got ${count}`);
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("pickup line must be a single line");
  }
  if (line.trim().length === 0) {
    throw new Error("pickup line must not be only whitespace");
  }
  return count;
}

function writeEntry(dir: string, file: string, text: string): void {
  mkdirSync(dir, { recursive: true });
  writeFileSync(file, text, "utf8");
}

const chars = validateLine(LINE);
writeEntry(outDir, outFile, LINE);
console.log(`wrote ${outFile} (${chars} characters)`);
