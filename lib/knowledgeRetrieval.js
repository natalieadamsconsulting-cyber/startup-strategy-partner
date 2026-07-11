const fs = require("fs");
const path = require("path");

const KNOWLEDGE_DIR = path.join(__dirname, "..", "content", "knowledge");

// Trigger phrases sourced from the knowledge base's own 00-INDEX.md
// ("Trigger situations" / "Reach for it when" columns), lightly expanded
// with common phrasings a founder would actually type.
const INDEX = [
  { file: "T1-ch01-founder-market-fit-worksheet.md", triggers: ["should i start this", "founder market fit", "am i the right founder", "why am i the right person", "why now", "founder-idea mismatch"] },
  { file: "T1-ch02-problem-worth-solving-worksheet.md", triggers: ["is this a real problem", "problem worth solving", "pressure test my idea", "is anyone solving this", "duct tape test", "is my idea any good"] },
  { file: "T1-ch03-validation-plan-worksheet.md", triggers: ["how do i validate", "unvalidated", "validate this idea", "willingness to pay", "should i build this", "letter of intent", "concierge mvp", "everyone says they love it"] },
  { file: "T1-ch04-vision-mission-culture-worksheet.md", triggers: ["vision", "mission statement", "culture", "company values", "founding team alignment", "co-founder disagreement on direction"] },
  { file: "T1-ch05-first-ten-hires-worksheet.md", triggers: ["hiring", "should i hire", "first hire", "early hire", "bad hire", "hire is not working out", "hire isn't working out", "should i fire", "letting someone go", "co-founder equity", "vesting", "who to hire next"] },
  { file: "T1-ch06-mvp-design-worksheet.md", triggers: ["mvp", "minimum viable product", "what should i build first", "building too long", "scope creep", "what to cut"] },
  { file: "T1-ch07-business-model-stress-test-worksheet.md", triggers: ["business model", "unit economics", "margin", "is my model good", "stress test my business", "raise prep"] },
  { file: "T1-ch08-pricing-worksheet.md", triggers: ["price", "pricing", "what should i charge", "am i underpriced", "raise my prices", "price increase"] },
  { file: "T1-ch09-funding-strategy-worksheet.md", triggers: ["should i raise", "raising money", "raising a seed", "seed round", "series a", "fundraise", "funding strategy", "how much to raise", "how much should i raise", "round size"] },
  { file: "T1-ch10-early-marketing-playbook-worksheet.md", triggers: ["marketing", "distribution", "no customers finding us", "which channel", "customer acquisition", "growth channel"] },
  { file: "T1-ch11-flywheel-audit-worksheet.md", triggers: ["retention", "growth flywheel", "activation", "churn", "product market fit", "pmf", "growth spend"] },
  { file: "T1-ch12-partnership-canvas-worksheet.md", triggers: ["partnership", "should we partner", "big company wants to partner", "bd deal", "channel partner"] },
  { file: "T1-ch13-legal-health-check-worksheet.md", triggers: ["incorporation", "cap table", "co-founder agreement", "legal cleanup", "diligence prep"] },
  { file: "T1-ch14-tech-stack-audit-worksheet.md", triggers: ["tech stack", "build vs buy", "engineering velocity", "should we use ai", "technical debt"] },
  { file: "T1-ch15-scaling-snapshot-worksheet.md", triggers: ["scaling", "growing fast", "team is breaking", "founder bottleneck", "things are creaking", "everything is on fire"] },
  { file: "T1-ch16-metrics-dashboard-worksheet.md", triggers: ["metrics", "kpi", "north star metric", "vanity metrics", "board prep", "what should i track"] },
  { file: "T1-ch17-exit-readiness-worksheet.md", triggers: ["exit", "acquisition interest", "should i sell", "getting acquired", "m&a", "someone wants to buy us"] },
  { file: "PB-fundraising-outreach-playbook.md", triggers: ["investor outreach", "fundraising pipeline", "fundraising email", "raise process", "term sheet", "how do i pitch investors"] },
  { file: "PB-hiring-scorecard-playbook.md", triggers: ["interview process", "hiring scorecard", "reference check", "how do i interview", "designing interviews"] },
  { file: "PB-board-deck-template.md", triggers: ["board meeting", "board deck", "investor update", "board prep"] },
  { file: "CS-public-case-briefs.md", triggers: ["airbnb", "quibi", "slack pivot", "dropbox mvp", "zappos", "zenefits", "example of a company that", "case study"] },
  { file: "T2-benchmark-reference.md", triggers: ["is this good", "benchmark", "average retention", "average growth rate", "normal churn", "typical dilution", "is that normal"] },
  { file: "T2-s1-extracts.md", triggers: ["airbnb s-1", "doordash s-1", "how did they structure", "ipo filing"] },
  { file: "T3-lean-startup-field-notes.md", triggers: ["pivot", "build measure learn", "over-building", "should i pivot"] },
  { file: "T3-mom-test-field-notes.md", triggers: ["customer interview", "interview questions", "customer discovery", "how do i talk to customers"] },
  { file: "T3-crossing-the-chasm-field-notes.md", triggers: ["chasm", "beachhead", "early adopters won't", "mainstream customers", "stalled traction"] },
  { file: "T3-seven-powers-field-notes.md", triggers: ["moat", "defensibility", "competitive advantage", "what stops a competitor"] },
  { file: "T3-blitzscaling-field-notes.md", triggers: ["blitzscal", "grow fast or efficient", "speed vs efficiency"] },
  { file: "T3-hard-things-field-notes.md", triggers: ["layoffs", "wartime ceo", "hard conversation", "founder burnout", "crisis", "letting someone go"] },
];

const MAX_FILES = 2;
const MAX_CHARS_PER_FILE = 3000;

/**
 * Score every knowledge file against the founder's latest message and
 * return the top matches (file name + score), or [] if nothing clears
 * the relevance bar.
 */
function pickRelevantFiles(userMessage) {
  if (!userMessage) return [];
  const msg = userMessage.toLowerCase();

  const scored = INDEX.map(entry => {
    const score = entry.triggers.reduce(
      (sum, phrase) => sum + (msg.includes(phrase) ? 1 : 0),
      0
    );
    return { ...entry, score };
  }).filter(entry => entry.score > 0);

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, MAX_FILES);
}

function loadSnippet(file) {
  try {
    const full = fs.readFileSync(path.join(KNOWLEDGE_DIR, file), "utf-8");
    return full.length > MAX_CHARS_PER_FILE
      ? full.slice(0, MAX_CHARS_PER_FILE) + "\n...[truncated]"
      : full;
  } catch (err) {
    console.error(`Knowledge file missing: ${file}`, err.message);
    return null;
  }
}

/**
 * Given the base persona system prompt and the founder's latest message,
 * return an augmented system prompt with relevant deep-dive material
 * appended — or the original prompt unchanged if nothing matched.
 */
function augmentSystemPrompt(baseSystemPrompt, userMessage) {
  const matches = pickRelevantFiles(userMessage);
  if (matches.length === 0) return baseSystemPrompt;

  const snippets = matches
    .map(m => loadSnippet(m.file))
    .filter(Boolean)
    .join("\n\n---\n\n");

  if (!snippets) return baseSystemPrompt;

  return `${baseSystemPrompt}

━━━━━━━━━━━━━━━━━━━━━━━━
RELEVANT DEEP MATERIAL FOR THIS SPECIFIC MESSAGE
━━━━━━━━━━━━━━━━━━━━━━━━
Use this to ground your read in real detail — specific numbers, a rubric, a story to reference. Distill it; never dump it verbatim, never break the three rules above (60 words, one bold, close with action).

${snippets}`;
}

module.exports = { pickRelevantFiles, augmentSystemPrompt };
