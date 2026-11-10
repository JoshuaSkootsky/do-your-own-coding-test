import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

type Challenge = {
  letter: string;
  title: string;
  dir: string;
  stub: string;
  test: string;
};

const cwd = process.cwd();

function titleFor(dir: string): string {
  const heading = readFileSync(join(dir, "README.md"), "utf8")
    .split("\n")
    .find((line) => line.startsWith("# "))
    ?.replace(/^#\s+/, "")
    .trim();

  if (!heading) return dir;
  return heading.replace(/^Question\s+\S+\s+[—–-]\s+/, "");
}

function findChallenges(): Challenge[] {
  return readdirSync(cwd, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && /^question-[a-z]/.test(entry.name))
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((entry) => {
      const files = readdirSync(join(cwd, entry.name)).filter((file) =>
        file.endsWith(".ts"),
      );
      const test = files.find((file) => file.endsWith(".test.ts")) ?? "";
      const stub =
        files.find(
          (file) => !file.endsWith(".test.ts") && !file.endsWith(".d.ts"),
        ) ?? "";

      return {
        letter: /^question-([a-z])/.exec(entry.name)?.[1]?.toUpperCase() ?? "?",
        title: titleFor(join(cwd, entry.name)),
        dir: entry.name,
        stub,
        test,
      };
    });
}

const challenges = findChallenges();
const lines: string[] = [
  "Do Your Own Coding Test — repo guide",
  "",
  "Three interview-style TypeScript challenges. Each stub throws until you",
  "implement it, so the test suite is red until you are done.",
  "",
  "The challenges",
  "--------------",
];

for (const challenge of challenges) {
  lines.push(
    "",
    `  ${challenge.letter}  ${challenge.title}`,
    `     read:   ${join(challenge.dir, "README.md")}`,
    `     solve:  ${join(challenge.dir, challenge.stub)}`,
    `     test:   ${join(challenge.dir, challenge.test)}`,
  );
}

lines.push(
  "",
  "Typical loop",
  "------------",
  "  1. Read the challenge README.",
  "  2. Implement the stub.",
  "  3. bun run test        # fail-fast: stops at the first failure",
  "  4. bun run test:ci     # full suite, no early exit",
  "  5. bun run typecheck   # tsc --noEmit",
  "",
  "Reference solutions live in solutions/ — try the challenge first.",
  "",
  "Note: `bun test` is Bun's built-in runner and ignores the `test` script.",
  "      Use `bun run test` or `bun run test:ci`.",
);

console.log(lines.join("\n"));
