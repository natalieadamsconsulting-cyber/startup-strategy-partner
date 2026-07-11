# Tech Stack Self-Audit (expanded)

**Source:** The Founder's Field Manual, Chapter 14 — Technology as Force Multiplier
**Agent use:** When a subscriber debates build vs. buy, complains about engineering velocity, or asks about AI adoption. Twenty minutes; the goal is naming which decisions are working and which are quietly accumulating drag. Technology choices should be a framework, not a default.

## Step 1 — Build vs. buy audit
List the three biggest engineering investments of the last six months. For each: Was this a core differentiator? Was there a scalable vendor? What is the switching cost? Mark each **correctly built / correctly bought / revisit**.

*Decision rule the agent can apply:* build only what customers pay you specifically to be better at; buy everything that is undifferentiated heavy lifting (auth, billing, analytics, infra). The common early error is building commodity plumbing for "control" while the differentiating feature waits.

## Step 2 — Architecture stage check
What stage is the *team* actually at — 1, 2, or 3? What stage is the *architecture* at? If they don't match, which direction is the mismatch, and what is the next move?

*Both directions cost:* architecture ahead of team = microservices for a product with no users — velocity dies in orchestration. Architecture behind team = twelve engineers in one fragile monolith with no test coverage — velocity dies in merge conflicts and fear. The fix is the *next increment*, not a rewrite.

## Step 3 — Technical debt ledger
Top five pieces of debt. For each: was it *knowingly* taken on, with an interest rate (what it slows down) and a pay-down date? Mark anything that wasn't. **That is your real ledger** — unknowing debt is the dangerous kind.

*Agent reframe:* debt is a legitimate financing instrument for speed; the sin isn't borrowing, it's borrowing without recording the loan. Watch for the chapter's "chasing shiny objects" failure — adopting a new framework or vendor mid-flight adds debt while feeling like paying it down. And what carried the company to this stage sometimes cannot carry the next one; naming that early is cheaper than discovering it during an outage.

## Step 4 — AI immersion check
Are you using AI in your own daily workflow, ten times a day or more? Have you built or set up at least one agent for a recurring company task?

*Agent push:* founders who delegate AI adoption ("the team is exploring it") without personal immersion make poor build-vs-buy and product decisions about it. Immersion is a founder job, not a task to assign.

## Series A readiness
If fundraising is on the 12-month horizon, run the chapter's Series A security checklist now — security debt discovered in diligence costs valuation.

## Common failure patterns
1. **Rewrite romance** — proposing the big rewrite instead of incremental strangling; most rewrites ship late and lose features.
2. **Résumé-driven architecture** — tech chosen for the team's next job, not the company's next stage.
3. **Vendor sprawl** — 40 SaaS tools, three doing the same job, no owner.
4. **Debt denial** — "we'll clean it up after the next release" as a permanent state of affairs.

## Output the agent should produce
The three-investment audit table, the stage mismatch call with the next increment, the honest debt ledger (known vs. unknowing), AI immersion score with one committed agent-automation project, and the security-checklist trigger if a raise is near.
