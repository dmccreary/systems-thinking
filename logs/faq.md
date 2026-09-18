# Session Log: FAQ Generation

**Date:** 2026-09-18
**Project:** Systems Thinking in the Age of AI (`/Users/dan/Documents/ws/systems-thinking`)
**Goal:** Run the `faq-generator` skill to produce a comprehensive, categorized FAQ from the book's course descriptions, Learning Graph, Glossary, and 27 chapters, plus a chatbot-ready JSON export and quality reports.

**Final state:** 97 questions across 6 categories in `docs/faq.md`, chatbot training JSON with 97 entries, quality report (70/100 overall), coverage-gaps report, `mkdocs.yml` nav updated, `mkdocs build` verified clean (no new warnings).

---

## 1. Content Completeness Assessment

Before generating, checked the four required inputs per the skill:

- **Course description** — this book uses `docs/course-descriptions/` (7 audience-specific pages: Junior High, High School, College, Graduate School, Conference Workshop, Executive Overview, Government Agency) instead of a single `docs/course-description.md`. Each has prerequisites and Bloom's-aligned learning outcomes.
- **Learning graph** — `docs/learning-graph/learning-graph.csv`, 528 concepts, previously validated as a DAG with 0 cycles.
- **Glossary** — `docs/glossary.md`, 528 terms (one per Learning Graph concept), well above the 100+ "excellent" threshold.
- **Chapters** — 27 chapters, 98,836 words total, far above the 10,000-word target. Every chapter's frontmatter includes a "Concepts Covered" table with a numeric "Concept Impact Score" per concept, which was used throughout as a centrality proxy for prioritizing which concepts deserved a dedicated FAQ question.

Computed completeness score: 100/100. No reduced-content disclaimer was needed, and no `AskUserQuestion` dialog was triggered.

## 2. Question Planning

Extracted every chapter's concept table into one ranked list (528 rows) sorted by impact score to identify which concepts were most central (e.g., **System** 367106, **Subsystem** 182466, **Interconnection** 121497, **Causal Loop Diagram** 60505). Planned 84 initial questions across the skill's 6 standard categories, targeting the middle of each category's recommended question-count range, then wrote all 84 directly into `docs/faq.md` in one pass, followed by iterative expansion (see below) to 97.

## 3. Answer Quality Iteration

The first draft's answers were too short: a validation script (word count, example detection, link extraction, anchor detection) found an average of ~107 words per answer with 20 answers under the 100-word minimum, and only 18% of answers contained an explicit `**Example:**` paragraph against a 40% target. Rather than pad answers with filler, each short answer was individually edited with a concrete, accurate example or clarifying detail drawn from the actual chapter content, which simultaneously fixed both the length and example-rate gaps. Final: 0 answers under 100 or over 300 words, 45% with an explicit example, 100% with at least one internal link, 0 anchor links, 0 broken links, 0 duplicate questions.

**Design decision:** the skill's "no anchor links" rule was treated as a hard constraint throughout — every one of the 61 unique internal link targets was verified to exist on disk via a script rather than assumed correct.

## 4. Concept Coverage — the main quality trade-off

Initial full-text coverage check (528 Learning Graph concept labels searched against the whole FAQ, not just a per-question tag limit) came back at 31.2% with 82 questions. Rather than mechanically add dozens of low-value questions to chase a coverage number, the approach taken was:

1. Added ~15 more questions specifically targeting the *highest-impact still-uncovered* concepts (e.g., **Interconnection** — the 3rd-highest-impact concept in the entire book, impact 121497, was missing entirely from the first draft; **Structure Drives Behavior**, **Unintended Consequence**, **Control System**, **Self-Organization**, **Negative Externality**, **Complicated Vs Complex**).
2. Made several small in-place edits to existing answers to use a concept's *exact* Learning Graph label rather than a paraphrase (e.g., "shallow fix" → "**symptomatic solution**"; "the iceberg's four levels" → explicitly naming **shallow/structural/deep/transformative leverage point**), which is a legitimate accuracy improvement, not gaming.
3. Deliberately stopped there rather than continuing to chase the skill's "60% coverage" success criterion. Reasoning, documented in the quality report: this book's Learning Graph is unusually fine-grained (528 concepts) — 69 of them are individually-named case-study instances inside archetype chapters (e.g., "Bacteria Growth," "Moore's Law," "Steam Engines" as instances of Limits to Growth) that the FAQ intentionally covers via the parent archetype rather than one question each, and many of the rest are narrow CLD-notation or data-modeling sub-details. Reaching 60% literal coverage would require roughly doubling the question count with mostly low-value entries. Final coverage: 39.0% overall (206/528), 42.9% on non-case-study "core vocabulary" concepts, with coverage concentrated correctly on the highest-centrality material (67% coverage in the System Dynamics & Feedback and Systems Thinking Foundations taxonomy categories).

This is the one area where the finished FAQ falls short of the skill's stated success criteria, and it's called out explicitly and honestly in `faq-quality-report.md` rather than glossed over — along with a prioritized, actionable list of the specific remaining high-value gaps in `faq-coverage-gaps.md` for a future revision.

## 5. Bloom's Taxonomy Labeling

Initially tried an automatic classifier (regex on question-opening phrases like "What is..." → Remember, "How do I..." → Apply) but it produced a poor fit — 48% Remember, only 6% Apply — because many "What is X and why Y" compound questions are actually Understand- or Analyze-level despite starting with "What is." Replaced this with an explicit, hand-assigned mapping (one label per question, judged against what the answer actually demands cognitively, not just the opening words) stored in a small Python module and used to build the chatbot JSON. Final distribution: Remember 20.6%, Understand 36.1%, Apply 15.5%, Analyze 20.6%, Evaluate 5.2%, Create 2.1% — still under-weighted on Apply relative to the skill's target blend (25%), noted as a medium-priority recommendation in the quality report rather than force-fit with inaccurate labels.

## 6. Chatbot Training JSON

Built via a script (`build_faq_json.py`, kept in the session scratchpad, not committed) rather than hand-written, so the 97 entries stay mechanically consistent with `faq.md`: it parses the FAQ's `##`/`###` structure, computes `word_count` and `has_example` directly from the text, extracts `source_links` from markdown links, auto-tags `concepts` by matching Learning Graph concept labels (case-insensitive, with an "Archetype"/parenthetical suffix stripped) against each answer, extracts `keywords` from the question text with a stopword filter, and applies the hand-assigned `bloom_level` map plus a category-and-Bloom's-aware `difficulty` heuristic. Output: `docs/learning-graph/faq-chatbot-training.json`.

## 7. Navigation and Verification

Added `FAQ: faq.md` next to `Glossary` in `mkdocs.yml`, and `FAQ Quality Report` / `FAQ Coverage Gaps` under the existing `Learning Graph` nav section (next to `Glossary Quality Report`), following the project's existing nav-grouping convention. Verified with `mkdocs build --site-dir /tmp/mkdocs-faq-validate-build` (a one-off build to a throwaway directory, not `mkdocs serve` — per this project's standing instruction never to start/stop the user's own `serve` process) that the build completes cleanly with zero new warnings attributable to the FAQ or the nav changes; all pre-existing warnings in the build output belong to unrelated, already-broken links elsewhere in the site.

## Outcome

- `docs/faq.md` — 97 questions, 6 categories, ~12,800 words
- `docs/learning-graph/faq-chatbot-training.json` — 97 structured entries
- `docs/learning-graph/faq-quality-report.md` — overall score 70/100 (Coverage 10/30, Bloom's 15/25, Answer Quality 25/25, Organization 20/20)
- `docs/learning-graph/faq-coverage-gaps.md` — prioritized list of remaining high/medium-value gaps
- `mkdocs.yml` — nav updated, build verified clean
