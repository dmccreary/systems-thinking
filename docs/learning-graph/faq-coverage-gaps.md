# FAQ Coverage Gaps

Generated: 2026-09-18

This report lists Learning Graph concepts not detected in [faq.md](../faq.md) by a strict phrase-match check (see the [FAQ Quality Report](faq-quality-report.md) for methodology and why the headline coverage number understates real coverage). Concepts are grouped by a rough centrality measure — the "Concept Impact Score" shown in each chapter's concept table — as a proxy for priority: a concept a chapter's own table scores highly is one many other concepts depend on or connect to.

**Summary:** 528 total concepts · 206 covered (39.0%) · 322 uncovered · 6 high-priority, 50 medium-priority, 266 low-priority.

## A note on measurement

One concept below is flagged uncovered only because of exact-phrase wording, not because the topic is actually missing from the FAQ:

- **Success To Successful Archetype** — covered by two dedicated questions in Common Challenge Questions ("Why is 'success to the successful' so hard to reverse once it starts?" and the compounding-advantage question in Advanced Topics), but the FAQ correctly writes the archetype's full name, "success to **the** successful," which doesn't exact-match the Learning Graph's shortened label. Treat this one as effectively covered.

## Critical Gaps (High Priority)

Concepts with an impact score ≥ 20 — the small set of highest-centrality concepts still without dedicated coverage.

1. **Loop Marker** (impact 3402, Chapter 3)
   - Category: Technical Detail Questions
   - Suggested Question: "What is a loop marker, and how does it label a reinforcing or balancing loop on a diagram?"

2. **Balancing Loop Label** (impact 410, Chapter 3)
   - Category: Technical Detail Questions
   - Suggested Question: "How is a balancing loop labeled on a causal loop diagram, and how does that differ from a reinforcing loop label?"

3. **Linear Relationship** (impact 201, Chapter 6)
   - Category: Core Concepts
   - Suggested Question: "What is a linear relationship, and how is it different from the linear growth pattern a stock follows over time?"
   - Note: closely related to the already-answered "What is the difference between linear growth and exponential growth?" — could be folded into that answer instead of a new question.

4. **Success To Successful Archetype** (impact 58, Chapter 11) — see measurement note above; treat as effectively covered.

5. **Network Topology** (impact 46, Chapters 12/19)
   - Category: Advanced Topics
   - Suggested Question: "What is network topology, and why does it shape how compounding advantage spreads through a platform?"

6. **Model Assumptions** (impact 20, Chapter 2)
   - Category: Best Practice Questions
   - Suggested Question: "What assumptions and limitations should I check before trusting a systems model?" (pairs naturally with **Model Limitations** and **Model Validation** below)

## Medium Priority Gaps

Concepts with an impact score between 5 and 19 (50 total). Grouped by chapter/theme for easier batch-writing in a future revision:

**Chapter 1–2 (Foundations & Mental Models) — 6 concepts:** System Theory, Model Limitations, Wicked Problem, Model Validation, Sensitivity Analysis, Scenario Testing, Root Cause Analysis.

**Chapter 3–4 (CLD Notation & Feedback) — 4 concepts:** Reinforcing Loop Label, Loop Dominance, Time Delay, System Delay.

**Chapter 6 (Growth & Nonlinear Behavior) — 3 concepts:** Nonlinear Feedback, Edge Of Chaos, Sharpness Of Transition.

**Chapter 7 (Resilience) — 1 concept:** System Pushback.

**Chapter 8 (Archetype Vocabulary) — 4 concepts:** Goal Erosion, Capability Erosion, Resource Allocation, Resource Concentration.

**Chapter 9–12 (Named Archetypes & Complexity) — 10 concepts:** Scaling Laws, Digital Commons, Proxy Metric, Cumulative Advantage, Open Standard, Adaptive Management, Measurement Trap, Algorithmic Bias, Learning Organization, Network Trust.

**Chapter 14 (Leverage Points) — 5 concepts:** Mindset Or Paradigm, Rules Of The System, Self-Organizing System Structure, Goals Of The System, High-Leverage Intervention.

**Chapter 17–18 (Metadata & Data Governance) — 7 concepts:** ISO Definition, Normalized Data Model, Denormalized Data Model, Data Quality, Entity Resolution, Master Data Management, Star Schema.

**Chapter 20–21 (Silos & CMM) — 3 concepts:** Organizational Structure, Maturity Level, Linear Maturity Level.

**Chapter 22 (AI Foundations) — 1 concept:** AI Alignment.

**Chapter 24 (Economic Complexity) — 3 concepts:** Law Of Value, Economic Complexity Index, Knowledge Embodiment.

**Chapter 25–26 (Systems Design & Graph Applications) — 2 concepts:** Human-Centered Design, Graph Analytics.

## Low Priority Gaps

266 concepts with an impact score below 5. The large majority fall into two groups that are lower priority by design, not oversight:

- **Named case-study instances** (the CASE taxonomy category, e.g., "Bacteria Growth," "Moore's Law," "Steam Engines," "Antibiotic Effectiveness") — the FAQ covers the *archetype* each instance illustrates (Limits to Growth, Fixes That Fail, etc.) rather than writing a separate question per named example, consistent with how the FAQ is meant to answer recurring reader questions rather than duplicate the archetype case-study pages themselves.
- **Fine-grained notation and schema sub-details** (e.g., individual link-direction labels, narrow data-modeling terms) that are naturally explained as part of a broader answer rather than as their own standalone question.

These can be addressed opportunistically in future FAQ revisions but are not recommended as a priority use of new-question budget.

## Recommendations

1. Add dedicated questions for the 5 unambiguous critical gaps (Loop Marker, Balancing Loop Label, Linear Relationship, Network Topology, Model Assumptions) — roughly 30 minutes of focused writing given the source material already exists in their respective chapters.
2. Batch-address the medium-priority Chapter 17–18 data-governance cluster (Normalized/Denormalized Data Model, Data Quality, Entity Resolution, Master Data Management, Star Schema, ISO Definition) as a single follow-up pass — these are conceptually related and would read well as 3–4 combined Technical Detail questions rather than 7 separate ones.
3. Re-run the [FAQ Quality Report](faq-quality-report.md)'s coverage check after any future chapter or Learning Graph update, since new concepts will not automatically appear in this FAQ.
4. Do not chase 100% coverage of the CASE and low-priority groups — see the Quality Report's discussion of why full coverage of a 528-concept graph is disproportionate for a curated FAQ.
