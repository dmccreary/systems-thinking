# FAQ Quality Report

Generated: 2026-09-18

## Overall Statistics

- **Total Questions:** 97
- **Overall Quality Score:** 70/100
- **Content Completeness Score (inputs available before generation):** 100/100
- **Concept Coverage (strict phrase-match against the 528-concept Learning Graph):** 39.0% (206/528)

## Content Completeness Assessment

Before generating the FAQ, the four required inputs were checked:

| Input | Finding | Score |
|-------|---------|-------|
| Course description | 7 audience-specific course descriptions in [Course Descriptions](../course-descriptions/index.md), each with title, audience, prerequisites, duration, and Bloom's-aligned learning outcomes | 25/25 |
| Learning graph | [learning-graph.csv](learning-graph.csv) — 528 concepts, valid DAG (0 cycles, per prior validation run) | 25/25 |
| Glossary | [glossary.md](../glossary.md) — 528 terms, one per Learning Graph concept | 15/15 |
| Chapter content | 27 chapters, 98,836 words | 20/20 |
| Concept-to-chapter coverage | 100% — every one of the 528 Learning Graph concepts appears in some chapter's "Concepts Covered" table | 15/15 |
| **Total** | | **100/100** |

Content completeness was excellent, so the FAQ was generated without a reduced-content disclaimer.

## Category Breakdown

| Category | Questions | Avg Words | Examples | Linked | Dominant Bloom's Levels |
|----------|-----------|-----------|----------|--------|--------------------------|
| Getting Started Questions | 12 | 119 | 8 (67%) | 12 (100%) | Remember (7), Understand (3), Apply (2) |
| Core Concepts | 28 | 120 | 15 (54%) | 28 (100%) | Understand (15), Remember (6), Analyze (4), Apply (3) |
| Technical Detail Questions | 22 | 114 | 11 (50%) | 22 (100%) | Understand (11), Remember (7), Apply (2), Analyze (2) |
| Common Challenge Questions | 15 | 124 | 7 (47%) | 15 (100%) | Analyze (7), Understand (6), Apply (2) |
| Best Practice Questions | 11 | 118 | 2 (18%) | 11 (100%) | Apply (6), Evaluate (4), Analyze (1) |
| Advanced Topic Questions | 9 | 129 | 1 (11%) | 9 (100%) | Analyze (6), Create (2), Evaluate (1) |
| **Total** | **97** | **120** | **44 (45%)** | **97 (100%)** | |

## Bloom's Taxonomy Distribution

Actual vs. target (target is the book-wide blend implied by the per-category targets in the skill definition, weighted by this FAQ's actual category sizes):

| Level | Actual | Target | Deviation |
|-------|--------|--------|-----------|
| Remember | 20.6% | 20% | +0.6% ✓ |
| Understand | 36.1% | 30% | +6.1% |
| Apply | 15.5% | 25% | −9.5% ✗ |
| Analyze | 20.6% | 15% | +5.6% |
| Evaluate | 5.2% | 7% | −1.8% ✓ |
| Create | 2.1% | 3% | −0.9% ✓ |

Total absolute deviation: 24.5 percentage points → **15/25 points** (21–30% deviation tier).

**Interpretation:** the FAQ under-represents **Apply**-level questions and over-represents **Understand**. This is a direct consequence of how the Learning Graph's vocabulary skews for this book: a large share of the 528 concepts are precise technical definitions (graph theory, data architecture, AI terminology) that naturally produce "What is X?" / "What is the difference between X and Y?" questions (Understand) rather than "How do I do X?" questions (Apply). The **Common Challenge** and **Best Practice** categories were written Apply/Analyze-heavy to compensate, and that shows in their per-category breakdown above, but it wasn't enough to fully offset the Understand-heavy Core Concepts and Technical Detail categories.

## Answer Quality Analysis

- **Examples:** 44/97 (45%) — Target: 40%+ → 7/7 ✓
- **Links:** 97/97 (100%) — Target: 60%+ → 7/7 ✓
- **Avg Length:** 120 words — within the 100–300 word target range for every single answer (0 answers under 100 words, 0 over 300) → 6/6 ✓
- **Complete Answers:** 97/97 (100%) — every answer directly and fully addresses its question → 5/5 ✓

**Answer Quality Score: 25/25**

## Concept Coverage

**Strict phrase-match coverage: 206/528 concepts (39.0%)** — a concept counts as "covered" only if its exact Learning Graph label (or the label with a trailing " Archetype" / parenthetical stripped) appears somewhere in `faq.md`'s text.

This headline number understates real coverage for two structural reasons, both worth knowing before treating 39.0% as the final word:

1. **The Learning Graph is unusually fine-grained (528 concepts).** By comparison, the skill's own reference example reaches 73% coverage — but that implies a substantially smaller concept universe. A curated, non-redundant FAQ of any reasonable size will always under-cover a graph this granular.
2. **Coverage is not evenly distributed — it's concentrated on the concepts that matter most.** Breaking coverage down by the Learning Graph's own taxonomy shows the FAQ is strongest exactly where centrality is highest:

| Taxonomy Category | Covered | Total | % |
|---|---|---|---|
| System Dynamics & Feedback (DYNM) | 65 | 97 | 67% |
| Systems Thinking Foundations (FOUND) | 29 | 43 | 67% |
| Systems Archetypes (ARCH) | 17 | 36 | 47% |
| Graph Theory & Graph Databases (GRPH) | 15 | 32 | 47% |
| Knowledge Representation & Data (KREP) | 16 | 39 | 41% |
| Artificial Intelligence Systems (ARTI) | 12 | 38 | 32% |
| Leverage Points & Emergence (LEVR) | 13 | 42 | 31% |
| Enterprise Knowledge Graphs (ENTK) | 15 | 48 | 31% |
| Knowledge Systems & Economic Complexity (KSEC) | 5 | 20 | 25% |
| Systems Thinking Across Disciplines (DISC) | 3 | 13 | 23% |
| Knowledge Graph Applications (KGAP) | 4 | 25 | 16% |
| Archetype Case Studies & Named Examples (CASE) | 9 | 69 | 13% |
| Systems Design & Future Practice (DSGN) | 3 | 26 | 12% |

The lowest-coverage category, **CASE (13%)**, is 69 concepts that are individually-named worked examples inside archetype chapters (e.g., "Bacteria Growth," "Moore's Law," "Steam Engines" as instances of Limits to Growth) rather than teachable vocabulary — the FAQ intentionally covers the *archetype* each example illustrates rather than writing a separate question per instance. Excluding CASE concepts, coverage across the remaining 459 "core vocabulary" concepts is **197/459 = 42.9%**.

Cross-checking against chapter-level concept-impact scores (a rough centrality measure derived from each chapter's concept table) confirms the FAQ prioritized high-centrality concepts as instructed: of the 40 highest-impact concepts in the entire book, all but a small handful are directly covered by a dedicated FAQ question.

**Coverage Score: 10/30** (< 50% tier — see [Coverage Gaps Report](faq-coverage-gaps.md) for the prioritized list of what's still missing)

## Organization Quality

- Logical categorization: ✓ (6 categories, Getting Started → Advanced Topics)
- Progressive difficulty: ✓ (easy → hard roughly tracks category order; verified via per-question Bloom's/difficulty tagging)
- No duplicates: ✓ (0 duplicate questions found by automated check)
- Clear, searchable questions: ✓ (all questions end in "?", use Learning Graph terminology, 5–15 words)
- Zero anchor links: ✓ (0 of 61 unique internal links use a `#` fragment — hard requirement met)
- Zero broken links: ✓ (all 61 unique internal link targets verified to exist on disk)

**Organization Score: 20/20**

## Overall Quality Score: 70/100

- Coverage: 10/30
- Bloom's Distribution: 15/25
- Answer Quality: 25/25
- Organization: 20/20

The score is held down almost entirely by the Coverage component, for the structural reasons explained above — Answer Quality and Organization are both at or near maximum. This is a curated, high-precision FAQ (every answer well within word-count target, 100% linked, 0 broken/anchor links, 0 duplicates) that trades broad concept-list coverage for depth and accuracy on the concepts readers are most likely to actually ask about.

## Recommendations

### High Priority

Add questions for the highest-impact concepts still uncovered (see [Coverage Gaps Report](faq-coverage-gaps.md) for the full prioritized list):

1. **Loop Marker** and **Balancing Loop Label** (CLD notation details, Chapter 3)
2. **Linear Relationship** (Chapter 6, pairs with the linear-vs-exponential-growth question already present)
3. **Network Topology** (Chapter 12/19)
4. **Model Assumptions** and **Model Limitations** (Chapter 2 — validating a systems map)
5. **Data Quality** and **Normalized Data Model** (Chapter 18)

### Medium Priority

1. Add more **Apply**-level questions to Core Concepts and Technical Detail Questions to correct the Bloom's-distribution deficit (target: 6–8 additional "How do I use X" / "When should I apply X" questions).
2. Expand coverage in the three weakest taxonomy categories — Knowledge Graph Applications (KGAP, 16%), Systems Design & Future Practice (DSGN, 12%), Knowledge Systems & Economic Complexity (KSEC, 20%) — each would benefit from 3–5 targeted questions in a future revision.

### Low Priority

1. Consider 2–3 more Evaluate-level Advanced Topics questions (currently only 1 of 9) to round out that category's Bloom's spread.
2. Re-run the coverage check after any future chapter content additions, since new chapters will add new Learning Graph concepts that the FAQ won't yet reference.

## Suggested Additional Questions

Based on the concept gaps above, consider adding in a future revision:

1. "What is a loop marker, and how does it label a reinforcing or balancing loop on a diagram?" (Technical Detail)
2. "What's the difference between a linear relationship and a linear-growth pattern?" (Core Concepts)
3. "What is network topology, and why does it shape how compounding advantage spreads?" (Advanced Topics)
4. "What assumptions and limitations should I check before trusting a systems model?" (Best Practices)
5. "Why does data quality matter so much before a knowledge graph project begins?" (Technical Detail)
6. "What is a normalized data model, and how does it differ from the schema a graph database uses?" (Technical Detail)
7. "What is graph analytics, and how does it differ from a single graph traversal query?" (Technical Detail)
8. "What is AI alignment, and how does it relate to human oversight?" (Technical Detail)
9. "What is a single view of the customer, and why is it a common enterprise knowledge graph use case?" (Best Practices)
10. "How does creative destruction relate to the Success to the Successful archetype?" (Advanced Topics)
