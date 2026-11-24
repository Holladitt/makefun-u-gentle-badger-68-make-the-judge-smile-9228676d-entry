// Make the Judge Smile — v1
// One line about a small good thing today. Deterministic, Node stdlib only.
// Candidates were scored against the judge criteria in order:
// [on-subject, warmth, surprise, concrete, fresh language]. Highest total wins.

import { mkdirSync, writeFileSync } from "node:fs";

type Candidate = { text: string; scores: [number, number, number, number, number] };

const candidates: Candidate[] = [
  {
    text: "My neighbour's cat stole my slipper at 7 a.m. and returned it by noon, placed neatly beside a dead leaf, like an apology.",
    scores: [5, 4, 4, 5, 4],
  },
  {
    text: "I found the umbrella I lost in March hanging on the café door today, with a note: 'Yours? It kept me dry twice.'",
    scores: [5, 4, 5, 5, 4],
  },
  {
    text: "At 6:12 the elevator stuck, and instead of panicking, all four of us sang the hold music until the doors opened.",
    scores: [5, 3, 4, 5, 4],
  },
  {
    text: "The street vendor remembered I take no sugar, then slipped an extra mango into my bag and winked like we'd planned a heist.",
    scores: [5, 5, 5, 5, 5],
  },
  {
    text: "My dad texted 'call me' and when I did, he just wanted to tell me the tomatoes finally turned red.",
    scores: [5, 5, 4, 4, 4],
  },
];

function total(c: Candidate): number {
  return c.scores.reduce((a, b) => a + b, 0);
}

// Deterministic pick: highest total wins, first candidate wins any tie.
let best = candidates[0];
for (const c of candidates.slice(1)) {
  if (total(c) > total(best)) best = c;
}

const line = best.text;
if (line.length < 1 || line.length > 200 || line.trim().length === 0) {
  throw new Error("chosen line out of bounds (must be 1-200 characters)");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", line + "\n", "utf8");
